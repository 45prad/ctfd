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
    date: { type: Date, default: Date.now },

    challengeValues: [
        {
          challengeId: mongoose.Schema.Types.ObjectId,
          value: Number,
        },
      ],
});

module.exports = mongoose.model("User", UserSchema);