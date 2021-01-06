import { Context, Extra, session, Telegraf } from "telegraf";
import * as dotenv from "dotenv";
import axiosRequest from "../../utils/request";
dotenv.config();
const sendRequest = new axiosRequest();

interface SessionData {
	heyCounter: number;
}

interface BotContext extends Context {
	session?: SessionData;
}

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN);

bot.use((ctx, next) => {
	const start = Date.now();
	return next().then(() => {
		const ms = Date.now() - start;
		console.log("response time %sms", ms);
	});
});

bot.start((ctx) => {
	return ctx.reply(
		`Welcome to ChristMas Message Bot I can help you by suggesting christmas messages that you can send to your friends\n\nYou can use the commands below to control me\n\n /help - to get help\n /getMessage - to get a random christmas message`,
		Extra.markup((markup: any) => {
			return markup
				.resize()
				.keyboard([["💬 Get Message", , "💡 Help"], ["👥 About Us"]])
				.oneTime();
		})
	);
});

bot.help((ctx) => {
	return ctx.reply(
		"Hey There 👋 , I'm christmas message bot.\n\nYou can control me by sending these commands:\n\n/start - restarts the bot\n/getMessage - to get a random christmas message\n/help - to get help",
		Extra.markup((markup: any) => {
			return markup
				.resize()
				.keyboard([["🔙 Main Menu"], ["💬 Get Message"]])
				.oneTime();
		})
	);
});

bot.command("getMessage", (ctx) => {
	sendRequest.send("http://localhost:3000/messages", function (response: any) {
		const randomMessage = Math.floor(
			Math.random() * response.data.messages.length
		);
		ctx.reply(
			response.data.messages[randomMessage].message,
			Extra.markup((markup: any) => {
				return markup.resize().keyboard([["🔙 Main Menu"], ["💬 Get Message"]]);
			})
		);
	});
});

bot.hears("💬 Get Message", (ctx) => {
	sendRequest.send("http://localhost:3000/messages", function (response: any) {
		const randomMessage = Math.floor(
			Math.random() * response.data.messages.length
		);
		ctx.reply(
			response.data.messages[randomMessage].message,
			Extra.markup((markup: any) => {
				return markup.resize().keyboard([["🔙 Main Menu"], ["💬 Get Message"]]);
			})
		);
	});
});

bot.hears("🔙 Main Menu", (ctx) => {
	return ctx.reply(
		`Welcome to ChristMas Message Bot I can help you send christmas messages to your friends\n\nShare me your contact to get messages or use the commands below\n\n /help - to get help\n /getMessage - to get a random christmas message`,
		Extra.markup((markup: any) => {
			return markup
				.resize()
				.keyboard([["💬 Get Message", , "💡 Help"], ["👥 About Us"]])
				.oneTime();
		})
	);
});

bot.hears("💡 Help", (ctx) => {
	return ctx.reply(
		"Hey There 👋 , I'm christmas message bot.\n\nYou can control me by sending these commands:\n\n/start - restarts the bot\n/getMessage - to get a random christmas message\n/help - to get help",
		Extra.markup((markup: any) => {
			return markup
				.resize()
				.keyboard([["🔙 Main Menu"], ["💬 Get Message"]])
				.oneTime();
		})
	);
});

bot.hears("👥 About Us", (ctx) => {
	return ctx.reply(
		`Developer
      • Eyoatam Tamirat
    code
      • https://github.com/Eyoatam/ChristMas_Bot
      `,
		Extra.markup((markup: any) => {
			return markup
				.resize()
				.keyboard([["🔙 Main Menu"], ["💡 Help"]])
				.oneTime();
		})
	);
});

bot.launch();

// @ts-ignore
process.once("SIGINT", () => bot.stop("SIGINT"));
// @ts-ignore
process.once("SIGTERM", () => bot.stop("SIGTERM"));
