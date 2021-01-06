import axios from "axios";

class axiosRequest {
	constructor() {}
	send(url: string, callback: any) {
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

export default axiosRequest;
