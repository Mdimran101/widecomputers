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

const GlobalSettingsSchema = new mongoose.Schema({}, { strict: false, collection: 'globalsettings' });
const GlobalSettings = mongoose.models.GlobalSettings || mongoose.model('GlobalSettings', GlobalSettingsSchema);

async function run() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Look for first document or create it
    let settings = await GlobalSettings.findOne({});
    const updateData = {
      brandName: "Wide Computers",
      metaTitle: "Wide Computers - Premium Laptops, Custom Gaming PCs & IT Store",
      metaDescription: "Wide Computers is the ultimate destination in Bangladesh for premium laptops, high-performance custom gaming desktops, processors, graphics cards, and enterprise server gear.",
      marqueeText: "Assalamu Alaikum! Welcome to Wide Computers - Get Premium Laptops, Custom PCs & Tech Gadgets with Warranty Support! 💻 🚀",
      contact: {
        email: "support@widecomputers.com",
        phone: "+8801234567890",
        address: "Dhaka, Bangladesh"
      }
    };

    if (settings) {
      await GlobalSettings.updateOne({ _id: settings._id }, { $set: updateData });
      console.log('Successfully updated existing GlobalSettings document.');
    } else {
      await GlobalSettings.create(updateData);
      console.log('Successfully created new GlobalSettings document.');
    }

  } catch (error) {
    console.error('Error seeding settings:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

run();
