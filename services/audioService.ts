
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
    console.error("English Master: Error decoding base64 audio", e);
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

  private async getAudioContext(): Promise<AudioContext> {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: SAMPLE_RATE });
    }
    
    if (this.audioContext!.state === 'suspended') {
      await this.audioContext!.resume();
    }
    
    return this.audioContext!;
  }

  async playText(text: string, voice: 'Kore' | 'Puck' | 'Zephyr' = 'Kore'): Promise<void> {
    try {
      const ctx = await this.getAudioContext();
      const cacheKey = `${voice}:${text}`;

      let audioBuffer: AudioBuffer;

      if (this.cache.has(cacheKey)) {
        audioBuffer = this.cache.get(cacheKey)!;
      } else {
        // Obtenção da chave em tempo de execução para garantir que não esteja vazia
        const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;
        
        if (!apiKey) {
          console.warn("English Master: API_KEY not detected. Check environment variables on Vercel.");
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // Instrução clara de velocidade para o modelo
        const prompt = `Please speak the following text in English at a slightly slower, natural pace (approximately 0.9x speed): "${text}"`;
        
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
        if (!base64Audio) {
          throw new Error("No audio content in Gemini response");
        }

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
      source.start(0);
      
      console.log(`Playing: "${text.substring(0, 30)}..."`);
    } catch (error) {
      console.error("English Master: Audio Service failure", error);
    }
  }
}

export const audioService = new AudioService();
