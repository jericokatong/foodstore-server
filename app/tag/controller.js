const Tag = require("./model");
const { policyFor } = require("../policy");

const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Tag")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk membuat tag",
      });
    }
    let payload = req.body;

    let tag = new Tag(payload);
    await tag.save();

    return res.json(tag);
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
    if (!policy.can("update", "Tag")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk mengupdate tag",
      });
    }
    let payload = req.body;

    let tag = await Tag.findOneAndUpdate({ _id: req.params.id }, payload, {
      new: true,
      runValidators: true,
    });

    return res.json(tag);
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
    if (!policy.can("delete", "Tag")) {
      return res.json({
        error: 1,
        message: "Anda tidak memiliki akses untuk menghapus tag",
      });
    }
    let deleted = await Tag.findOneAndDelete({ _id: req.params.id });
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
