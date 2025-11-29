import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { ASAPI_SYSTEM_PROMPT } from "../constants";

// Store the client instance
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // Ensure API KEY is present from process.env as per guidelines
    if (!process.env.API_KEY) {
      console.error("Gemini API Key is missing from process.env.API_KEY");
      throw new Error("API Key is missing");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const explainTerm = async (term: string, context: string): Promise<string> => {
  try {
    const ai = getAiClient();
    
    const prompt = `
    質問: 「${term}」ってなに？
    文脈: この言葉は、旭市の予算（税金の使い道）の中で「${context}」について説明するときに使われています。
    
    あさぴーとして、小学生に話しかけるように150文字以内で答えてください。
    `;

    // Using gemini-2.5-flash for text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: ASAPI_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 500,
        // Permissive safety settings to prevent blocking of educational tax content
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ]
      }
    });

    // Robustly handle response text
    const text = response.text;
    
    if (!text) {
       // If text is undefined (e.g. blocked), use fallback
       console.warn("Gemini API returned empty text. Likely safety block or empty candidate.");
       return `ごめんね、ちょっとうまく説明できないみたいだっぴ...💦\nでも「${term}」は、旭市のみんなが元気に暮らすためにとっても大切なことなんだよ！\n先生やお家の人にも聞いてみてね🍅`;
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error details:", error);
    
    // Fallback message that sounds like the character
    return `ごめんね、ちょっと考えすぎて頭がグルグルしちゃったっぴ...😵\n通信がうまくいっていないかもしれないから、もう一回聞いてくれるかな？\n（${context}についてのお話だよ！）`;
  }
};