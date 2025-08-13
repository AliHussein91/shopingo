import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const addressSchema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['customer', 'seller', 'manager', 'admin'],
            default: 'customer',
        },
        avatar: {
            type: String,
            default: 'default_avatar_url_here',
        },
        language: { // ✨ NEW
            type: String,
            enum: ['en', 'ar'],
            default: 'en',
        },
        theme: { // ✨ NEW
            type: String,
            enum: ['light', 'dark'],
            default: 'light',
        },
        addresses: [addressSchema],
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err as Error);
    }
});

export const User = model('User', userSchema);