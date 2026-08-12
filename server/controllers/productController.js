import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import slugify from '../utils/slugify.js';

// @desc    Get all products (search, filter, sort, paginate)
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { search, category, minPrice, maxPrice, sort, featured, page = 1, limit = 12 } = req.query;

  const query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (category) {
    query.category = category;
  }

  if (featured) {
    query.featured = featured === 'true';
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price-asc') sortOption = { price: 1 };
  if (sort === 'price-desc') sortOption = { price: -1 };
  if (sort === 'name-asc') sortOption = { name: 1 };
  if (sort === 'rating') sortOption = { rating: -1 };
  if (sort === 'newest') sortOption = { createdAt: -1 };

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name slug').sort(sortOption).skip(skip).limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    total,
  });
});

// @desc    Get single product by id or slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);

  const product = await Product.findOne(isObjectId ? { _id: id } : { slug: id }).populate(
    'category',
    'name slug'
  );

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4)
    .populate('category', 'name slug');

  res.json(related);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, images, stock, specifications, variants, featured } = req.body;

  if (!name || !description || price === undefined || !category) {
    res.status(400);
    throw new Error('Please provide name, description, price, and category');
  }

  let slug = slugify(name);
  const existing = await Product.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const product = await Product.create({
    name,
    slug,
    description,
    price,
    category,
    images: images || [],
    stock: stock || 0,
    specifications: specifications || [],
    variants: variants || [],
    featured: featured || false,
  });

  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, category, images, stock, specifications, variants, featured } = req.body;

  if (name && name !== product.name) {
    product.name = name;
    let slug = slugify(name);
    const existing = await Product.findOne({ slug, _id: { $ne: product._id } });
    product.slug = existing ? `${slug}-${Date.now()}` : slug;
  }

  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.images = images ?? product.images;
  product.stock = stock ?? product.stock;
  product.specifications = specifications ?? product.specifications;
  product.variants = variants ?? product.variants;
  product.featured = featured ?? product.featured;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});
