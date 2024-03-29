const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    assignedTeams: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference to other users
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
