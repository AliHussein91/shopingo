import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// To prevent a user from reviewing the same product multiple times
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export const Review = model('Review', reviewSchema);