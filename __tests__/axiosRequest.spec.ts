import axiosRequest from "../utils/request";

describe("Test AxiosRequest", () => {
  it("should send request", () => {
    const request = new axiosRequest();
    request.send({
      url: "https://google.com",
      callback: function (_response: any) {
        return;
      },
    });
  });
});
