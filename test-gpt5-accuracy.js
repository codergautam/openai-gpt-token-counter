const openaiTokenCounter = require('./src/index.js');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

// Test cases for GPT-5 models
const testCases = [
  {
    name: "Simple greeting",
    messages: [{ role: "user", content: "Hello, how are you?" }]
  },
  {
    name: "Code generation request",
    messages: [
      { role: "user", content: "Write a Python function to calculate fibonacci numbers" },
      { role: "assistant", content: "Here's a Python function to calculate Fibonacci numbers:\n\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)" },
      { role: "user", content: "Can you optimize this for better performance?" }
    ]
  },
  {
    name: "Complex reasoning task",
    messages: [
      { role: "system", content: "You are a helpful assistant that solves complex problems step by step." },
      { role: "user", content: "If a train leaves station A at 60 mph and another train leaves station B at 80 mph, and they are 200 miles apart, when will they meet?" }
    ]
  },
  {
    name: "Long conversation",
    messages: [
      { role: "user", content: "What is machine learning?" },
      { role: "assistant", content: "Machine learning is a subset of artificial intelligence that focuses on algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience, without being explicitly programmed." },
      { role: "user", content: "Can you explain the different types of machine learning?" },
      { role: "assistant", content: "There are three main types of machine learning: 1) Supervised learning - uses labeled training data, 2) Unsupervised learning - finds patterns in data without labels, 3) Reinforcement learning - learns through interaction with an environment using rewards and penalties." },
      { role: "user", content: "What are some popular machine learning algorithms?" }
    ]
  }
];

// GPT-5 models to test
const gpt5Models = [
  'gpt-5',
  'gpt-5-mini',
  'gpt-5-nano'
];

async function testModelAccuracy(model) {
  console.log(`\n=== Testing ${model} ===`);

  for (const testCase of testCases) {
    console.log(`\nTest: ${testCase.name}`);

    try {
      // Get token count from our package
      const ourTokenCount = openaiTokenCounter.chat(testCase.messages, model);
      console.log(`Our package: ${ourTokenCount} tokens`);

      // Get token count from OpenAI API
      const response = await openai.chat.completions.create({
        model: model,
        messages: testCase.messages,
        max_completion_tokens: 10 // Minimal response to save tokens
      });

      const openaiTokenCount = response.usage.prompt_tokens;
      console.log(`OpenAI API: ${openaiTokenCount} tokens`);

      // Calculate accuracy
      const difference = Math.abs(ourTokenCount - openaiTokenCount);
      const accuracy = ((1 - difference / openaiTokenCount) * 100).toFixed(2);

      if (difference === 0) {
        console.log(`✅ Perfect match! (100% accurate)`);
      } else if (difference <= 2) {
        console.log(`✅ Very close! (${accuracy}% accurate, ${difference} token difference)`);
      } else if (difference <= 5) {
        console.log(`⚠️  Close! (${accuracy}% accurate, ${difference} token difference)`);
      } else {
        console.log(`❌ Significant difference! (${accuracy}% accurate, ${difference} token difference)`);
      }

      // Show message preview
      const messagePreview = testCase.messages.map(msg =>
        `${msg.role}: ${msg.content.substring(0, 50)}${msg.content.length > 50 ? '...' : ''}`
      ).join('\n');
      console.log(`Messages:\n${messagePreview}`);

    } catch (error) {
      console.log(`❌ Error testing ${model}: ${error.message}`);

      if (error.message.includes('Invalid model') || error.message.includes('not found')) {
        console.log(`   Note: ${model} may not be available in your OpenAI account yet.`);
      }
    }
  }
}

async function runTests() {
  console.log('🚀 GPT-5 Token Counter Accuracy Test');
  console.log('=====================================');

  console.log('Testing our package against OpenAI API token counts...\n');

  for (const model of gpt5Models) {
    await testModelAccuracy(model);
  }

  console.log('\n=== Summary ===');
  console.log('✅ = Perfect match (100% accurate)');
  console.log('✅ = Very close (98%+ accurate)');
  console.log('⚠️  = Close (90%+ accurate)');
  console.log('❌ = Significant difference (<90% accurate)');
  console.log('\nNote: Some models may not be available in your OpenAI account yet.');
}

// Run the tests
runTests().catch(console.error);
