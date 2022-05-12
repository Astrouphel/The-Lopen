import { Client } from "discord.js";
import config from "./config";
import helpCommand from "./commands";
import quotes from "./quotes";
const { intents, prefix, token } = config;
let insultCounter = 0;
//Use Ctrl+P to search among the files and folders
//Music time? https://gabrieltanner.org/blog/dicord-music-bot
//const queue = new Map();

const client = new Client({
  intents,
  presence: {
    status: "online",
    activities: [
      {
        name: `${prefix}help`,
        type: "LISTENING",
      },
    ],
  },
});

client.on("ready", () => {
  console.log(`Logged in as: ${client.user?.tag}`);
});
client.once("ready", () => {
  console.log("Ready!");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  //These if/else statements instructs the bot to read all messages and check for certain things inside of them. If a message says one of the things that the bot checks for, it'll respond accordingly.
  if (message.content.includes("I think")) {
    let msgIthink = await message.reply(".");
    await msgIthink.edit(`Sazed? Is that you?`);
  }

  if (message.content.includes("i think")) {
    let msgithink = await message.reply(".");
    await msgithink.edit(`Sazed? Is that you?`);
  }

  if (message.content.includes("pancake")) {
    let msgPancakes = await message.reply(".");
    await msgPancakes.edit(``);
  }

  if (message.content.includes("death")) {
    let msgDeath = await message.reply(".");
    await msgDeath.edit(`Life Before Death!`);
  }

  if (message.content.includes("Psych")) {
    let msgDeath = await message.reply(".");
    await msgDeath.edit(`I know, you know, that I'm not telling the truth`);
  }

  if (message.content.includes("...")) {
    let msgConvo = await message.reply(".");
    await msgConvo.edit("Ah, what a fascinating conversationalist you are.");
  }
  if (message.content.includes("wine")) {
    let msgWine = await message.reply(".");
    await msgWine.edit("Erm...you mentioned something about wine?");
  }

  //This is where it checks the messages sent by others, provided they have a prefix at the beginning
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift();
    console.log(command);
    switch (command) {
      case "ping":
        let msg = await message.reply("Pinging...");
        await msg.edit(
          `Pong! The round trip took ${Date.now() - msg.createdTimestamp}ms.`
        );
        break;

      //Gets random quotes
      case "quote":
        let msgQ = await message.reply("Hold on, Gancho...");
        const randQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await msgQ.edit(randQuote);
        break;

      //This isn't the most efficient way of calling for random insults, but it's easy for my tiny brain to comprehend
      case "insult":
        insultCounter += 1;
        let msgInsult = await message.reply("Hold on, Gancho...");
        let insult = Math.floor(Math.random() * 21) + 1;
        if (insult === 1) {
          await msgInsult.edit(
            "The only thing you're an expert at is buffoonery and idiotic behavior."
          );
        } else if (insult === 2) {
          await msgInsult.edit(
            "Some mistakes, you can't fix by being sorry. That's a lesson your parents had to learn soon after your birth."
          );
        } else if (insult === 3) {
          await msgInsult.edit(
            "Your only chance of getting laid is to crawl up a chicken's butt and wait."
          );
        } else if (insult === 4) {
          await msgInsult.edit(
            "I'd rather spend an hour amputating one of my legs than spend ten minutes talking to you."
          );
        } else if (insult === 5) {
          await msgInsult.edit(
            "I know I make stupid choices, but talking to you is the worst of my stupid choices."
          );
        } else if (insult === 6) {
          await msgInsult.edit("You probably fall asleep to Pokemon ASMR");
        } else if (insult === 7) {
          await msgInsult.edit(
            "Your mamma's so fat shes on both sides of the family."
          );
        } else if (insult === 8) {
          await msgInsult.edit(
            "You're a weeb. Yep, that's the entire insult. "
          );
        } else if (insult === 9) {
          await msgInsult.edit(
            "You should try not to talk so much, friend. You'll sound far less stupid that way."
          );
        } else if (insult === 10) {
          await msgInsult.edit(
            "Someone complained to me about being ugly, once. I showed them a picture of you, and it made them feel better about themself immediately. "
          );
        } else if (insult === 11) {
          await msgInsult.edit(
            "Light travels faster than sound, which is why you seemed bright until you spoke."
          );
        } else if (insult === 12) {
          await msgInsult.edit(
            "Don’t be ashamed of who you are. That’s your parent’s job."
          );
        } else if (insult === 13) {
          await msgInsult.edit(
            "You are proof that evolution can go in reverse."
          );
        } else if (insult === 14) {
          await msgInsult.edit(
            "You are the reason why shampoo has instructions."
          );
        } else if (insult === 15) {
          await msgInsult.edit(
            "If I had a face like yours, I'd sue my parents."
          );
        } else if (insult === 16) {
          await msgInsult.edit(
            "Did your parents ever ask you to run away from home?"
          );
        } else if (insult === 17) {
          await msgInsult.edit(
            "You're the reason why 0 should be on the attractiveness scale."
          );
        } else if (insult === 18) {
          await msgInsult.edit(
            "Two wrongs don’t make a right. Take your parents, for instance."
          );
        } else if (insult === 19) {
          await msgInsult.edit(
            "Um...how many extra chromosomes were you born with? Must be a world record."
          );
        } else if (insult === 20) {
          await msgInsult.edit(
            "To call you stupid would be an insult to stupid people! I've known sheep that could outwit you. I've worn dresses with higher IQs."
          );
        }

        //I wanted to poke fun at anyone overusing the insult command
        if (insultCounter === 10) {
          await message.reply(
            "You really like being insulted, don't you? Are you alright, friend?"
          );
        }
        break;

      //This is where you can submit messages to be repeated by the bot
      case "say":
      case "repeat":
        if (args.length > 0) await message.channel.send(args.join(" "));
        else
          await message.reply(
            "You did not send a message to repeat, cancelling command."
          );
        break;

      //This gets information from commands.ts. It'll list the different commands that the bot can respond to, and how to do them.
      case "help":
        const embed = helpCommand(message);
        embed.setThumbnail(client.user!.displayAvatarURL());
        await message.channel.send({ embeds: [embed] });
        await message.channel.send(
          "There are some hidden responses that the bot will send when it reads certain words or phrases within a message! Good luck discovering them!"
        );
        break;
    }
  }
});
client.login(token);
