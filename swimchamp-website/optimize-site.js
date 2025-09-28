const fs = require('fs');
const path = require('path');

console.log('🚀 SwimChamp Site Speed Optimizer');

function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove unnecessary whitespace
        .replace(/\s+/g, ' ')
        // Remove whitespace around certain characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolons before }
        .replace(/;}/g, '}')
        // Remove leading/trailing whitespace
        .trim();
}

function extractAndMinifyCSS() {
    console.log('📄 Reading index.html...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Extract inline CSS
    const styleRegex = /<style>([\s\S]*?)<\/style>/g;
    let match;
    let allCSS = '';
    
    while ((match = styleRegex.exec(html)) !== null) {
        allCSS += match[1] + '\n';
    }
    
    if (allCSS) {
        console.log('🎨 Found inline CSS, minifying...');
        const minifiedCSS = minifyCSS(allCSS);
        
        // Create minified CSS file
        fs.writeFileSync('./assets/style.min.css', minifiedCSS);
        console.log(`✅ Created assets/style.min.css (${(allCSS.length - minifiedCSS.length)} characters saved)`);
        
        // Replace inline styles with link to minified CSS
        html = html.replace(styleRegex, '');
        
        // Add link to minified CSS in head
        const headEnd = '</head>';
        const cssLink = '    <link rel="stylesheet" href="assets/style.min.css">\n</head>';
        html = html.replace(headEnd, cssLink);
        
        // Write updated HTML
        fs.writeFileSync(indexPath, html);
        console.log('✅ Updated index.html with minified CSS link');
    }
}

function addCriticalPerformanceOptimizations() {
    console.log('⚡ Adding critical performance optimizations...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Add preload for critical resources
    const headSection = '<head>';
    const criticalPreloads = `<head>
    <!-- Critical Performance Optimizations -->
    <link rel="preload" href="assets/images/frederic-instructor.jpg" as="image" type="image/jpeg">
    <link rel="preload" href="assets/images/swimchamp-logo.svg" as="image" type="image/svg+xml">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
    
    html = html.replace(headSection, criticalPreloads);
    
    // Add lazy loading to images
    html = html.replace(
        /<img([^>]*?)src="assets\/images\/(?!frederic-instructor|swimchamp-logo)([^"]*?)"([^>]*?)>/g,
        '<img$1src="assets/images/$2"$3 loading="lazy">'
    );
    
    // Add performance hints
    const metaSection = /<meta name="viewport"[^>]*>/;
    const performanceMeta = `<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=31536000">
    <meta name="format-detection" content="telephone=yes">`;
    
    html = html.replace(metaSection, performanceMeta);
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Added performance optimizations');
}

try {
    extractAndMinifyCSS();
    addCriticalPerformanceOptimizations();
    
    console.log('\n🎉 Site speed optimization complete!');
    console.log('\n📊 Optimizations applied:');
    console.log('   ✅ CSS minified and externalized');
    console.log('   ✅ Critical resources preloaded');
    console.log('   ✅ Lazy loading for non-critical images');
    console.log('   ✅ DNS prefetch for external resources');
    console.log('   ✅ Cache headers optimized');
    
} catch (error) {
    console.error('❌ Error:', error.message);
}