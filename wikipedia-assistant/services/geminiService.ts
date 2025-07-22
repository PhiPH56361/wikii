
import { GoogleGenAI } from "@google/genai";
import type { SearchResult, Source, GroundingChunk } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are a helpful assistant that searches and summarizes content from Wikipedia. 
Your primary goal is to provide clear, concise, and accurate summaries in VIETNAMESE based on the user's query.
You must use the provided search tool to find information.
When summarizing, synthesize information from the search results.
If the user's query is ambiguous, ask clarifying questions in Vietnamese.
If you cannot find relevant information or don't know the answer, politely state that in Vietnamese.
ALWAYS respond in Vietnamese.`;

export const searchWikipedia = async (query: string): Promise<SearchResult> => {
  try {
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: `Tóm tắt về chủ đề: "${query}"`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: SYSTEM_INSTRUCTION
      },
    });
    
    const summary = response.text;
    const groundingChunks: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: Source[] = groundingChunks
      .map(chunk => chunk.web)
      .filter((web): web is { uri: string; title: string } => !!web && !!web.uri && !!web.title)
      .reduce((acc: Source[], current) => {
          // Deduplicate sources based on URI
          if (!acc.some(item => item.uri === current.uri)) {
              acc.push({ uri: current.uri, title: current.title || 'Không có tiêu đề' });
          }
          return acc;
      }, []);

    return { summary, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch data from Gemini API.");
  }
};
