
export interface Source {
  uri: string;
  title: string;
}

export interface SearchResult {
  summary: string;
  sources: Source[];
}

// Type for the grounding chunks from Gemini API response
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  // The API can also return other chunk types, but we only care about 'web'
}
