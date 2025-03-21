import multer from "multer";
import { v4 as uuidv4 } from "uuid";

function fileUpload(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("I don't have a clue!"), false);
    }
  }

  const upload = multer({
    storage,
    fileFilter,
  });

  return upload;
}

export function uploadSingle(fileName,folderName) {
  return fileUpload(folderName).single(fileName);
}

export function uploadMax(arrayOfFields,folderName) {
  return fileUpload(folderName).fields(arrayOfFields);
}
