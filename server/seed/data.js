export const categories = [
  {
    name: 'Leather Jackets',
    description: 'Timeless outerwear crafted from full-grain leather, built to age beautifully.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
  },
  {
    name: 'Leather Bags',
    description: 'Handcrafted totes, messengers, and travel bags for everyday carry.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  },
  {
    name: 'Wallets',
    description: 'Slim, durable wallets finished by hand with meticulous stitching.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
  {
    name: 'Belts',
    description: 'Full-grain leather belts with solid brass and nickel hardware.',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
  },
  {
    name: 'Gloves',
    description: 'Supple leather gloves lined for warmth without sacrificing dexterity.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2645?w=800&q=80',
  },
  {
    name: 'Accessories',
    description: 'Small leather goods and finishing touches for the everyday carry.',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80',
  },
];

// products reference categories by name; seed.js resolves the ObjectId
export const products = [
  // Leather Jackets
  {
    name: 'Classic Genuine Leather Jacket',
    category: 'Leather Jackets',
    price: 24500,
    stock: 14,
    featured: true,
    description:
      'A timeless biker silhouette cut from full-grain cowhide leather. Hand-finished with an antique brass zipper and quilted satin lining, this jacket is built to be worn for decades and only look better with age.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&q=80',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=1000&q=80',
    ],
    specifications: [
      { key: 'Material', value: 'Full-grain cowhide leather' },
      { key: 'Lining', value: 'Quilted satin' },
      { key: 'Closure', value: 'Brass YKK zipper' },
      { key: 'Origin', value: 'Handcrafted in Pakistan' },
    ],
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Color', options: ['Black', 'Dark Brown'] },
    ],
  },
  {
    name: 'Heritage Bomber Leather Jacket',
    category: 'Leather Jackets',
    price: 27800,
    stock: 9,
    featured: true,
    description:
      'Inspired by mid-century flight jackets, the Heritage Bomber pairs a soft lambskin shell with ribbed cuffs and hem for a snug, insulated fit. A modern wardrobe staple with unmistakable vintage character.',
    images: ['https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Lambskin leather' },
      { key: 'Lining', value: 'Polyester blend' },
      { key: 'Closure', value: 'Ribbed knit cuffs and hem' },
    ],
    variants: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }],
  },
  {
    name: 'Vintage Distressed Leather Jacket',
    category: 'Leather Jackets',
    price: 26200,
    stock: 7,
    featured: false,
    description:
      'A pre-aged, distressed finish gives this jacket instant character. Cut from heavyweight buffalo leather with reinforced stitching at every stress point for a rugged, long-lasting outer layer.',
    images: ['https://images.unsplash.com/photo-1517940310602-26535839fe84?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Buffalo leather' },
      { key: 'Finish', value: 'Distressed antique' },
    ],
    variants: [{ name: 'Size', options: ['M', 'L', 'XL', 'XXL'] }],
  },
  {
    name: "Women's Tailored Leather Jacket",
    category: 'Leather Jackets',
    price: 23800,
    stock: 11,
    featured: false,
    description:
      'A tailored silhouette designed for a flattering fit, crafted from soft nappa leather with a satin interior. Understated hardware keeps the look polished and versatile from day to night.',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Nappa leather' },
      { key: 'Fit', value: 'Tailored' },
    ],
    variants: [{ name: 'Size', options: ['XS', 'S', 'M', 'L'] }],
  },

  // Leather Bags
  {
    name: 'Executive Leather Briefcase',
    category: 'Leather Bags',
    price: 18500,
    stock: 16,
    featured: true,
    description:
      'A structured briefcase built for the boardroom, with a padded 15" laptop sleeve, dedicated document compartments, and a full-grain leather exterior that develops a rich patina over time.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=80',
    ],
    specifications: [
      { key: 'Material', value: 'Full-grain leather' },
      { key: 'Laptop Sleeve', value: 'Fits up to 15 inches' },
      { key: 'Hardware', value: 'Antique brass' },
    ],
    variants: [{ name: 'Color', options: ['Tan', 'Dark Brown', 'Black'] }],
  },
  {
    name: 'Vintage Leather Messenger Bag',
    category: 'Leather Bags',
    price: 15900,
    stock: 20,
    featured: true,
    description:
      'A rugged, everyday messenger bag with an adjustable canvas-backed strap and a spacious main compartment. Designed for students and professionals who need durability without bulk.',
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2645?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Crazy-horse leather' },
      { key: 'Strap', value: 'Adjustable, cross-body' },
    ],
    variants: [{ name: 'Color', options: ['Brown', 'Tan'] }],
  },
  {
    name: 'Artisan Leather Tote Bag',
    category: 'Leather Bags',
    price: 13200,
    stock: 18,
    featured: false,
    description:
      'An open-top tote handcrafted from soft pebbled leather, roomy enough for daily essentials, a laptop, and more. Reinforced handles are riveted for years of dependable carry.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Pebbled leather' },
      { key: 'Interior', value: 'Cotton twill lining with zip pocket' },
    ],
    variants: [{ name: 'Color', options: ['Cognac', 'Black', 'Cream'] }],
  },
  {
    name: 'Leather Weekender Travel Bag',
    category: 'Leather Bags',
    price: 21500,
    stock: 8,
    featured: false,
    description:
      'A spacious duffel built for short trips, featuring a detachable shoulder strap, shoe compartment, and brass-finished zippers. The kind of bag that gets better with every journey.',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Full-grain leather' },
      { key: 'Capacity', value: '45L' },
    ],
    variants: [{ name: 'Color', options: ['Brown', 'Black'] }],
  },
  {
    name: 'Compact Leather Backpack',
    category: 'Leather Bags',
    price: 16800,
    stock: 13,
    featured: false,
    description:
      'A minimalist backpack that balances form and function, with a padded laptop sleeve, magnetic-flap closure, and adjustable straps for all-day comfort.',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Top-grain leather' },
      { key: 'Laptop Sleeve', value: 'Fits up to 14 inches' },
    ],
    variants: [{ name: 'Color', options: ['Tan', 'Black'] }],
  },

  // Wallets
  {
    name: 'Heritage Leather Wallet',
    category: 'Wallets',
    price: 3200,
    stock: 45,
    featured: true,
    description:
      'A bifold wallet cut from a single piece of vegetable-tanned leather, with six card slots and a full-length bill compartment. Slim enough for a front pocket, sturdy enough to last a lifetime.',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Vegetable-tanned leather' },
      { key: 'Card Slots', value: '6' },
    ],
    variants: [{ name: 'Color', options: ['Brown', 'Black', 'Tan'] }],
  },
  {
    name: 'Slim Bifold Cardholder Wallet',
    category: 'Wallets',
    price: 2400,
    stock: 60,
    featured: false,
    description:
      'A pared-back cardholder for those who carry light. Four card slots and a central pocket for folded notes, finished with edge-painted seams for a clean, refined look.',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Nappa leather' },
      { key: 'Card Slots', value: '4' },
    ],
    variants: [{ name: 'Color', options: ['Black', 'Burgundy'] }],
  },
  {
    name: "Women's Leather Zip Wallet",
    category: 'Wallets',
    price: 3800,
    stock: 30,
    featured: false,
    description:
      'A secure zip-around wallet with dedicated compartments for cards, coins, and a phone pocket. Finished with a soft-touch pull tab and a subtle embossed logo.',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Genuine leather' },
      { key: 'Closure', value: 'Zip-around' },
    ],
    variants: [{ name: 'Color', options: ['Tan', 'Red', 'Black'] }],
  },

  // Belts
  {
    name: 'Premium Leather Belt',
    category: 'Belts',
    price: 3600,
    stock: 40,
    featured: true,
    description:
      'A classic dress belt made from a single strip of full-grain leather, finished with a solid brass buckle. Pairs equally well with tailored trousers or raw denim.',
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Full-grain leather' },
      { key: 'Buckle', value: 'Solid brass' },
      { key: 'Width', value: '3.5cm' },
    ],
    variants: [{ name: 'Size', options: ['32', '34', '36', '38', '40'] }],
  },
  {
    name: 'Reversible Leather Belt',
    category: 'Belts',
    price: 4200,
    stock: 25,
    featured: false,
    description:
      'Two belts in one — a rotating buckle lets you switch between black and brown leather faces in seconds, ideal for travel and versatile everyday styling.',
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Double-sided leather' },
      { key: 'Buckle', value: 'Rotating nickel finish' },
    ],
    variants: [{ name: 'Size', options: ['32', '34', '36', '38'] }],
  },
  {
    name: 'Woven Leather Casual Belt',
    category: 'Belts',
    price: 3100,
    stock: 22,
    featured: false,
    description:
      'A hand-woven leather belt that adds texture to relaxed, off-duty outfits without losing the durability of full-grain hide.',
    images: ['https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=1000&q=80'],
    specifications: [{ key: 'Material', value: 'Woven leather' }],
    variants: [{ name: 'Size', options: ['32', '34', '36', '38', '40'] }],
  },

  // Gloves
  {
    name: 'Artisan Leather Gloves',
    category: 'Gloves',
    price: 4800,
    stock: 28,
    featured: true,
    description:
      'Cashmere-lined gloves cut from buttery-soft lambskin, hand-stitched at the seams for a close, flexible fit that keeps dexterity intact in cold weather.',
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2645?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Lambskin leather' },
      { key: 'Lining', value: 'Cashmere blend' },
    ],
    variants: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }],
  },
  {
    name: 'Touchscreen Leather Driving Gloves',
    category: 'Gloves',
    price: 4200,
    stock: 24,
    featured: false,
    description:
      'Perforated leather palms and touchscreen-compatible fingertips make these gloves as practical as they are refined — built for the drive and everything after.',
    images: ['https://images.unsplash.com/photo-1547949003-9792a18a2645?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Perforated goat leather' },
      { key: 'Feature', value: 'Touchscreen compatible' },
    ],
    variants: [{ name: 'Size', options: ['S', 'M', 'L'] }],
  },

  // Accessories
  {
    name: 'Leather Passport Holder',
    category: 'Accessories',
    price: 2200,
    stock: 50,
    featured: false,
    description:
      'A snug-fitting passport cover with a card slot and boarding-pass pocket, made from full-grain leather that travels well and ages gracefully.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1000&q=80'],
    specifications: [{ key: 'Material', value: 'Full-grain leather' }],
    variants: [{ name: 'Color', options: ['Brown', 'Black', 'Navy'] }],
  },
  {
    name: 'Leather Watch Strap',
    category: 'Accessories',
    price: 1800,
    stock: 55,
    featured: false,
    description:
      'A hand-stitched replacement watch strap in vegetable-tanned leather, quick-release pins for tool-free swaps between straps.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1000&q=80'],
    specifications: [
      { key: 'Material', value: 'Vegetable-tanned leather' },
      { key: 'Width', value: '20mm / 22mm' },
    ],
    variants: [{ name: 'Width', options: ['20mm', '22mm'] }],
  },
  {
    name: 'Leather Keychain Set',
    category: 'Accessories',
    price: 1200,
    stock: 70,
    featured: false,
    description:
      'A set of two hand-cut leather keychains with brass rings, small enough to gift, sturdy enough to carry your keys for years.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1000&q=80'],
    specifications: [{ key: 'Material', value: 'Scrap leather offcuts' }],
    variants: [{ name: 'Color', options: ['Brown', 'Black'] }],
  },
];
