/**
 *
 * @param {*} messages { role: string; content: string; name: string }
 * @param {*} model "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k"
 * @returns
 */
const tiktoken = require("tiktoken");
const encoding_for_model = tiktoken.encoding_for_model

function getChatGPTEncoding(
    messages = [],
    model = "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k"
) {
    if(!Array.isArray(messages)) throw new Error('Please pass an array of messages in valid format to the chat function. Refer to the documentation for help ( https://www.npmjs.com/package/openai-gpt-token-counter )');
    const isGpt3 = model.startsWith("gpt-3.5")

    const encoder = encoding_for_model(model, {
        "<|im_start|>": 100264,
        "<|im_end|>": 100265,
        "<|im_sep|>": 100266,
    });

    const msgSep = isGpt3 ? "\n" : "";
    const roleSep = isGpt3 ? "\n" : "<|im_sep|>";

    const serialized = [
        messages
            .map(({ name, role, content }) => {
                return `<|im_start|>${name || role}${roleSep}${content}<|im_end|>`;
            })
            .join(msgSep),
        "<|im_start|>assistant",
    ].join(msgSep);
    let encoded = encoder.encode(serialized, "all");
    let decodedstrs = []
    for (let token of encoded) {
    var tokenDecoded = (new TextDecoder().decode(encoder.decode([token])));
    decodedstrs.push(tokenDecoded)
}
    return encoded.length

}


function deprecatedFunction() {
    throw new Error('Warning: The usage of this module has changed. Please use .chat or .text methods instead of calling the module as a function. Refer to the documentation for examples ( https://www.npmjs.com/package/openai-gpt-token-counter )');
}

deprecatedFunction.chat = getChatGPTEncoding;
deprecatedFunction.text = (text, model=null) => require('./Encoder.js').encode(text).length;

module.exports = deprecatedFunction;