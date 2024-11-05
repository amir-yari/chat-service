import { Router } from "express";
import multer from "multer";
import { ClientErrors } from "@mssd/errors";
import path from "node:path";
import { patchFile } from "../controllers/uploadControllers";

const router = Router();

const allowedTypes = [
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",

  // Videos
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",

  // Audio
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",

  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
  "text/plain",
];

const maxFileSize = 5 * 1024 * 1024; // 5 MB
const uploadDirectory = path.join(__dirname, "..", "..", "..", "tmp");
const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

const storage = multer.diskStorage({
  destination: function (__, _, cb) {
    console.log("1");
    cb(null, uploadDirectory);
  },
  filename: function (_, file, cb) {
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage,
  limits: { files: 1, fileSize: maxFileSize },
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new ClientErrors.UnprocessableEntityError("Unsupported format")
      );
    }
    cb(null, true);
  },
});

router.post("/", upload.single("file"), patchFile);

export default router;
