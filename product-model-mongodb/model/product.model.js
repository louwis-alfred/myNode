const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please enter product name"]

        },

        quantity: {
            type: Number,
            require: [true],
            default: 0,
        },

        price: {
            type: Number,
            require: true,
            default: 0
        },

        image: {
            type: String,
            require: false
        },

    }
)

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;