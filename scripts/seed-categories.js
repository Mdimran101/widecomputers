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

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categoryHierarchy = [
  {
    name: 'Laptop',
    slug: 'laptop',
    image: '/assets/images/cagetory/laptop.webp',
    subcategories: [
      { name: 'Apple', slug: 'laptop-apple' },
      { name: 'HP', slug: 'laptop-hp' },
      { name: 'Lenovo', slug: 'laptop-lenovo' },
      { name: 'ASUS', slug: 'laptop-asus' },
      { name: 'Acer', slug: 'laptop-acer' },
      { name: 'Dell', slug: 'laptop-dell' },
      { name: 'MSI', slug: 'laptop-msi' },
      { name: 'Laptop Accessories', slug: 'laptop-accessories' }
    ]
  },
  {
    name: 'PC & Server',
    slug: 'pc-server',
    image: '/assets/images/cagetory/pc-server.webp',
    subcategories: [
      { name: 'Desktop PC', slug: 'pc-desktop' },
      { name: 'Processor', slug: 'pc-processor' },
      { name: 'Motherboard', slug: 'pc-motherboard' },
      { name: 'Graphics Card', slug: 'pc-graphics-card' },
      { name: 'RAM', slug: 'pc-ram' },
      { name: 'Power Supply', slug: 'pc-power-supply' },
      { name: 'Casing', slug: 'pc-casing' },
      { name: 'Server', slug: 'pc-server-systems' }
    ]
  },
  {
    name: 'Monitor',
    slug: 'monitor',
    image: '/assets/images/cagetory/monitor.webp',
    subcategories: [
      { name: 'Curved Monitor', slug: 'monitor-curved' },
      { name: 'Gaming Monitor', slug: 'monitor-gaming' },
      { name: 'LG', slug: 'monitor-lg' },
      { name: 'Samsung', slug: 'monitor-samsung' },
      { name: 'ASUS', slug: 'monitor-asus' },
      { name: 'Dell', slug: 'monitor-dell' }
    ]
  },
  {
    name: 'Mobile Phone',
    slug: 'mobile-phone',
    image: '/assets/images/cagetory/mobile-phone.webp',
    subcategories: [
      { name: 'Smart Phone', slug: 'mobile-smart-phone' },
      { name: 'Feature Phone', slug: 'mobile-feature-phone' },
      { name: 'Mobile Accessories', slug: 'mobile-accessories' }
    ]
  },
  {
    name: 'Tablet',
    slug: 'tablet',
    image: '/assets/images/cagetory/tablet.webp',
    subcategories: [
      { name: 'Apple Tablet / iPad', slug: 'tablet-apple' },
      { name: 'Android Tablet', slug: 'tablet-android' },
      { name: 'Graphics Tablet', slug: 'tablet-graphics' },
      { name: 'Accessories', slug: 'tablet-accessories' }
    ]
  },
  {
    name: 'Gadget',
    slug: 'gadget',
    image: '/assets/images/cagetory/gadget.webp',
    subcategories: [
      { name: 'Smartwatch', slug: 'gadget-smartwatch' },
      { name: 'Earbuds', slug: 'gadget-earbuds' },
      { name: 'Neckband', slug: 'gadget-neckband' },
      { name: 'Power Bank', slug: 'gadget-power-bank' },
      { name: 'Smart Lock', slug: 'gadget-smart-lock' }
    ]
  },
  {
    name: 'Camera',
    slug: 'camera',
    image: '/assets/images/cagetory/camera.webp',
    subcategories: [
      { name: 'DSLR Camera', slug: 'camera-dslr' },
      { name: 'Mirrorless Camera', slug: 'camera-mirrorless' },
      { name: 'Drone', "slug": "camera-drone" },
      { name: 'Camera Lens', slug: 'camera-lens' },
      { name: 'Tripod & Gimbal', slug: 'camera-tripod-gimbal' }
    ]
  },
  {
    name: 'Sound',
    slug: 'sound',
    image: '/assets/images/cagetory/sound.webp',
    subcategories: [
      { name: 'Speaker', slug: 'sound-speaker' },
      { name: 'Home Theater', slug: 'sound-home-theater' },
      { name: 'Headphone', slug: 'sound-headphone' },
      { name: 'Earphone', slug: 'sound-earphone' },
      { name: 'Microphone', slug: 'sound-microphone' }
    ]
  }
];

async function seedCategory(node, parentId = null) {
  const created = await Category.create({
    name: node.name,
    slug: node.slug,
    parentCategory: parentId,
    image: node.image || null,
    isActive: true,
  });
  console.log(`Created: ${created.name} (${created.slug})`);
  if (node.subcategories && node.subcategories.length > 0) {
    for (const sub of node.subcategories) {
      await seedCategory(sub, created._id);
    }
  }
}

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing categories
    const deleteResult = await Category.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing categories.`);

    // Insert new hierarchy
    for (const mainCat of categoryHierarchy) {
      await seedCategory(mainCat, null);
    }
    console.log(`Seeding completed successfully!`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
