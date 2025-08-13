import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware';
import { Product } from '../models/product.model';

const router = Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
router.post('/', protect, authorize('seller', 'admin'), async (req, res) => {
    const { name_en, name_ar, description_en, description_ar, price, category_en, category_ar, brand, stock, images } = req.body;

    const product = new Product({
        name_en, name_ar, description_en, description_ar, price, category_en, category_ar, brand, stock, images,
        seller: req.user.id, // Link the product to the logged-in seller
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
router.put('/:id', protect, authorize('seller', 'admin'), async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the logged-in user is the seller of the product or an admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'User not authorized to update this product' });
    }

    // Update fields
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
});

export default router;