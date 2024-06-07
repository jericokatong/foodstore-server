const Category = require("./model");
const { policyFor } = require("../policy");

const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Category")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk membuat kategori",
      });
    }
    let payload = req.body;

    let category = new Category(payload);
    await category.save();

    return res.json(category);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }

    next(error);
  }
};

const update = async (req, res, next) => {
  const policy = policyFor(req.user);
  try {
    if (!policy.can("update", "Category")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk mengupdate kategori",
      });
    }
    let payload = req.body;

    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      payload,
      { new: true, runValidators: true }
    );

    return res.json(category);
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }

    next(error);
  }
};

const destroy = async (req, res, next) => {
  const policy = policyFor(req.user);
  try {
    if (!policy.can("create", "Category")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk menghapus kategori",
      });
    }
    let deleted = await Category.findOneAndDelete({ _id: req.params.id });
    return res.json(deleted);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  store,
  update,
  destroy,
};
