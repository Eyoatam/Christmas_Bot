import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import { Request, Response, Application, NextFunction } from "express";

import messageRoutes from "./routes/MessageRoutes";

dotenv.config();
const app: Application = express();

mongoose.connect(
	"mongodb+srv://ChristmasBotAdmin:" +
		process.env.MONGO_ATLAS_PASSWORD +
		"@christmasbot.7ifob.mongodb.net/<dbname>?retryWrites=true&w=majority",
	{ useUnifiedTopology: true, useNewUrlParser: true }
);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/messages", messageRoutes);

app.use((req, res, next) => {
	const error = new Error("Not Found");
	res.status(404).json({
		error: {
			message: error.message,
		},
	});
	error.message = "Not Found";
	next(error);
});

app.use((error: Object, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({
		error: {
			message: error,
		},
	});
	console.log(error);
});
export default app;
