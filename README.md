# OpenAI GPT Token Counter

![npm](https://img.shields.io/npm/dt/openai-gpt-token-counter)

This npm package is designed to count the number of OpenAI tokens in a given text or messages array. It supports various OpenAI text and chat models, making it a versatile tool for your natural language processing tasks.

## Installation

You can install the package using npm:

```bash
npm install openai-gpt-token-counter
```

## Usage

### Importing the Module

```javascript
const openaiTokenCounter = require('openai-gpt-token-counter');
```

### Counting Tokens in Text

To count the number of tokens in a text for a specific OpenAI text model (ex: text-davinci-003), use the `text` method:

```javascript
const text = "This is a test sentence.";
const model = "text-davinci-003"; // Replace with your desired OpenAI model

const tokenCount = openaiTokenCounter.text(text, model);
console.log(`Token count: ${tokenCount}`);
```

### Counting Tokens in Chat Messages

To count the number of tokens in chat messages for a specific OpenAI chat model, use the `chat` method:

```javascript
const messages = [
  { role: "user", content: "Say this is a test!" },
  // Add more messages if needed
];

const model = "gpt-3.5-turbo"; // Replace with your desired OpenAI chat model

const tokenCount = openaiTokenCounter.chat(messages, model);
console.log(`Token count: ${tokenCount}`);
```

## Supported Models

This package supports a range of OpenAI models, including both text and chat models. Here are some examples of supported models:

### Text Models

- GPT3 (text-davinci-003, text-curie-001, text-babbage-001, text-ada-001)

For text models, no need to pass the model name as a string. Just use the text function, they should all use the same tokens calculation.

### Chat Models

- GPT3.5 Turbo: `"gpt-3.5-turbo"`
- GPT3.5 16K: `"gpt-3.5-turbo-16k"`
- GPT4: `"gpt-4"`
- GPT4 32K: `"gpt-4-32k"`

Please ensure you provide the correct model name when using the package.

## Example Messages Array for Chat Models

For chat models, you should provide an array of messages, where each message is an object with the following structure:

```javascript
const messages = [
  { role: "user", content: "Message content from the user" },
  { role: "system", content: "System response to the user's message" },
  // Add more messages as needed
];
```

The `role` property can be one of `"user"`, `"system"`, or `"assistant"`. The `content` property holds the actual text of the message.

## Important Note on Embeddings

Please note that this package does not support embeddings. It is specifically designed for counting the number of tokens in text or chat messages for OpenAI models.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue on the [GitHub repository](https://github.com/codergautam/openai-gpt-token-counter). Contributions through pull requests are also welcome!
