import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from 'dotenv';
dotenv.config();

async function startAnimus () {
    const apiId = +process.env.APIID;
    const apiHash = process.env.APIHASH;
    const stringSession = new StringSession(process.env.STRINGSESSION);

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });


    await client.start();
    await client.sendMessage("me", {message: 'Animus rodando.'});
    return client;
};

export { startAnimus };
