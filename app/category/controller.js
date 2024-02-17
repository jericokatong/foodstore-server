const Category = require("./model");

const store = async (req, res, next) => {
  try {
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
  try {
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
  try {
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
