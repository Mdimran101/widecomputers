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
      {
        name: 'Apple',
        slug: 'laptop-apple',
        subcategories: [
          { name: 'MacBook Air', slug: 'laptop-apple-macbook-air' },
          { name: 'MacBook Pro', slug: 'laptop-apple-macbook-pro' },
          { name: 'Mac Mini', slug: 'laptop-apple-mac-mini' },
          { name: 'Mac Studio', slug: 'laptop-apple-mac-studio' },
          { name: 'iMac', slug: 'laptop-apple-imac' }
        ]
      },
      {
        name: 'HP',
        slug: 'laptop-hp',
        subcategories: [
          { name: 'Spectre Series', slug: 'laptop-hp-spectre' },
          { name: 'Envy Series', slug: 'laptop-hp-envy' },
          { name: 'Pavilion Series', slug: 'laptop-hp-pavilion' },
          { name: 'ProBook', slug: 'laptop-hp-probook' },
          { name: 'EliteBook', slug: 'laptop-hp-elitebook' }
        ]
      },
      {
        name: 'Lenovo',
        slug: 'laptop-lenovo',
        subcategories: [
          { name: 'ThinkPad', slug: 'laptop-lenovo-thinkpad' },
          { name: 'IdeaPad', slug: 'laptop-lenovo-ideapad' },
          { name: 'Yoga Series', slug: 'laptop-lenovo-yoga' },
          { name: 'Legion Gaming', slug: 'laptop-lenovo-legion' },
          { name: 'LOQ Series', slug: 'laptop-lenovo-loq' }
        ]
      },
      {
        name: 'ASUS',
        slug: 'laptop-asus',
        subcategories: [
          { name: 'ZenBook', slug: 'laptop-asus-zenbook' },
          { name: 'VivoBook', slug: 'laptop-asus-vivobook' },
          { name: 'ROG Zephyrus', slug: 'laptop-asus-rog' },
          { name: 'TUF Gaming', slug: 'laptop-asus-tuf' },
          { name: 'ExpertBook', slug: 'laptop-asus-expertbook' }
        ]
      },
      {
        name: 'Acer',
        slug: 'laptop-acer',
        subcategories: [
          { name: 'Swift Series', slug: 'laptop-acer-swift' },
          { name: 'Aspire Series', slug: 'laptop-acer-aspire' },
          { name: 'Nitro Gaming', slug: 'laptop-acer-nitro' },
          { name: 'Predator Series', slug: 'laptop-acer-predator' },
          { name: 'TravelMate', slug: 'laptop-acer-travelmate' }
        ]
      },
      {
        name: 'Dell',
        slug: 'laptop-dell',
        subcategories: [
          { name: 'XPS Series', slug: 'laptop-dell-xps' },
          { name: 'Inspiron', slug: 'laptop-dell-inspiron' },
          { name: 'Latitude', slug: 'laptop-dell-latitude' },
          { name: 'Vostro', slug: 'laptop-dell-vostro' },
          { name: 'Alienware', slug: 'laptop-dell-alienware' }
        ]
      },
      {
        name: 'MSI',
        slug: 'laptop-msi',
        subcategories: [
          { name: 'Modern Series', slug: 'laptop-msi-modern' },
          { name: 'Prestige Series', slug: 'laptop-msi-prestige' },
          { name: 'Stealth Series', slug: 'laptop-msi-stealth' },
          { name: 'Katana Series', slug: 'laptop-msi-katana' },
          { name: 'Raider Series', slug: 'laptop-msi-raider' }
        ]
      },
      {
        name: 'Laptop Accessories',
        slug: 'laptop-accessories',
        subcategories: [
          { name: 'Laptop Bags', slug: 'laptop-acc-bags' },
          { name: 'Laptop Stands', slug: 'laptop-acc-stands' },
          { name: 'Cooling Pads', slug: 'laptop-acc-coolers' },
          { name: 'Chargers & Adapters', slug: 'laptop-acc-chargers' },
          { name: 'Keyboard Covers', slug: 'laptop-acc-covers' }
        ]
      }
    ]
  },
  {
    name: 'PC & Server',
    slug: 'pc-server',
    image: '/assets/images/cagetory/pc-server.webp',
    subcategories: [
      {
        name: 'Desktop PC',
        slug: 'pc-desktop',
        subcategories: [
          { name: 'Gaming PC', slug: 'pc-desktop-gaming' },
          { name: 'Brand PC', slug: 'pc-desktop-brand' },
          { name: 'Workstation', slug: 'pc-desktop-workstation' },
          { name: 'Mini PC', slug: 'pc-desktop-mini' },
          { name: 'All-in-One PC', slug: 'pc-desktop-aio' }
        ]
      },
      {
        name: 'Processor',
        slug: 'pc-processor',
        subcategories: [
          { name: 'Intel Core i9', slug: 'pc-processor-i9' },
          { name: 'Intel Core i7', slug: 'pc-processor-i7' },
          { name: 'Intel Core i5', slug: 'pc-processor-i5' },
          { name: 'AMD Ryzen 9', slug: 'pc-processor-r9' },
          { name: 'AMD Ryzen 7', slug: 'pc-processor-r7' }
        ]
      },
      {
        name: 'Motherboard',
        slug: 'pc-motherboard',
        subcategories: [
          { name: 'Intel Platform', slug: 'pc-motherboard-intel' },
          { name: 'AMD Platform', slug: 'pc-motherboard-amd' },
          { name: 'Gaming Motherboard', slug: 'pc-motherboard-gaming' },
          { name: 'Workstation Board', slug: 'pc-motherboard-workstation' },
          { name: 'Creator Series', slug: 'pc-motherboard-creator' }
        ]
      },
      {
        name: 'Graphics Card',
        slug: 'pc-graphics-card',
        subcategories: [
          { name: 'NVIDIA RTX Series', slug: 'pc-gpu-rtx' },
          { name: 'AMD Radeon Series', slug: 'pc-gpu-radeon' },
          { name: 'Gaming OC Edition', slug: 'pc-gpu-gaming-oc' },
          { name: 'Watercooled GPU', slug: 'pc-gpu-watercooled' },
          { name: 'Professional GPU', slug: 'pc-gpu-workstation' }
        ]
      },
      {
        name: 'RAM',
        slug: 'pc-ram',
        subcategories: [
          { name: 'DDR5 Desktop RAM', slug: 'pc-ram-ddr5-desktop' },
          { name: 'DDR4 Desktop RAM', slug: 'pc-ram-ddr4-desktop' },
          { name: 'RGB Gaming RAM', slug: 'pc-ram-rgb-gaming' },
          { name: 'Laptop RAM', slug: 'pc-ram-laptop' },
          { name: 'Server ECC RAM', slug: 'pc-ram-server' }
        ]
      },
      {
        name: 'Power Supply',
        slug: 'pc-power-supply',
        subcategories: [
          { name: '80+ Gold PSU', slug: 'pc-psu-gold' },
          { name: '80+ Bronze PSU', slug: 'pc-psu-bronze' },
          { name: 'Modular PSU', slug: 'pc-psu-modular' },
          { name: 'SFX Power Supply', slug: 'pc-psu-sfx' },
          { name: '1000W+ High Power', slug: 'pc-psu-high' }
        ]
      },
      {
        name: 'Casing',
        slug: 'pc-casing',
        subcategories: [
          { name: 'Mid Tower Casing', slug: 'pc-casing-mid' },
          { name: 'Full Tower Casing', slug: 'pc-casing-full' },
          { name: 'Mini-ITX Casing', slug: 'pc-casing-itx' },
          { name: 'RGB Fan Casing', slug: 'pc-casing-rgb' },
          { name: 'Dual Chamber Casing', slug: 'pc-casing-dual' }
        ]
      },
      {
        name: 'Server',
        slug: 'pc-server-systems',
        subcategories: [
          { name: 'Rack Server', slug: 'pc-server-rack' },
          { name: 'Tower Server', slug: 'pc-server-tower' },
          { name: 'Server Motherboard', slug: 'pc-server-mobo' },
          { name: 'Server Chassis', slug: 'pc-server-chassis' },
          { name: 'Server RAM', slug: 'pc-server-ram' }
        ]
      }
    ]
  },
  {
    name: 'Monitor',
    slug: 'monitor',
    image: '/assets/images/cagetory/monitor.webp',
    subcategories: [
      {
        name: 'Curved Monitor',
        slug: 'monitor-curved',
        subcategories: [
          { name: '1500R Curved', slug: 'monitor-curved-1500r' },
          { name: '1800R Curved', slug: 'monitor-curved-1800r' },
          { name: 'Ultrawide Curved', slug: 'monitor-curved-ultrawide' },
          { name: 'Dual QHD Curved', slug: 'monitor-curved-dqhd' },
          { name: 'Gaming Curved', slug: 'monitor-curved-gaming' }
        ]
      },
      {
        name: 'Gaming Monitor',
        slug: 'monitor-gaming',
        subcategories: [
          { name: '144Hz Monitors', slug: 'monitor-gaming-144hz' },
          { name: '240Hz Monitors', slug: 'monitor-gaming-240hz' },
          { name: '360Hz Monitors', slug: 'monitor-gaming-360hz' },
          { name: 'G-Sync Compatible', slug: 'monitor-gaming-gsync' },
          { name: 'FreeSync Premium', slug: 'monitor-gaming-freesync' }
        ]
      },
      {
        name: 'LG',
        slug: 'monitor-lg',
        subcategories: [
          { name: 'LG UltraGear', slug: 'monitor-lg-ultragear' },
          { name: 'LG UltraWide', slug: 'monitor-lg-ultrawide' },
          { name: 'LG UHD 4K', slug: 'monitor-lg-4k' },
          { name: 'LG Ergo Series', slug: 'monitor-lg-ergo' },
          { name: 'LG IPS Monitors', slug: 'monitor-lg-ips' }
        ]
      },
      {
        name: 'Samsung',
        slug: 'monitor-samsung',
        subcategories: [
          { name: 'Odyssey Gaming', slug: 'monitor-samsung-odyssey' },
          { name: 'Smart Monitors', slug: 'monitor-samsung-smart' },
          { name: 'ViewFinity', slug: 'monitor-samsung-viewfinity' },
          { name: 'Essential Monitors', slug: 'monitor-samsung-essential' },
          { name: 'OLED Monitors', slug: 'monitor-samsung-oled' }
        ]
      },
      {
        name: 'ASUS',
        slug: 'monitor-asus',
        subcategories: [
          { name: 'ROG Swift', slug: 'monitor-asus-rog' },
          { name: 'TUF Gaming', slug: 'monitor-asus-tuf' },
          { name: 'ProArt Display', slug: 'monitor-asus-proart' },
          { name: 'ZenScreen', slug: 'monitor-asus-zenscreen' },
          { name: 'Eye Care Monitors', slug: 'monitor-asus-eyecare' }
        ]
      },
      {
        name: 'Dell',
        slug: 'monitor-dell',
        subcategories: [
          { name: 'UltraSharp Series', slug: 'monitor-dell-ultrasharp' },
          { name: 'Professional P-Series', slug: 'monitor-dell-p-series' },
          { name: 'Gaming Series', slug: 'monitor-dell-gaming' },
          { name: 'Alienware Monitors', slug: 'monitor-dell-alienware' },
          { name: 'Essential E-Series', slug: 'monitor-dell-e-series' }
        ]
      }
    ]
  },
  {
    name: 'Mobile Phone',
    slug: 'mobile-phone',
    image: '/assets/images/cagetory/mobile-phone.webp',
    subcategories: [
      {
        name: 'Smart Phone',
        slug: 'mobile-smart-phone',
        subcategories: [
          { name: 'Flagship Phones', slug: 'mobile-smart-flagship' },
          { name: 'Mid-Range Phones', slug: 'mobile-smart-mid' },
          { name: 'Budget Phones', slug: 'mobile-smart-budget' },
          { name: 'Gaming Phones', slug: 'mobile-smart-gaming' },
          { name: 'Foldable Phones', slug: 'mobile-smart-foldable' }
        ]
      },
      {
        name: 'Feature Phone',
        slug: 'mobile-feature-phone',
        subcategories: [
          { name: 'Dual SIM Phones', slug: 'mobile-feature-dualsim' },
          { name: 'Long Battery Phones', slug: 'mobile-feature-battery' },
          { name: 'Rugged Keypad', slug: 'mobile-feature-rugged' },
          { name: 'Senior Friendly', slug: 'mobile-feature-senior' },
          { name: 'Music Phones', slug: 'mobile-feature-music' }
        ]
      },
      {
        name: 'Mobile Accessories',
        slug: 'mobile-accessories',
        subcategories: [
          { name: 'Power Banks', slug: 'mobile-acc-powerbank' },
          { name: 'Wall Chargers', slug: 'mobile-acc-chargers' },
          { name: 'Wireless Chargers', slug: 'mobile-acc-wireless' },
          { name: 'USB-C Cables', slug: 'mobile-acc-cables' },
          { name: 'Phone Cases', slug: 'mobile-acc-cases' }
        ]
      }
    ]
  },
  {
    name: 'Tablet',
    slug: 'tablet',
    image: '/assets/images/cagetory/tablet.webp',
    subcategories: [
      {
        name: 'Apple Tablet / iPad',
        slug: 'tablet-apple',
        subcategories: [
          { name: 'iPad Pro', slug: 'tablet-apple-ipad-pro' },
          { name: 'iPad Air', slug: 'tablet-apple-ipad-air' },
          { name: 'iPad Mini', slug: 'tablet-apple-ipad-mini' },
          { name: 'Standard iPad', slug: 'tablet-apple-ipad' },
          { name: 'iPad Accessories', slug: 'tablet-apple-accessories' }
        ]
      },
      {
        name: 'Android Tablet',
        slug: 'tablet-android',
        subcategories: [
          { name: 'Samsung Galaxy Tab', slug: 'tablet-android-samsung' },
          { name: 'Xiaomi Pad', slug: 'tablet-android-xiaomi' },
          { name: 'Lenovo Tab', slug: 'tablet-android-lenovo' },
          { name: 'Kids Tablets', slug: 'tablet-android-kids' },
          { name: 'Budget Android Tab', slug: 'tablet-android-budget' }
        ]
      },
      {
        name: 'Graphics Tablet',
        slug: 'tablet-graphics',
        subcategories: [
          { name: 'Wacom Pen Display', slug: 'tablet-graphics-wacom' },
          { name: 'Huion Kamvas', slug: 'tablet-graphics-huion' },
          { name: 'XP-Pen Artist', slug: 'tablet-graphics-xppen' },
          { name: 'Pen Tablets', slug: 'tablet-graphics-pentabs' },
          { name: 'Stylus Pens', slug: 'tablet-graphics-stylus' }
        ]
      },
      {
        name: 'Accessories',
        slug: 'tablet-accessories',
        subcategories: [
          { name: 'Tablet Covers', slug: 'tablet-acc-covers' },
          { name: 'Screen Protectors', slug: 'tablet-acc-screens' },
          { name: 'Keyboard Folios', slug: 'tablet-acc-keyboards' },
          { name: 'Tablet Stands', slug: 'tablet-acc-stands' },
          { name: 'Stylus Nibs', slug: 'tablet-acc-nibs' }
        ]
      }
    ]
  },
  {
    name: 'Gadget',
    slug: 'gadget',
    image: '/assets/images/cagetory/gadget.webp',
    subcategories: [
      {
        name: 'Smartwatch',
        slug: 'gadget-smartwatch',
        subcategories: [
          { name: 'Apple Watch', slug: 'gadget-watch-apple' },
          { name: 'Samsung Galaxy Watch', slug: 'gadget-watch-samsung' },
          { name: 'Sports Smartwatch', slug: 'gadget-watch-sports' },
          { name: 'Kids Smartwatch', slug: 'gadget-watch-kids' },
          { name: 'Fitness Bands', slug: 'gadget-watch-bands' }
        ]
      },
      {
        name: 'Earbuds',
        slug: 'gadget-earbuds',
        subcategories: [
          { name: 'Noise Cancelling', slug: 'gadget-earbuds-anc' },
          { name: 'Sports Earbuds', slug: 'gadget-earbuds-sports' },
          { name: 'Gaming Earbuds', slug: 'gadget-earbuds-gaming' },
          { name: 'Wireless Charging', slug: 'gadget-earbuds-wireless' },
          { name: 'Budget Earbuds', slug: 'gadget-earbuds-budget' }
        ]
      },
      {
        name: 'Neckband',
        slug: 'gadget-neckband',
        subcategories: [
          { name: 'Sport Neckbands', slug: 'gadget-neckband-sports' },
          { name: 'Active Noise Cancelling', slug: 'gadget-neckband-anc' },
          { name: 'Long Battery Life', slug: 'gadget-neckband-battery' },
          { name: 'Magnetic Earbuds', slug: 'gadget-neckband-magnetic' },
          { name: 'Splash-proof', slug: 'gadget-neckband-splash' }
        ]
      },
      {
        name: 'Power Bank',
        slug: 'gadget-power-bank',
        subcategories: [
          { name: '10000mAh', slug: 'gadget-power-10k' },
          { name: '20000mAh', slug: 'gadget-power-20k' },
          { name: 'Fast Charging', slug: 'gadget-power-fast' },
          { name: 'MagSafe Power Bank', slug: 'gadget-power-magsafe' },
          { name: 'Multi-Port Power Bank', slug: 'gadget-power-multi' }
        ]
      },
      {
        name: 'Smart Lock',
        slug: 'gadget-smart-lock',
        subcategories: [
          { name: 'Fingerprint Lock', slug: 'gadget-lock-fingerprint' },
          { name: 'Keyless Deadbolt', slug: 'gadget-lock-deadbolt' },
          { name: 'WiFi Smart Lock', slug: 'gadget-lock-wifi' },
          { name: 'Bluetooth Padlock', slug: 'gadget-lock-bluetooth' },
          { name: 'Card Access Lock', slug: 'gadget-lock-card' }
        ]
      }
    ]
  },
  {
    name: 'Camera',
    slug: 'camera',
    image: '/assets/images/cagetory/camera.webp',
    subcategories: [
      {
        name: 'DSLR Camera',
        slug: 'camera-dslr',
        subcategories: [
          { name: 'Professional DSLR', slug: 'camera-dslr-pro' },
          { name: 'Entry-Level DSLR', slug: 'camera-dslr-entry' },
          { name: 'Full-Frame DSLR', slug: 'camera-dslr-fullframe' },
          { name: 'APS-C DSLR', slug: 'camera-dslr-apsc' },
          { name: 'DSLR Bundles', slug: 'camera-dslr-bundles' }
        ]
      },
      {
        name: 'Mirrorless Camera',
        slug: 'camera-mirrorless',
        subcategories: [
          { name: 'Full-Frame Mirrorless', slug: 'camera-mirror-full' },
          { name: 'Vlogging Mirrorless', slug: 'camera-mirror-vlog' },
          { name: 'High-Speed Mirrorless', slug: 'camera-mirror-speed' },
          { name: 'Cinema Cameras', slug: 'camera-mirror-cinema' },
          { name: 'APS-C Mirrorless', slug: 'camera-mirror-apsc' }
        ]
      },
      {
        name: 'Drone',
        slug: 'camera-drone',
        subcategories: [
          { name: 'Foldable Drones', slug: 'camera-drone-foldable' },
          { name: 'FPV Drones', slug: 'camera-drone-fpv' },
          { name: '4K Camera Drones', slug: 'camera-drone-4k' },
          { name: 'Mini Drones', slug: 'camera-drone-mini' },
          { name: 'Drone Accessories', slug: 'camera-drone-acc' }
        ]
      },
      {
        name: 'Camera Lens',
        slug: 'camera-lens',
        subcategories: [
          { name: 'Prime Lenses', slug: 'camera-lens-prime' },
          { name: 'Zoom Lenses', slug: 'camera-lens-zoom' },
          { name: 'Wide-Angle Lenses', slug: 'camera-lens-wide' },
          { name: 'Telephoto Lenses', slug: 'camera-lens-telephoto' },
          { name: 'Macro Lenses', slug: 'camera-lens-macro' }
        ]
      },
      {
        name: 'Tripod & Gimbal',
        slug: 'camera-tripod-gimbal',
        subcategories: [
          { name: 'Camera Tripods', slug: 'camera-tripod-camera' },
          { name: 'Monopods', slug: 'camera-tripod-monopod' },
          { name: '3-Axis Phone Gimbals', slug: 'camera-tripod-gimbal-phone' },
          { name: 'Camera Stabilizers', slug: 'camera-tripod-gimbal-camera' },
          { name: 'Travel Tripods', slug: 'camera-tripod-travel' }
        ]
      }
    ]
  },
  {
    name: 'Sound',
    slug: 'sound',
    image: '/assets/images/cagetory/sound.webp',
    subcategories: [
      {
        name: 'Speaker',
        slug: 'sound-speaker',
        subcategories: [
          { name: 'Bluetooth Speakers', slug: 'sound-speaker-bluetooth' },
          { name: 'Bookshelf Speakers', slug: 'sound-speaker-bookshelf' },
          { name: 'Soundbars', slug: 'sound-speaker-soundbar' },
          { name: 'Multimedia Speakers', slug: 'sound-speaker-multimedia' },
          { name: 'PA Speakers', slug: 'sound-speaker-pa' }
        ]
      },
      {
        name: 'Home Theater',
        slug: 'sound-home-theater',
        subcategories: [
          { name: '5.1 Surround Sound', slug: 'sound-theater-5-1' },
          { name: '7.1 Surround Sound', slug: 'sound-theater-7-1' },
          { name: 'Dolby Atmos Systems', slug: 'sound-theater-atmos' },
          { name: 'Wireless Home Theater', slug: 'sound-theater-wireless' },
          { name: 'AV Receivers', slug: 'sound-theater-receivers' }
        ]
      },
      {
        name: 'Headphone',
        slug: 'sound-headphone',
        subcategories: [
          { name: 'Over-Ear Wireless', slug: 'sound-headphone-overear' },
          { name: 'Gaming Headsets', slug: 'sound-headphone-gaming' },
          { name: 'Studio Monitor Headphones', slug: 'sound-headphone-studio' },
          { name: 'ANC Headphones', slug: 'sound-headphone-anc' },
          { name: 'Wired Headphones', slug: 'sound-headphone-wired' }
        ]
      },
      {
        name: 'Earphone',
        slug: 'sound-earphone',
        subcategories: [
          { name: 'Wired Earphones', slug: 'sound-earphone-wired' },
          { name: 'USB-C Earphones', slug: 'sound-earphone-usbc' },
          { name: 'Lightning Earphones', slug: 'sound-earphone-lightning' },
          { name: 'In-Ear Monitors (IEM)', slug: 'sound-earphone-iem' },
          { name: 'Sports Earphones', slug: 'sound-earphone-sports' }
        ]
      },
      {
        name: 'Microphone',
        slug: 'sound-microphone',
        subcategories: [
          { name: 'USB Podcast Mics', slug: 'sound-mic-usb' },
          { name: 'Condenser Studio Mics', slug: 'sound-mic-condenser' },
          { name: 'Wireless Lavalier', slug: 'sound-mic-lavalier' },
          { name: 'Shotgun Camera Mics', slug: 'sound-mic-shotgun' },
          { name: 'Dynamic Vocal Mics', slug: 'sound-mic-dynamic' }
        ]
      }
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
