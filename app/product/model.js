const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "Panjang nama makanan minimal 3 karakter"],
      required: [true, "Nama produk harus diisi"],
    },
    description: {
      type: String,
      maxLength: [1000, "Panjang deskripsi maksimal 1000 karakter"],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    created_at: Number,
    updated_at: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => Math.floor(Date.now()),
    },
  }
);

module.exports = model("Product", productSchema);
