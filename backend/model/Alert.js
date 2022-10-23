const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
    machine: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    sound_clip: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    action: {
        type: String,
    },
    is_new: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Alert", alertSchema);