const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function generateFavicons() {
    console.log('🏊‍♂️ Generating SwimChamp favicons...');
    
    const sizes = [
        { size: 16, name: 'favicon-16x16.png' },
        { size: 32, name: 'favicon-32x32.png' },
        { size: 48, name: 'favicon-48x48.png' },
        { size: 96, name: 'favicon-96x96.png' },
        { size: 180, name: 'apple-touch-icon.png' },
        { size: 192, name: 'android-chrome-192x192.png' },
        { size: 512, name: 'android-chrome-512x512.png' }
    ];

    try {
        // Load your SwimChamp logo
        console.log('📄 Loading SwimChamp logo...');
        const logo = await loadImage('./assets/images/swimchamp-logo.png');
        console.log(`✅ Logo loaded: ${logo.width}x${logo.height}`);

        for (const config of sizes) {
            console.log(`🎨 Creating ${config.name}...`);
            
            // Create canvas
            const canvas = createCanvas(config.size, config.size);
            const ctx = canvas.getContext('2d');
            
            // White background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, config.size, config.size);
            
            // Calculate logo dimensions (85% of canvas)
            const maxSize = config.size * 0.85;
            const logoRatio = logo.width / logo.height;
            
            let logoWidth, logoHeight;
            if (logoRatio > 1) {
                logoWidth = maxSize;
                logoHeight = maxSize / logoRatio;
            } else {
                logoHeight = maxSize;
                logoWidth = maxSize * logoRatio;
            }
            
            // Center the logo
            const x = (config.size - logoWidth) / 2;
            const y = (config.size - logoHeight) / 2;
            
            // Draw logo
            ctx.drawImage(logo, x, y, logoWidth, logoHeight);
            
            // Save to assets/images/
            const buffer = canvas.toBuffer('image/png');
            const filepath = `./assets/images/${config.name}`;
            fs.writeFileSync(filepath, buffer);
            
            console.log(`✅ Saved: ${filepath}`);
        }
        
        // Also create the main favicon.ico
        console.log('🎨 Creating favicon.ico...');
        const canvas32 = createCanvas(32, 32);
        const ctx32 = canvas32.getContext('2d');
        
        ctx32.fillStyle = '#ffffff';
        ctx32.fillRect(0, 0, 32, 32);
        
        const logoSize32 = 32 * 0.85;
        const logoRatio32 = logo.width / logo.height;
        const logoWidth32 = logoSize32;
        const logoHeight32 = logoSize32 / logoRatio32;
        const x32 = (32 - logoWidth32) / 2;
        const y32 = (32 - logoHeight32) / 2;
        
        ctx32.drawImage(logo, x32, y32, logoWidth32, logoHeight32);
        
        const buffer32 = canvas32.toBuffer('image/png');
        fs.writeFileSync('./favicon.ico', buffer32);
        console.log('✅ Saved: favicon.ico');
        
        console.log('\n🎉 All favicons generated successfully!');
        console.log('\n📋 Generated files:');
        sizes.forEach(config => {
            console.log(`   ✅ assets/images/${config.name}`);
        });
        console.log('   ✅ favicon.ico');
        
        console.log('\n🚀 Your favicon setup is now complete!');
        console.log('Your browser tabs and Google search will show the SwimChamp logo.');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n💡 Make sure you have the canvas package installed:');
        console.log('npm install canvas');
    }
}

generateFavicons();