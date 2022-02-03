const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const confirmedOrderSchema = new Schema({
    user: {
        type: String, //to need to pass in req.body as it'll be taken via auth-token systme
    },
    order: {
        type: Object,
        required: true,
        lackbox: true
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
