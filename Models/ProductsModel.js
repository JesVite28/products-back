
const { Schema, model } = require('mongoose');

const productsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    date_caducity: { type: Date, required: true },
    date_buy: { type: Date, required: true },
    provider: { type: String, required: true },
    price_buy: { type: Number, required: true },
    image: { type: String}
});

module.exports = model(
    'Product',
    productsSchema,
    "products"
);
