const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ref: 'role', type: Schema.Types.ObjectId }]
});

userSchema.statics.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async function(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
}

module.exports = model(
    'user',
    userSchema,
    "users"
);
