const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const confirmedOrderSchema = new Schema({
    user: {
        // storing userID from the Users model over here like foreign key
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel' //User.js model was exported as "UserModel"
    },
    order: {
        type: Array,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMode: {
        // (COD, card, online etc.)
        type: String,
        default: "Card"
    },
    paidAmount: {
        type: Number,
        // required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    usePushEach: true
});

mongoose.model('ConfirmedOrder', confirmedOrderSchema);
