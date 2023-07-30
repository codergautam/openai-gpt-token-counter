declare module 'openai-gpt-token-counter' {
  interface Message {
    role?: string;
    content: string;
    name?: string;
  }

  export type ModelType = 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-32k';

  interface Encoder {
    encode(text: string): number[];
    decode(tokens: number[]): string;
  }

  function getChatGPTEncoding(messages: Message[], model: ModelType): number;

  const deprecatedFunction: {
    chat: typeof getChatGPTEncoding;
    text(text: string, model?: ModelType | null): number;
  };

  export default deprecatedFunction;
}
