import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import input from "input";
import dotenv from 'dotenv';
dotenv.config();

async function startAnimus () {
    const apiId = +process.env.APIID;
    const apiHash = process.env.APIHASH;
    const stringSession = new StringSession(process.env.STRINGSESSION);

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    if (process.env.STRINGSESSION === "") {
        await client.start({
            phoneNumber: async () => await input.text("Please enter your number: "),
            password: async () => await input.text("Please enter your password: "),
            phoneCode: async () =>
              await input.text("Please enter the code you received: "),
            onError: (err) => console.log(err),
          });
          console.log("You should now be connected.");
          console.log(client.session.save());
    }


    await client.start();
    await client.sendMessage("me", {message: 'Animus rodando.'});
    return client;
};

export { startAnimus };
