import express from "express";
import BotController from "../controllers/botControllers/BotController";
const router = express.Router();
const botCtl = new BotController();

router.post("/", (req, res, next) => {
  const data = req.body;
  botCtl.sendMessage(
    data["chat_id"],
    data["message"],
    (error: any, response: any, body: any) => {
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
    }
  );
});

export default router;
