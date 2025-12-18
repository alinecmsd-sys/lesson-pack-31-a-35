
import { GoogleGenAI, Modality } from "@google/genai";
import { Voice } from "../types.ts";

const SAMPLE_RATE = 24000;

// Helper to decode base64 audio data
function decodeBase64(base64: string): Uint8Array {
  try {
    const binaryString = atob(base64.trim());
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) {
    console.error("AudioService: Erro ao decodificar base64", e);
    return new Uint8Array(0);
  }
}

// Helper to convert raw PCM data to AudioBuffer
async function convertPcmToAudioBuffer(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

export class AudioService {
  private audioContext: AudioContext | null = null;
  private cache: Map<string, AudioBuffer> = new Map();

  private async resumeContext(): Promise<AudioContext> {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: SAMPLE_RATE });
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    return this.audioContext;
  }

  // Play text using Gemini TTS
  async playText(text: string, voice: Voice = 'Kore'): Promise<void> {
    try {
      const ctx = await this.resumeContext();
      const cacheKey = `${voice}:${text}`;

      let buffer: AudioBuffer;

      if (this.cache.has(cacheKey)) {
        buffer = this.cache.get(cacheKey)!;
      } else {
        // Use process.env.API_KEY directly as required by the guidelines
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Speak the following text in English at 0.9x speed (natural and clear): "${text}"`;
        
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

        const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64) throw new Error("Resposta da API sem dados de áudio.");

        const audioData = decodeBase64(base64);
        buffer = await convertPcmToAudioBuffer(audioData, ctx, SAMPLE_RATE);
        this.cache.set(cacheKey, buffer);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (error) {
      console.error("AudioService: Falha na reprodução", error);
    }
  }
}

export const audioService = new AudioService();
