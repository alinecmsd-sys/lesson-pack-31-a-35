
import { GoogleGenAI, Modality } from "@google/genai";
import { Voice } from "../types.ts";

/**
 * Funções utilitárias de decodificação manuais (seguindo regras do SDK)
 */
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64.replace(/\s/g, ''));
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number
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

/**
 * Serviço de áudio adaptado para ser 100% SSR-safe e resiliente no Vercel.
 * Não inicializa nada fora de funções chamadas por eventos de usuário.
 */
export async function playTextToSpeech(text: string, voice: Voice = 'Kore'): Promise<void> {
  // Regra 3: PROIBIDO acessar window ou Audio durante o render ou fora de funções de clique
  if (typeof window === "undefined") return;

  try {
    // Regra 2: Inicialização APENAS após ação do usuário
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx({ sampleRate: 24000 });

    // Regra 7: Prevenção de tela branca com try/catch robusto
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Solicitando áudio em inglês com velocidade 0.9 conforme pedido
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ 
        parts: [{ text: `Please say the following in English at a slightly slower speed (0.9x): "${text}"` }] 
      }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const base64Data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Data) {
      const audioBytes = decodeBase64(base64Data);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      // Regra 2: play() após clique (estamos dentro do handlePlay)
      source.start(0);
    }
  } catch (error) {
    // Regra 7: Não lançar erros silenciosos que quebrem o app
    console.error("Audio playback error (Check API Key on Vercel):", error);
  }
}

/**
 * Caso o usuário deseje usar arquivos locais futuramente (/public/audio/)
 * esta função segue estritamente o exemplo fornecido.
 */
export function playLocalAudio(filename: string): void {
  if (typeof window === "undefined") return;
  
  try {
    // Regra 1: Caminho absoluto para /public/audio/
    const src = `/audio/${filename}`;
    // Regra 2: Criar objeto Audio apenas dentro da função
    const audio = new Audio(src);
    audio.play();
  } catch (e) {
    console.error("Erro ao tocar áudio local:", e);
  }
}
