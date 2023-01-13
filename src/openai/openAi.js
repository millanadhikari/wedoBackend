const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const autoComplete = (question) => {
    console.log(question)
    let maya = Object.values(question)
    let chhaya = maya[0]
    return new Promise (async(resolve, reject) => {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: chhaya
        });
        resolve(completion.data.choices[0].text);
    })

}

module.exports = { autoComplete }