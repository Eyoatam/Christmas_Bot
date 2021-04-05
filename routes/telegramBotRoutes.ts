import express, { NextFunction, Request, Response } from "express";
import BotController from "../controllers/botControllers/BotController";
const router = express.Router();
const botCtl = new BotController();

export default router.post(
  "/",
  (req: Request, res: Response, _next: NextFunction) => {
    const data = req.body;
    botCtl.sendMessage(
      data["chat_id"],
      data["message"],
      (error: Error, _response: Response, body: Record<string, unknown>) => {
        if (error) {
          res.status(500).json({
            error: {
              message: "failed to send message, please try again",
            },
          });
        } else {
          res.status(201).json({
            message: "Message sent successfully!!",
            result: body,
          });
        }
      },
    );
  },
);
