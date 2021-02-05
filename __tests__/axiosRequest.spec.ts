import axios from "axios";
import axiosRequest from "../utils/request";

describe("Test BotRequest", () => {
	it("should send request", () => {
		const request = new axiosRequest();
		request.send({
			url: "https://google.com",
			callback: function (response: any) {
				return;
			},
		});
	});
});
