import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        name_en: { type: String, required: true, trim: true }, // ✨ NEW
        name_ar: { type: String, required: true, trim: true }, // ✨ NEW
        description_en: { type: String, required: true }, // ✨ NEW
        description_ar: { type: String, required: true }, // ✨ NEW
        category_en: { type: String, required: true, trim: true }, // ✨ NEW
        category_ar: { type: String, required: true, trim: true }, // ✨ NEW
        brand: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative'],
        },
        stock: {
            type: Number,
            required: true,
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        images: [{ type: String }],
        featured: {
            type: Boolean,
            default: false,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model('Product', productSchema);