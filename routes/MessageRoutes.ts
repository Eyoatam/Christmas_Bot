import express from "express";
import MessageCtl from "../controllers/MessageCtl";
const MessageController = new MessageCtl();
const router = express.Router();

router.get("/", MessageController.getMessages);
router.get("/:id", MessageController.getMessage);
router.post("/", MessageController.addNewMessage);
router.delete("/:id", MessageController.deleteMessage);

export default router;
