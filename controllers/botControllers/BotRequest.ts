import request from "request";

class BotRequest {
	telegram_api: string;
	telegram_bot_api: string;

	constructor(botToken: string) {
		this.telegram_api = "https://api.telegram.org/bot";
		this.telegram_bot_api = this.telegram_api + botToken;
	}
	sendPostRequest(method: string, jsonObject: Object, callback: Function) {
		const api_url = this.telegram_bot_api + "/" + method;
		const options = {
			uri: api_url,
			method: "POST",
			json: jsonObject,
		};
		request(options, (error, response, body) => {
			callback(error, response, body);
		});
	}
}

export default BotRequest;
