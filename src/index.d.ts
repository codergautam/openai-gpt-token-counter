
declare module 'openai-gpt-token-counter' {
  interface Message {
    role?: string;
    content: string;
    name?: string;
  }

  export type ModelType = 'gpt-5' | 'gpt-5-mini' | 'gpt-5-nano' | 'gpt-4.1' | 'gpt-oss-120b' | 'gpt-oss-20b' | 'o3-deep-research' | 'o4-mini-deep-research' | 'gpt-image-1' | 'dall-e-3' | 'gpt-4o-mini-tts' | 'gpt-4o-transcribe' | 'gpt-4' | 'gpt-4-0613' | 'gpt-4-32k' | 'gpt-4-32k-0613' | 'gpt-3.5-turbo' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k-0613' | string;

  function getChatGPTEncoding(messages: Message[], model?: ModelType): number;

  const deprecatedFunction: {
    chat: typeof getChatGPTEncoding;
    text(text: string, model?: ModelType | null): number;
  };

  export default deprecatedFunction;
}
