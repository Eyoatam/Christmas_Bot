import axios from "axios";

export default class axiosRequest {
  send({ url, callback }: { url: string; callback: any }) {
    axios
      .get(url)
      .then(callback)
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
}
