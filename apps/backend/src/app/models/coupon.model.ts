import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    expiryDate: {
        type: Date,
    },
});

export const Coupon = model('Coupon', couponSchema);