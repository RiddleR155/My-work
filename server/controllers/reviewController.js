import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
  res.json(reviews);
});

// @desc    Create a review for a product
// @route   POST /api/reviews/:productId
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;

  if (!rating || !comment) {
    res.status(400);
    throw new Error('Please provide a rating and comment');
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  await Review.create({
    user: req.user._id,
    product: productId,
    rating: Number(rating),
    comment,
  });

  const allReviews = await Review.find({ product: productId });
  product.numReviews = allReviews.length;
  product.rating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
  await product.save();

  res.status(201).json({ message: 'Review added' });
});
