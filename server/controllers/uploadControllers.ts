import { type RequestHandler } from "express";
import { ServerErrors } from "@mssd/errors";

const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  } catch (error: any) {
    new ServerErrors.InternalServerError(
      "Could not upload the file, try agin later!",
      error
    );
  }
};

export { uploadFile };
