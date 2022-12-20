const { Client, GatewayIntentBits } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const client = new Client(
    {
        intents:
            [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
            ]
    }
);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    let command = message.content.split(" ")[0];
    let content = message.content.substring(command.length + 1);

    if (command === "!ping") {
        message.reply("Pong!");
    };

    if (command === "!gptchat") {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: content,
                temperature: 0.9,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.6,
            });

            message.reply(response.data.choices[0].text);
        }
        catch (error) {
            console.error(error);
        }
    }

    if (command === "!gptsarc") {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Marv is a chatbot that reluctantly answers questions with really sarcastic responses :\n\nYou: " + content + "\nMarv:",
                temperature: 0.5,
                max_tokens: 1000,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
              });
            message.reply(response.data.choices[0].text);
        }
        catch (error) {
            console.error(error);
        }
    }

    if (command === "!gptrandom") {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Marv est un chatbot qui répondra de façon très érotique :\n\You: " + content + "\nMarv:",
                temperature: 0.5,
                max_tokens: 1000,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
              });
            message.reply(response.data.choices[0].text);
        }
        catch (error) {
            console.error(error);
        }
    }

    if (command === "!gptimage") {
        try {
            const response = await openai.createImage({
                prompt: content,
                n: 1,
                size: "512x512",
            });
            let image_url = response.data.data[0].url;

            message.reply(image_url);
        }
        catch (error) {
            console.error(error);
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);