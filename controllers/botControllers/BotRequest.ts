import request from "request";

export default class BotRequest {
  private _telegram_api: string;
  public get telegram_api(): string {
    return this._telegram_api;
  }
  public set telegram_api(value: string) {
    this._telegram_api = value;
  }
  telegram_bot_api: string;

  constructor(botToken: string) {
    this.telegram_api = "https://api.telegram.org/bot";
    this.telegram_bot_api = this.telegram_api + botToken;
  }
  sendPostRequest({
    method,
    jsonObject,
    callback,
  }: {
    method: string;
    jsonObject: Record<string, unknown>;
    callback: (error: any, response: any, body: any) => void;
  }) {
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
