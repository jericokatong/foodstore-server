const config = require("../../config");
const Product = require("./model");
const Category = require("../category/model");
const Tag = require("../tag/model");
const path = require("path");
const fs = require("fs");
const { policyFor } = require("../policy");

const index = async (req, res, next) => {
  try {
    let { limit = 10, skip = 0, q = "", category = "", tags = [] } = req.query;
    let criteria = {};

    if (q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: "i" },
      };
    }

    if (category.length) {
      category = await Category.findOne({
        name: { $regex: `${category}`, $options: "i" },
      });

      if (category) {
        criteria = { ...criteria, category: category._id };
      }
    }

    if (tags.length) {
      tags = await Tag.find({ name: { $in: tags } });
      // [ new ObjectId('65d313da8a280d43334a6fad') ]
      criteria = { ...criteria, tags: { $in: tags.map((tag) => tag._id) } };
    }

    let count = await Product.countDocuments(criteria);

    let products = await Product.find(criteria)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate("category")
      .populate("tags");

    return res.json({
      data: products,
      count,
    });
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can("create", "Product")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk membuat produk",
      });
    }
    let payload = req.body;

    // cek jika payload ada category
    if (payload.category) {
      let category = await Category.findOne({
        name: { $regex: payload.category, $options: "i" },
      });

      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    // cek jika payload ada tags
    if (payload.tags && payload.tags.length) {
      let tags = await Tag.find({ name: { $in: payload.tags } });

      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      }
    }

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

const update = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can("update", "Product")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk mengupdate produk",
      });
    }

    let payload = req.body;

    // cek jika payload ada category
    if (payload.category) {
      let category = await Category.findOne({
        name: {
          $regex: payload.category,
          $options: "i",
        },
      });

      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }

    // cek jika payload ada tags
    if (payload.tags && payload.tags.length) {
      let tags = await Tag.find({ name: { $in: payload.tags } });

      if (tags.length) {
        payload = { ...payload, tags: tags.map((tag) => tag._id) };
      }
    }

    if (req.file) {
      // contoh C:\Users\ORANG\AppData\Local\Temp\beb598ae6b2bc3907271a2f653431c85
      let tmp_path = req.file.path;

      // originalname cth file.jpg
      let originalExt =
        req.file.originalname.split(".")[
          req.file.originalname.split(".").length - 1
        ];

      // contoh req.file.filename: 006c9d81a645a13e3d8398808adaf7d
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
          let product = await Product.findOne({ _id: req.params.id });

          let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;

          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { ...payload, image_url: filename },
            { new: true, runValidators: true }
          );

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
      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        payload,
        { new: true, runValidators: true }
      );

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

const destroy = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can("delete", "Product")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk menghapus produk",
      });
    }

    let product = await Product.findOneAndDelete({ _id: req.params.id });

    let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;

    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
