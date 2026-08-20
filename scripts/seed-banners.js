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
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://Wide Computers:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/Wide Computers';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'NEXT-GEN GAMING RIGS',
    image: '/assets/images/Banner/40422d47-d52a-4e45-8dd5-60977ea0.webp',
    link: '/shop?category=desktop-pc',
    primaryBtnText: 'EXPLORE PC BUILDS',
    primaryBtnLink: '/shop?category=desktop-pc',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 1,
    isActive: true,
  },
  {
    title: 'UNLEASH PURE POWER',
    image: '/assets/images/Banner/banner-gpu-processors.webp',
    link: '/shop?category=components',
    primaryBtnText: 'SHOP COMPONENTS',
    primaryBtnLink: '/shop?category=components',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 2,
    isActive: true,
  },
  {
    title: 'PRO-GRADE GAMING GEAR',
    image: '/assets/images/Banner/banner-gaming-peripherals.webp',
    link: '/shop?category=accessories',
    primaryBtnText: 'DISCOVER GEAR',
    primaryBtnLink: '/shop?category=accessories',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 3,
    isActive: true,
  },
  {
    title: 'MAXIMUM SPEED & STORAGE',
    image: '/assets/images/Banner/banner-storage-memory.webp',
    link: '/shop?category=storage',
    primaryBtnText: 'UPGRADE NOW',
    primaryBtnLink: '/shop?category=storage',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 4,
    isActive: true,
  },
  {
    title: 'BUILT FOR CREATORS & PROS',
    image: '/assets/images/Banner/banner-creator-workstation.webp',
    link: '/shop?category=laptops',
    primaryBtnText: 'EXPLORE WORKSTATIONS',
    primaryBtnLink: '/shop?category=laptops',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
