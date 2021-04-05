import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Message from "../models/Messgae";

export default class MessageCtl {
  getMessages(_req: Request, res: Response, _next: NextFunction) {
    Message.find()
      .select("message _id created_at")
      .exec()
      .then((messages) => {
        res.status(200).json({
          messages,
        });
      })
      .catch((error: Error) => {
        res.status(500).json({
          error: {
            message: error.message,
          },
        });
      });
  }

  getMessage(req: Request, res: Response, _next: NextFunction) {
    Message.findById(req.params.id)
      .select("_id message created_at")
      .exec()
      .then((message) => {
        if (message) {
          res.status(200).json({
            message: message,
          });
        } else {
          res.status(500).json({
            error: {
              message: "Message Not Found",
            },
          });
        }
      });
  }
  // @ts-ignore
  addNewMessage(req: Request, res: Response, _next: NextFunction) {
    const message = new Message({
      _id: mongoose.Types.ObjectId(),
      message: req.body.message,
    });
    message
      .save()
      .then((result) => {
        res.status(201).json({
          createdMessage: {
            _id: result._id,
            //@ts-ignore
            message: result.message,
          },
        });
      })
      .catch((error: Error) => console.log(error));
  }

  deleteMessage(req: Request, res: Response, _next: NextFunction) {
    Message.deleteOne({ _id: req.params.id })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "message successfully deleted",
          id: req.params.id,
        });
      })
      .catch((error: Error) => {
        res.status(500).json({
          error: {
            message: error.message,
          },
        });
      });
  }
}
