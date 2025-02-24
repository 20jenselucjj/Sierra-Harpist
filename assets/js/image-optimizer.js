// Image optimization using Sharp (requires: npm install sharp)
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
    { width: 400, suffix: '-400' },
    { width: 800, suffix: '-800' },
    { width: 1200, suffix: '-1200' },
    { width: 1600, suffix: '-1600' }
];

const imageFiles = [
    'Portraitwithharp.png',
    'Portraitwithharpsmilling.png',
    'Closeupwithharp.png'
];

async function optimizeImages() {
    for (const file of imageFiles) {
        const filename = path.parse(file).name;
        const ext = path.parse(file).ext;
        
        for (const size of sizes) {
            const outputFilename = `${filename}${size.suffix}${ext}`;
            
            try {
                await sharp(file)
                    .resize(size.width)
                    .toFile(outputFilename);
                console.log(`Created: ${outputFilename}`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

optimizeImages().catch(console.error);