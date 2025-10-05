# OpenAI GPT Token Counter

![npm](https://img.shields.io/npm/dt/openai-gpt-token-counter)
![DT](https://img.shields.io/badge/TypeScript%20Support-DT-blue)

This NPM package is designed to count the number of OpenAI tokens in a given an input messages array for all OpenAI models including the GPT-5 series models, and has been verified for 100% accuracy.

## Installation

You can install the package using npm:

```bash
npm install openai-gpt-token-counter
```

## Usage

### Importing the Module

For CommonJS:

```javascript
const openaiTokenCounter = require('openai-gpt-token-counter');
```

For ES6 Imports:

```javascript
import openaiTokenCounter from 'openai-gpt-token-counter';
```


### Counting Tokens in Chat Messages

To count the number of tokens in chat messages for a specific OpenAI chat model, use the `chat` method:

```javascript
const messages = [
  { role: "user", content: "Say this is a test!" },
  // Add more messages if needed
];

const model = "gpt-5"; // Replace with your desired OpenAI chat model

const tokenCount = openaiTokenCounter.chat(messages, model);
console.log(`Token count: ${tokenCount}`);
```
### Example Messages Array for Chat Models

For chat models, provide an array of messages, where each message is an object with the following structure:

```javascript
const messages = [
  { role: "system", content: "System prompt to guide the AI" },
  { role: "user", content: "Message content from the user" },
  { role: "assistant", content: "AI response to the user's message" },
  // Add more messages as needed
];
```

The `role` property can be one of `"user"`, `"system"`, or `"assistant"`. The `content` property holds the actual text of the message.

## Supported Models

This package supports **all OpenAI chat/text models including GPT-5 and specialized models**, but the official ones we tested on are:
### Chat Models
- GPT5: `"gpt-5"`
- GPT5 Mini: `"gpt-5-mini"`
- GPT5 Nano: `"gpt-5-nano"`
- GPT OSS 120B: `"gpt-oss-120b"`
- GPT OSS 20B: `"gpt-oss-20b"`
- O3 Deep Research: `"o3-deep-research"`
- O4 Mini Deep Research: `"o4-mini-deep-research"`
- GPT3.5 Turbo: `"gpt-3.5-turbo"`
- GPT3.5 16K: `"gpt-3.5-turbo-16k"`
- GPT4: `"gpt-4"`
- GPT4 32K: `"gpt-4-32k"`

### Text Models (deprecated)

- GPT3 (text-davinci-003, text-curie-001, text-babbage-001, text-ada-001)

### Counting Tokens in Text (deprecated)

To count the number of tokens in a text for a specific OpenAI text model (e.g. text-davinci-003), use the `text` method:

```javascript
const text = "This is a test sentence.";
const model = "text-davinci-003"; // Replace with your desired OpenAI model

const tokenCount = openaiTokenCounter.text(text, model);
console.log(`Token count: ${tokenCount}`);
```



## FineTuned Models
Use the base model system to calculate the token count for fine-tuned models. For example, if you have a fine-tuned model based on `gpt-4`, you can use the `gpt-4` model to calculate the token count. Please report on the Github repository if you find any issues with fine-tuned models.

## Accuracy

This module has been tested and verified for 100% accuracy against the OpenAI API's token count. Don't take my word for it, run `test-gpt5-accuracy.js` to see the accuracy verification.


## Note on Embeddings

Please note that this package does not support embeddings. It is specifically designed for counting the number of tokens in text or chat messages for OpenAI models. Though this is on our roadmap, we do not have an ETA for when this feature will be added.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue on the [GitHub repository](https://github.com/codergautam/openai-gpt-token-counter). Thanks to the great [tiktoken](https://www.npmjs.com/package/tiktoken?activeTab=readme) library for providing the base tokenization logic.

 Contributions through pull requests are also welcome!
