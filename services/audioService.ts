
import { GoogleGenAI, Modality } from "@google/genai";

const SAMPLE_RATE = 24000;

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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
  private ai: GoogleGenAI;
  private audioContext: AudioContext | null = null;
  private cache: Map<string, AudioBuffer> = new Map();

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private initAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'suspended') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: SAMPLE_RATE,
      });
    }
    return this.audioContext;
  }

  async playText(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore'): Promise<void> {
    const cacheKey = `${voice}:${text}`;
    const ctx = this.initAudioContext();

    try {
      let audioBuffer: AudioBuffer;

      if (this.cache.has(cacheKey)) {
        audioBuffer = this.cache.get(cacheKey)!;
      } else {
        const prompt = `Say clearly and slightly slowly (0.9 speed): ${text}`;
        const response = await this.ai.models.generateContent({
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
      console.error("Audio failure:", error);
    }
  }
}

export const audioService = new AudioService();
