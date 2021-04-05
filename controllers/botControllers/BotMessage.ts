import { Context, Extra, Markup, Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import axiosRequest from "../../utils/request";
import { AxiosResponse } from "axios";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const sendRequest = new axiosRequest();

bot.use(async (_ctx: Context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log("response time %sms", ms);
});

bot.start((ctx: Context) => {
  return ctx.reply(
    `Welcome to ChristMas Message Bot I can help you by suggesting christmas messages that you can send to your friends
		 You can use the commands below to control me
		 /help - to get help
		 /getmessage - to get a random christmas message`,
    Extra.markup((markup: Markup) => {
      return markup
        .resize()
        .keyboard([["💬 Get Message", , "💡 Help"], ["👥 About Us"]])
        .oneTime();
    }),
  );
});

bot.help((ctx: Context) => {
  return ctx.reply(
    `Hey There 👋 , I'm christmas message bot.
		You can control me by sending these commands:
	  /start - restarts the bot
		/getmessage - to get a random christmas message
		/help - to get help`,
    Extra.markup((markup: Markup) => {
      return markup
        .resize()
        .keyboard([["🔙 Main Menu"], ["💬 Get Message"]])
        .oneTime();
    }),
  );
});

bot.command("getmessage", (ctx: Context) => {
  sendRequest.send({
    url: "http://localhost:3000/messages",
    callback: (response: AxiosResponse) => {
      const randomMessage = Math.floor(
        Math.random() * response.data.messages.length,
      );
      ctx.reply(
        response.data.messages[randomMessage].message,
        Extra.markup((markup: Markup) => {
          return markup
            .resize()
            .keyboard([["🔙 Main Menu"], ["💬 Get Message"]]);
        }),
      );
    },
  });
});

bot.hears("💬 Get Message", (ctx: Context) => {
  sendRequest.send({
    url: "http://localhost:3000/messages",
    callback: (response: AxiosResponse) => {
      const randomMessage = Math.floor(
        Math.random() * response.data.messages.length,
      );
      ctx.reply(
        response.data.messages[randomMessage].message,
        Extra.markup((markup: Markup) => {
          return markup
            .resize()
            .keyboard([["🔙 Main Menu"], ["💬 Get Message"]]);
        }),
      );
    },
  });
});

bot.hears("🔙 Main Menu", (ctx: Context) => {
  return ctx.reply(
    `Welcome to ChristMas Message Bot I can help you send christmas messages to your friends
		 Share me your contact to get messages or use the commands below
		 /help - to get help
		 /getmessage - to get a random christmas message`,
    Extra.markup((markup: Markup) => {
      return markup
        .resize()
        .keyboard([["💬 Get Message", , "💡 Help"], ["👥 About Us"]])
        .oneTime();
    }),
  );
});

bot.hears("💡 Help", (ctx: Context) => {
  return ctx.reply(
    `Hey There 👋 , I'm christmas message bot.
		You can control me by sending these commands:
		/start - restarts the bot
		/getmessage - to get a random christmas message
		/help - to get help`,
    Extra.markup((markup: Markup) => {
      return markup
        .resize()
        .keyboard([["🔙 Main Menu"], ["💬 Get Message"]])
        .oneTime();
    }),
  );
});

bot.hears("👥 About Us", (ctx: Context) => {
  return ctx.reply(
    `Developer
      • Eyoatam Tamirat
    code
      • https://github.com/Eyoatam/ChristMas_Bot
      `,
    Extra.markup((markup: Markup) => {
      return markup
        .resize()
        .keyboard([["🔙 Main Menu"], ["💡 Help"]])
        .oneTime();
    }),
  );
});

bot.launch();

// @ts-ignore
process.once("SIGINT", () => bot.stop("SIGINT"));
// @ts-ignore
process.once("SIGTERM", () => bot.stop("SIGTERM"));
