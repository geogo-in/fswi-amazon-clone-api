const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const bannerSchema = new Schema({
    name: String,
    bannerImage: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    linkedToUrl: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    usePushEach: true
});

mongoose.model('Banner', bannerSchema);
