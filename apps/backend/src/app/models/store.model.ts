import { Schema, model } from 'mongoose';

const storeSchema = new Schema(
    {
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        name_en: { type: String, required: true, trim: true }, // ✨ NEW
        name_ar: { type: String, required: true, trim: true }, // ✨ NEW
        description_en: { type: String, required: true }, // ✨ NEW
        description_ar: { type: String, required: true }, // ✨ NEW
        bannerImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Store = model('Store', storeSchema);