const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://Wide Computers:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/Wide Computers';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const baseProducts = [
  // ==================== Category 1: Laptop ====================
  {
    name: 'Apple MacBook Air M3',
    slug: 'macbook-air-m3',
    description: 'Experience incredible performance with the Apple MacBook Air powered by the state-of-the-art M3 chip. Built with an incredibly thin all-aluminum design, a brilliant Liquid Retina display, up to 18 hours of battery life, and silent fanless operation.',
    price: 145000,
    purchasePrice: 110000,
    stock: 25,
    sku: 'LAP-AP-M3',
    categorySlug: 'laptop',
    images: ['/assets/images/products/macbook-air-m3.webp'],
    tags: ['macbook', 'm3', 'laptop', 'apple'],
    attributes: [{ key: 'RAM', value: '8GB' }, { key: 'Storage', value: '256GB SSD' }],
  },
  {
    name: 'HP Spectre x360',
    slug: 'hp-spectre-x360',
    description: 'The premium HP Spectre x360 2-in-1 convertible laptop. Features a stunning OLED touchscreen, Intel Core Ultra 7 processor, long-lasting battery, and luxurious nightfall black design with copper accents.',
    price: 185000,
    purchasePrice: 140000,
    stock: 15,
    sku: 'LAP-HP-SPX',
    categorySlug: 'laptop',
    images: ['/assets/images/products/hp-spectre-x360.webp'],
    tags: ['hp', 'spectre', 'x360', 'convertible'],
    attributes: [{ key: 'Processor', value: 'Intel Core Ultra 7' }, { key: 'RAM', value: '16GB' }],
  },
  {
    name: 'ASUS ROG Zephyrus G14',
    slug: 'asus-rog-g14',
    description: 'Power meets portability in the ASUS ROG Zephyrus G14 gaming laptop. Equipped with an AMD Ryzen 9 processor and NVIDIA GeForce RTX 4060 graphics inside a sleek chassis featuring the AniMe Matrix LED lid display.',
    price: 210000,
    purchasePrice: 165000,
    stock: 12,
    sku: 'LAP-AS-G14',
    categorySlug: 'laptop',
    images: ['/assets/images/products/asus-rog-g14.webp'],
    tags: ['gaming laptop', 'rog', 'zephyrus', 'asus'],
    attributes: [{ key: 'GPU', value: 'RTX 4060' }, { key: 'Screen', value: '120Hz ROG Nebula' }],
  },

  // ==================== Category 2: PC & Server ====================
  {
    name: 'Intel Core i9-14900K Processor',
    slug: 'intel-i9-14900k',
    description: 'Take your desktop performance to the extreme with the Intel Core i9-14900K desktop processor. Featuring 24 cores (8 Performance-cores and 16 Efficient-cores) and speeds up to 6.0 GHz out of the box.',
    price: 68000,
    purchasePrice: 52000,
    stock: 30,
    sku: 'CPU-IN-I9K',
    categorySlug: 'pc-server',
    images: ['/assets/images/products/intel-i9-14900k.webp'],
    tags: ['intel', 'processor', 'cpu', 'i9'],
    attributes: [{ key: 'Cores', value: '24 Cores' }, { key: 'Socket', value: 'LGA1700' }],
  },
  {
    name: 'ASUS ROG Strix Z790-E Motherboard',
    slug: 'rog-strix-z790',
    description: 'The ASUS ROG Strix Z790-E Gaming WiFi motherboard delivers robust power delivery and outstanding cooling for high-performance 14th and 13th Gen Intel Core processors.',
    price: 42000,
    purchasePrice: 32000,
    stock: 20,
    sku: 'MOB-AS-Z79',
    categorySlug: 'pc-server',
    images: ['/assets/images/products/rog-strix-z790.webp'],
    tags: ['motherboard', 'rog', 'z790', 'asus'],
    attributes: [{ key: 'Form Factor', value: 'ATX' }, { key: 'Chipset', value: 'Intel Z790' }],
  },
  {
    name: 'NVIDIA GeForce RTX 4090 GPU',
    slug: 'rtx-4090',
    description: 'The ultimate GeForce GPU. The NVIDIA GeForce RTX 4090 brings an enormous leap in performance, efficiency, and AI-powered graphics, powered by the ultra-efficient Ada Lovelace architecture.',
    price: 245000,
    purchasePrice: 195000,
    stock: 8,
    sku: 'GPU-NV-4090',
    categorySlug: 'pc-server',
    images: ['/assets/images/products/rtx-4090.webp'],
    tags: ['nvidia', 'gpu', 'graphics card', 'rtx 4090'],
    attributes: [{ key: 'VRAM', value: '24GB GDDR6X' }, { key: 'Memory Bus', value: '384-bit' }],
  },

  // ==================== Category 3: Monitor ====================
  {
    name: 'Samsung Odyssey Neo G9 Curved Monitor',
    slug: 'samsung-neo-g9',
    description: 'Dive into the game with the massive 49-inch Samsung Odyssey Neo G9 curved gaming monitor, featuring Quantum Mini-LED technology, a blazing-fast 240Hz refresh rate, and immersive 1000R curvature.',
    price: 195000,
    purchasePrice: 155000,
    stock: 10,
    sku: 'MON-SS-G9',
    categorySlug: 'monitor',
    images: ['/assets/images/products/samsung-neo-g9.webp'],
    tags: ['samsung', 'curved monitor', 'gaming monitor', 'odyssey'],
    attributes: [{ key: 'Size', value: '49 inch' }, { key: 'Refresh Rate', value: '240Hz' }],
  },
  {
    name: 'LG UltraFine 4K Monitor',
    slug: 'lg-ultrafine-4k',
    description: 'The professional LG UltraFine 4K display features an IPS panel, accurate color reproduction, and USB-C connectivity, making it the perfect second display for designers, editors, and creators.',
    price: 58000,
    purchasePrice: 46000,
    stock: 18,
    sku: 'MON-LG-4K',
    categorySlug: 'monitor',
    images: ['/assets/images/products/lg-ultrafine-4k.webp'],
    tags: ['lg', '4k monitor', 'ips', 'ultrafine'],
    attributes: [{ key: 'Resolution', value: '3840 x 2160' }, { key: 'Panel', value: 'IPS' }],
  },
  {
    name: 'Dell UltraSharp U2724D Monitor',
    slug: 'dell-ultrasharp-27',
    description: 'Get superb visual clarity and productivity-boosting features with the Dell UltraSharp U2724D 27-inch monitor, featuring outstanding color accuracy and a fully adjustable stand.',
    price: 45000,
    purchasePrice: 35000,
    stock: 25,
    sku: 'MON-DE-U27',
    categorySlug: 'monitor',
    images: ['/assets/images/products/dell-ultrasharp-27.webp'],
    tags: ['dell', 'ultrasharp', 'monitor', 'office'],
    attributes: [{ key: 'Size', value: '27 inch' }, { key: 'Resolution', value: 'QHD 1440p' }],
  },

  // ==================== Category 4: Mobile Phone ====================
  {
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever with 5x optical zoom.',
    price: 165000,
    purchasePrice: 135000,
    stock: 35,
    sku: 'MOB-AP-15PM',
    categorySlug: 'mobile-phone',
    images: ['/assets/images/products/iphone-15-pro-max.webp'],
    tags: ['iphone', 'apple', 'smartphone', '15 pro max'],
    attributes: [{ key: 'Storage', value: '256GB' }, { key: 'Color', value: 'Natural Titanium' }],
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'galaxy-s24-ultra',
    description: 'Welcome to the era of mobile AI with the Samsung Galaxy S24 Ultra. Zoom into details with the 200MP camera and write, draw, or navigate with the integrated S-Pen.',
    price: 155000,
    purchasePrice: 125000,
    stock: 40,
    sku: 'MOB-SS-S24U',
    categorySlug: 'mobile-phone',
    images: ['/assets/images/products/galaxy-s24-ultra.webp'],
    tags: ['samsung', 'galaxy', 's24 ultra', 'android'],
    attributes: [{ key: 'Storage', value: '512GB' }, { key: 'RAM', value: '12GB' }],
  },
  {
    name: 'Google Pixel 8 Pro',
    slug: 'pixel-8-pro',
    description: 'The all-pro phone engineered by Google. Powered by the Tensor G3 chip, it features advanced Google AI photography tools like Best Take, Audio Magic Eraser, and Magic Editor.',
    price: 115000,
    purchasePrice: 90000,
    stock: 22,
    sku: 'MOB-GG-P8P',
    categorySlug: 'mobile-phone',
    images: ['/assets/images/products/pixel-8-pro.webp'],
    tags: ['google', 'pixel 8', 'pro', 'camera phone'],
    attributes: [{ key: 'Color', value: 'Bay Blue' }, { key: 'Storage', value: '128GB' }],
  },

  // ==================== Category 5: Tablet ====================
  {
    name: 'iPad Pro M4',
    slug: 'ipad-pro-m4',
    description: 'The thinnest Apple product ever. Power-packed by the Apple M4 chip, featuring a revolutionary Tandem OLED Ultra Retina XDR display, and supporting the new Apple Pencil Pro.',
    price: 125000,
    purchasePrice: 98000,
    stock: 20,
    sku: 'TAB-AP-M4',
    categorySlug: 'tablet',
    images: ['/assets/images/products/ipad-pro-m4.webp'],
    tags: ['ipad pro', 'm4', 'apple tablet', 'oled'],
    attributes: [{ key: 'Size', value: '11 inch' }, { key: 'Storage', value: '256GB' }],
  },
  {
    name: 'Samsung Galaxy Tab S9 Ultra',
    slug: 'galaxy-tab-s9',
    description: 'Go big with the Samsung Galaxy Tab S9 Ultra. Features a massive 14.6-inch Dynamic AMOLED 2X screen, water-resistant IP68 design, and powerful Snapdragon 8 Gen 2 processor.',
    price: 110000,
    purchasePrice: 88000,
    stock: 15,
    sku: 'TAB-SS-S9U',
    categorySlug: 'tablet',
    images: ['/assets/images/products/galaxy-tab-s9.webp'],
    tags: ['samsung tablet', 'tab s9', 'ultra', 'android tablet'],
    attributes: [{ key: 'Size', value: '14.6 inch' }, { key: 'Stylus', value: 'S-Pen Included' }],
  },
  {
    name: 'Wacom Intuos Pro Graphics Tablet',
    slug: 'wacom-intuos-pro',
    description: 'The industry standard in creative pen tablets. Designed for digital artists, designers, and retouchers who demand absolute precision and control with 8192 pressure sensitivity levels.',
    price: 38000,
    purchasePrice: 28000,
    stock: 25,
    sku: 'TAB-WC-IPRO',
    categorySlug: 'tablet',
    images: ['/assets/images/products/wacom-intuos-pro.webp'],
    tags: ['wacom', 'drawing tablet', 'graphics tablet', 'intuos'],
    attributes: [{ key: 'Size', value: 'Medium' }, { key: 'Pressure Levels', value: '8192' }],
  },

  // ==================== Category 6: Gadget ====================
  {
    name: 'Apple Watch Ultra 2',
    slug: 'apple-watch-ultra-2',
    description: 'The ultimate sports and adventure watch. Powered by the S9 SiP chip, featuring the brightest display Apple ever made, and up to 72 hours of battery life in low power mode.',
    price: 95000,
    purchasePrice: 75000,
    stock: 20,
    sku: 'GAD-AP-ULT2',
    categorySlug: 'gadget',
    images: ['/assets/images/products/apple-watch-ultra-2.webp'],
    tags: ['apple watch', 'ultra 2', 'smartwatch', 'gps'],
    attributes: [{ key: 'Case Size', value: '49mm' }, { key: 'Material', value: 'Titanium' }],
  },
  {
    name: 'Sony WF-1000XM5 Earbuds',
    slug: 'sony-wf1000xm5',
    description: 'The best noise cancelling wireless earbuds on the market. Sony WF-1000XM5 features cutting-edge technology to deliver premium sound quality and the best call quality ever.',
    price: 28000,
    purchasePrice: 20000,
    stock: 50,
    sku: 'GAD-SO-WF5',
    categorySlug: 'gadget',
    images: ['/assets/images/products/sony-wf1000xm5.webp'],
    tags: ['sony', 'earbuds', 'noise cancelling', 'wireless'],
    attributes: [{ key: 'Battery Life', value: 'Up to 24 hours' }, { key: 'Waterproof', value: 'IPX4' }],
  },
  {
    name: 'DJI Osmo Mobile 6 Gimbal',
    slug: 'dji-osmo-mobile-6',
    description: 'A smart smartphone stabilizer packed with creative features. DJI Osmo Mobile 6 is compact, easily foldable, and launches automatically once unfolded to capture steady cinematic videos.',
    price: 18000,
    purchasePrice: 13000,
    stock: 45,
    sku: 'GAD-DJ-OM6',
    categorySlug: 'gadget',
    images: ['/assets/images/products/dji-osmo-mobile-6.webp'],
    tags: ['dji', 'gimbal', 'stabilizer', 'vlogging'],
    attributes: [{ key: 'Weight', value: '309g' }, { key: 'App Support', value: 'DJI Mimo' }],
  },

  // ==================== Category 7: Camera ====================
  {
    name: 'Sony Alpha 7 IV Mirrorless Camera',
    slug: 'sony-a7iv',
    description: 'The perfect hybrid mirrorless camera. Featuring a 33MP Exmor R CMOS sensor, advanced real-time autofocus tracking, and 4K 60p video recording capabilities.',
    price: 235000,
    purchasePrice: 185000,
    stock: 8,
    sku: 'CAM-SO-A7IV',
    categorySlug: 'camera',
    images: ['/assets/images/products/sony-a7iv.webp'],
    tags: ['sony', 'mirrorless', 'alpha 7', 'hybrid camera'],
    attributes: [{ key: 'Sensor', value: '33MP Full-Frame' }, { key: 'Video Resolution', value: '4K UHD' }],
  },
  {
    name: 'DJI Mini 4 Pro Drone',
    slug: 'dji-mini-4-pro',
    description: 'DJI\'s most advanced mini drone yet. Integrates powerful imaging capabilities, omnidirectional obstacle sensing, ActiveTrack 360°, and 20km FHD video transmission.',
    price: 98000,
    purchasePrice: 78000,
    stock: 12,
    sku: 'CAM-DJ-M4P',
    categorySlug: 'camera',
    images: ['/assets/images/products/dji-mini-4-pro.webp'],
    tags: ['dji', 'drone', 'mini 4 pro', 'aerial video'],
    attributes: [{ key: 'Weight', value: '249g' }, { key: 'Flight Time', value: 'Up to 34 mins' }],
  },
  {
    name: 'GoPro HERO12 Black',
    slug: 'gopro-hero12',
    description: 'Take your actions to the extreme with the GoPro HERO12 Black. Features incredible image quality, even better HyperSmooth 6.0 video stabilization, and a huge boost in battery life.',
    price: 49000,
    purchasePrice: 38000,
    stock: 30,
    sku: 'CAM-GP-H12',
    categorySlug: 'camera',
    images: ['/assets/images/products/gopro-hero12.webp'],
    tags: ['gopro', 'action camera', 'herop12', 'waterproof'],
    attributes: [{ key: 'Resolution', value: '5.3K Video' }, { key: 'Stabilization', value: 'HyperSmooth 6.0' }],
  },

  // ==================== Category 8: Sound ====================
  {
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh1000xm5',
    description: 'Sony WH-1000XM5 wireless noise cancelling headphones rewrite the rules for distraction-free listening. Featuring two processors controlling eight microphones for unparalleled noise cancellation.',
    price: 38000,
    purchasePrice: 28000,
    stock: 35,
    sku: 'SND-SO-WH5',
    categorySlug: 'sound',
    images: ['/assets/images/products/sony-wh1000xm5.webp'],
    tags: ['sony', 'headphones', 'noise cancelling', 'wireless audio'],
    attributes: [{ key: 'Battery Life', value: 'Up to 30 hours' }, { key: 'Bluetooth', value: 'v5.2' }],
  },
  {
    name: 'JBL Boombox 3 Portable Speaker',
    slug: 'jbl-boombox-3',
    description: 'Get massive sound and the deepest bass with the JBL Boombox 3 portable Bluetooth speaker. Features IP67 dustproof and waterproof design, and a solid metal handlebar.',
    price: 48000,
    purchasePrice: 38000,
    stock: 20,
    sku: 'SND-JB-BB3',
    categorySlug: 'sound',
    images: ['/assets/images/products/jbl-boombox-3.webp'],
    tags: ['jbl', 'boombox', 'portable speaker', 'waterproof'],
    attributes: [{ key: 'Output Power', value: '180W RMS' }, { key: 'Battery', value: '24 hours' }],
  },
  {
    name: 'Shure SM7B Vocal Microphone',
    slug: 'shure-sm7b',
    description: 'The Shure SM7B dynamic microphone is a legendary vocal microphone known for its smooth, flat, wide-range frequency response, ideal for music, podcasting, and broadcasting.',
    price: 45000,
    purchasePrice: 35000,
    stock: 15,
    sku: 'SND-SH-SM7B',
    categorySlug: 'sound',
    images: ['/assets/images/products/shure-sm7b.webp'],
    tags: ['shure', 'microphone', 'studio mic', 'podcasting'],
    attributes: [{ key: 'Type', value: 'Dynamic' }, { key: 'Polar Pattern', value: 'Cardioid' }],
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Fetch all categories to map slug to ID
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with correct ObjectIds and Section Flags
    const finalProducts = baseProducts.map((p, idx) => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }

      const productCopy = { ...p };
      productCopy.categories = [categoryId];
      delete productCopy.categorySlug;

      // Assign exactly 10 products with isFeatured = true (index 0 to 9)
      if (idx >= 0 && idx < 10) {
        productCopy.isFeatured = true;
      }

      // Assign exactly 10 products with isNewArrival = true (index 7 to 16)
      if (idx >= 7 && idx < 17) {
        productCopy.isNewArrival = true;
      }

      // Assign exactly 10 products with isFlashSale = true (index 14 to 23)
      if (idx >= 14 && idx < 24) {
        productCopy.isFlashSale = true;
      }

      // Assign exactly 10 products as discounted (index 0 to 9)
      if (idx >= 0 && idx < 10) {
        // Calculate a realistic sale price (e.g. around 8-15% discount)
        const discountRate = 10; // 10% discount
        productCopy.discountRate = discountRate;
        productCopy.salePrice = Math.round(productCopy.price * (1 - discountRate / 100));
      }

      return productCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully!`);

    // Verify constraints
    let featuredCount = 0;
    let newArrivalCount = 0;
    let flashSaleCount = 0;
    let discountedCount = 0;

    insertResult.forEach(prod => {
      if (prod.isFeatured) featuredCount++;
      if (prod.isNewArrival) newArrivalCount++;
      if (prod.isFlashSale) flashSaleCount++;
      if (prod.salePrice && prod.discountRate) discountedCount++;
    });

    console.log(`Seeding Verification:`);
    console.log(`- Featured Products: ${featuredCount} (Expected: 10)`);
    console.log(`- New Arrivals: ${newArrivalCount} (Expected: 10)`);
    console.log(`- Flash Sales: ${flashSaleCount} (Expected: 10)`);
    console.log(`- Discounted Products: ${discountedCount} (Expected: 10)`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
