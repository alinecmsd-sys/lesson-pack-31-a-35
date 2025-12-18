
import { GoogleGenAI, Modality } from "@google/genai";
import { Voice } from "../types.ts";

const SAMPLE_RATE = 24000;

function decodeBase64(base64: string): Uint8Array {
  try {
    // Remove possíveis espaços ou quebras de linha que o transporte de rede pode inserir
    const cleanedBase64 = base64.replace(/\s/g, '');
    const binaryString = atob(cleanedBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) {
    console.error("AudioService: Falha crítica na decodificação Base64", e);
    return new Uint8Array(0);
  }
}

async function convertPcmToAudioBuffer(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number
): Promise<AudioBuffer> {
  // PCM data do Gemini é 16-bit Little Endian
  // Usamos DataView para garantir leitura correta independente da arquitetura (endianness)
  const view = new DataView(data.buffer);
  const frameCount = data.length / 2; // cada sample tem 2 bytes
  const buffer = ctx.createBuffer(1, frameCount, sampleRate);
  const channelData = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    // Lê o inteiro de 16 bits com sinal e normaliza para float (-1.0 a 1.0)
    const sample = view.getInt16(i * 2, true);
    channelData[i] = sample / 32768.0;
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
    // Essencial para navegadores modernos em links de produção
    if (this.audioContext!.state === 'suspended') {
      await this.audioContext!.resume();
    }
    return this.audioContext!;
  }

  async playText(text: string, voice: Voice = 'Kore'): Promise<void> {
    const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;

    if (!apiKey || apiKey === "") {
      console.error("ERRO: API_KEY não configurada no Vercel!");
      alert("Atenção: O áudio não funcionará porque a API_KEY não foi configurada nas variáveis de ambiente do Vercel.");
      return;
    }

    try {
      const ctx = await this.resumeContext();
      const cacheKey = `${voice}:${text}`;

      let buffer: AudioBuffer;

      if (this.cache.has(cacheKey)) {
        buffer = this.cache.get(cacheKey)!;
      } else {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const prompt = `Read this sentence in English naturally at 0.9x speed: "${text}"`;
        
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
        if (!base64) {
          console.error("AudioService: API retornou sem dados de áudio");
          return;
        }

        const audioData = decodeBase64(base64);
        buffer = await convertPcmToAudioBuffer(audioData, ctx, SAMPLE_RATE);
        this.cache.set(cacheKey, buffer);
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (error) {
      console.error("AudioService Error:", error);
    }
  }
}

export const audioService = new AudioService();
