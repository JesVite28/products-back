const { Schema, model } = require('mongoose');

const rolesSchema = new Schema({
    name: { type: String},
});

module.exports = model(
    'role',
    rolesSchema,
    "roles"
);
