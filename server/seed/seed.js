import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import slugify from '../utils/slugify.js';

import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import ContactMessage from '../models/ContactMessage.js';

import { categories, products } from './data.js';

dotenv.config({ quiet: true });

const importData = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Order.deleteMany(),
    Review.deleteMany(),
    ContactMessage.deleteMany(),
  ]);

  await User.create({
    name: 'Admin',
    email: 'admin@leathertiqueimpex.com',
    password: 'Admin@123',
    phone: '+92-300-1234567',
    role: 'admin',
  });

  await User.create({
    name: 'Demo Customer',
    email: 'customer@leathertiqueimpex.com',
    password: 'Customer@123',
    phone: '+92-300-7654321',
    role: 'customer',
    address: {
      street: '12 Gulberg Boulevard',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54000',
      country: 'Pakistan',
    },
  });

  const createdCategories = await Category.insertMany(
    categories.map((cat) => ({ ...cat, slug: slugify(cat.name) }))
  );
  const categoryMap = new Map(createdCategories.map((c) => [c.name, c._id]));

  const productDocs = products.map((p) => {
    let slug = slugify(p.name);
    return {
      ...p,
      slug,
      category: categoryMap.get(p.category),
    };
  });

  await Product.insertMany(productDocs);

  console.log('Seed data imported successfully');
  console.log('----------------------------------------');
  console.log('Admin login:    admin@leathertiqueimpex.com / Admin@123');
  console.log('Customer login: customer@leathertiqueimpex.com / Customer@123');
  console.log('----------------------------------------');
  process.exit(0);
};

const destroyData = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Order.deleteMany(),
    Review.deleteMany(),
    ContactMessage.deleteMany(),
  ]);

  console.log('All data destroyed');
  process.exit(0);
};

if (process.argv.includes('-d')) {
  destroyData();
} else {
  importData();
}
