const config = require("../../config");
const Product = require("./model");
const path = require("path");
const fs = require("fs");

const store = async (req, res, next) => {
  try {
    const payload = req.body;

    if (req.file) {
      let tmp_path = req.file.path;

      // originalname cth file.jpg
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];
      let filename = req.file.filename + "." + originalExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/upload/${filename}`
      );

      // baca file yang masih di lokasi sementara
      const src = fs.createReadStream(tmp_path);

      // pindahkan file ke lokasi permanen
      const dest = fs.createWriteStream(target_path);

      // mulai pindahkan file dari src ke dest
      src.pipe(dest);

      src.on("end", async () => {
        try {
          let product = new Product({ ...payload, image_url: filename });
          await product.save();
          return res.json(product);
        } catch (err) {
          fs.unlinkSync(target_path);

          if (err && err.name === "ValidationError") {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors,
            });
          }

          next(err);
        }
      });

      src.on("error", async () => {
        next(err);
      });
    } else {
      const product = new Product(payload);
      await product.save();

      return res.json(product);
    }
  } catch (err) {
    console.log(err);
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }

    next(err);
  }
};

module.exports = {
  store,
};
