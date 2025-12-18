
import { GoogleGenAI, Modality } from "@google/genai";

const SAMPLE_RATE = 24000;

function decode(base64: string) {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) {
    console.error("Base64 decode error", e);
    return new Uint8Array(0);
  }
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export class AudioService {
  private audioContext: AudioContext | null = null;
  private cache: Map<string, AudioBuffer> = new Map();

  private initAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: SAMPLE_RATE });
    }
    return this.audioContext;
  }

  async playText(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore'): Promise<void> {
    const cacheKey = `${voice}:${text}`;
    const ctx = this.initAudioContext();

    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      let audioBuffer: AudioBuffer;

      if (this.cache.has(cacheKey)) {
        audioBuffer = this.cache.get(cacheKey)!;
      } else {
        // Safe access to API Key via window.process (polyfilled in index.html)
        const apiKey = (window as any).process?.env?.API_KEY || "";
        
        if (!apiKey) {
          console.error("English Master: API_KEY is missing. Audio playback will not work.");
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Say clearly: ${text}`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: prompt }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voice },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) throw new Error("No audio data");

        audioBuffer = await decodeAudioData(
          decode(base64Audio),
          ctx,
          SAMPLE_RATE,
          1
        );
        this.cache.set(cacheKey, audioBuffer);
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
    } catch (error) {
      console.error("Audio Playback failure:", error);
    }
  }
}

export const audioService = new AudioService();
