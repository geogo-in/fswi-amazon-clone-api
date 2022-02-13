const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const reviewsOrderSchema = new Schema({
    user: {
        // storing userID from the Users model over here like foreign key
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel' //User.js model was exported as "UserModel"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    headline: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    usePushEach: true
});

mongoose.model('Reviews', reviewsOrderSchema);
