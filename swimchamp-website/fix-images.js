const fs = require('fs');

console.log('🖼️ Fixing SwimChamp Image Display Issues');

function fixImageDisplay() {
    console.log('🔧 Restoring original image tags...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Replace picture elements back to simple img tags
    html = html.replace(
        /<picture>\s*<source srcset="assets\/images\/([^"]+)\.webp" type="image\/webp">\s*<img([^>]*?)src="assets\/images\/([^"]+)"([^>]*?)>\s*<\/picture>/g,
        '<img$2src="assets/images/$3"$4>'
    );
    
    console.log('✅ Restored simple img tags for all images');
    
    // Remove WebP optimization lines from performance script
    html = html.replace(
        /<!-- Critical Performance Optimizations -->\s*<link rel="preload"[^>]*>\s*<link rel="preload"[^>]*>\s*<link rel="dns-prefetch"[^>]*>\s*<link rel="preconnect"[^>]*>/,
        '<!-- Critical Performance Optimizations -->\n    <link rel="dns-prefetch" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Fixed image display issues');
}

function removeLocalCoverageSection() {
    console.log('🗑️ Removing "Zwemlessen in Jouw Buurt" section...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Remove the entire local coverage section
    html = html.replace(
        /\s*<!-- Local Area Coverage Section -->[\s\S]*?<\/section>\s*/,
        '\n'
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Removed local coverage section from homepage');
}

function cleanupCSS() {
    console.log('🎨 Cleaning up CSS for better compatibility...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Simplify image CSS rules
    html = html.replace(
        /\/\* Image Responsiveness \*\/\s*picture img,\s*img \{[^}]*\}/,
        `/* Image Responsiveness */
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }`
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Cleaned up CSS for better image display');
}

try {
    fixImageDisplay();
    removeLocalCoverageSection();
    cleanupCSS();
    
    console.log('\n🎉 Image fixes complete!');
    console.log('\n📊 Fixed issues:');
    console.log('   ✅ Restored simple img tags (no WebP complexity)');
    console.log('   ✅ Removed local coverage section');
    console.log('   ✅ Simplified CSS for better compatibility');
    console.log('   ✅ Images should now display correctly');
    console.log('\n🔍 All images should now be visible:');
    console.log('   - SwimChamp logo in navigation');
    console.log('   - Hero section illustration');
    console.log('   - Service icons (goggles, flippers)');
    console.log('   - Fréderic instructor photo');
    
} catch (error) {
    console.error('❌ Error:', error.message);
}