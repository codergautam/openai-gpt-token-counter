/**
     * 
     * @param {*} messages { role: string; content: string; name: string }
     * @param {*} model "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k"
     * @returns 
     */
const tiktoken = require("tiktoken");
const get_encoding = tiktoken.get_encoding;
const encoding_for_model = tiktoken.encoding_for_model

    function getChatGPTEncoding(
        messages = [],
        model = "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k"
    ) {
        const isGpt3 = model === "gpt-3.5-turbo";

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


module.exports = {
  chat: getChatGPTEncoding,
  text: (text) => require('gpt-3-encoder').encode(text).length;
}