import { Schema, model } from 'mongoose';

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.'],
    },
    // We store the price here to keep a historical record of the price at the time of purchase
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // The order items are an array of the sub-document defined above
        orderItems: [orderItemSchema],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
        paidAt: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

export const Order = model('Order', orderSchema);