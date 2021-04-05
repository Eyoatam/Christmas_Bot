import BotRequest from "./BotRequest";
import * as dotenv from "dotenv";
dotenv.config();

export default class BotController {
  botAPi: any;
  constructor() {
    this.botAPi = new BotRequest(process.env.BOT_TOKEN);
  }

  sendMessage(chat_id: string, message: string, callback: Function) {
    if (chat_id && message != null) {
      const sentMessage = {
        chat_id,
        text: message,
      };
      this.botAPi.sendPostRequest(
        "sendMessage",
        sentMessage,
        (error: any, response: any, body: any) => {
          callback(error, response, body);
        },
      );
    } else {
      callback(`
          chat_id and message fields are required
          please fill out those fields and  try again
        `);
    }
  }
}
