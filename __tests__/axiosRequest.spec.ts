import axios from "axios";
import axiosRequest from "../utils/request";

describe("Test BotRequest", () => {
	it("should send request", () => {
		const request = new axiosRequest();
		request.send("https://google.com", function (response: any) {
			return;
		});
	});
});
