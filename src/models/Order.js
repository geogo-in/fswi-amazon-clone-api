const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const orderSchema = new Schema({
    user: {
        type: String, //to need to pass in req.body as it'll be taken via auth-token systme
    },
    orderedItem: {
        // type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        //(pending, confirmed, shipped, delivered, cancelled)
        type: String,
        default: "pending"
    },
    orderItemTotal: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        required: true
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

mongoose.model('Order', orderSchema);
