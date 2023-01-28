const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types

const orderRequestSchema = mongoose.Schema({
    createdBy: {
        id: { type: ObjectId, ref: 'User' },
        role: String
    },
    allItems: [{ id: { type: ObjectId, ref: 'Item' }, qty: { type: Number, default: 1 }, totalPrice: Number }],
    totalPrice: Number,
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Approved"]
    }
}, { timestamps: true })

const OrderRequest = mongoose.model("OrderRequest", orderRequestSchema)
module.exports = OrderRequest