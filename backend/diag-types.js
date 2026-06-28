const controller = require("./controllers/PhotoController");
const pv = require("./middlewares/photoValidation");
const validate = require("./middlewares/handleValidation");
const auth = require("./middlewares/authGuard");
const img = require("./middlewares/imageUpload");
console.log("insertPhoto", typeof controller.insertPhoto);
console.log(
  "photoInsertValidation",
  typeof pv.photoInsertValidation,
  Object.keys(pv),
);
console.log("validate", typeof validate);
console.log("authGuard", typeof auth);
console.log("imageUpload export type", typeof img, img && Object.keys(img));
console.log(
  "imageUpload.single is function?",
  img && typeof img.single === "function",
);
