const fs = require('fs');

console.log('📱 SwimChamp Mobile-First Optimizer');

function optimizeMobileCSS() {
    console.log('🎨 Adding mobile-first CSS optimizations...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Add comprehensive mobile-first CSS
    const mobileCSS = `
    <!-- Mobile-First Responsive CSS -->
    <style>
        /* Mobile-First Base Styles */
        * {
            box-sizing: border-box;
        }
        
        html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        /* Container Mobile-First */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        @media (min-width: 640px) {
            .container {
                padding: 0 2rem;
            }
        }
        
        /* Hero Section Mobile Optimization */
        .hero {
            padding: 2rem 0;
            min-height: auto;
        }
        
        .hero-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
            text-align: center;
        }
        
        @media (min-width: 768px) {
            .hero {
                padding: 4rem 0;
                min-height: 600px;
            }
            
            .hero-content {
                flex-direction: row;
                text-align: left;
                align-items: center;
            }
        }
        
        /* Typography Mobile-First */
        .hero-title {
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 1rem;
            color: #1f2937;
        }
        
        @media (min-width: 640px) {
            .hero-title {
                font-size: 2.5rem;
            }
        }
        
        @media (min-width: 768px) {
            .hero-title {
                font-size: 3rem;
            }
        }
        
        .hero-subtitle {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 1.5rem;
            max-width: 600px;
        }
        
        @media (min-width: 640px) {
            .hero-subtitle {
                font-size: 1.125rem;
            }
        }
        
        /* Button Mobile Optimization */
        .btn-primary {
            display: inline-block;
            background: linear-gradient(135deg, #0ea5e9, #0284c7);
            color: white;
            text-decoration: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
            width: 100%;
            max-width: 300px;
        }
        
        @media (min-width: 640px) {
            .btn-primary {
                width: auto;
                font-size: 1.125rem;
            }
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
        }
        
        /* Services Grid Mobile-First */
        .services-grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: 1fr;
        }
        
        @media (min-width: 640px) {
            .services-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
        }
        
        @media (min-width: 1024px) {
            .services-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .service-card {
            background: white;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #f3f4f6;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        @media (min-width: 640px) {
            .service-card {
                padding: 2rem;
            }
        }
        
        .service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* About Section Mobile */
        .about-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
        }
        
        @media (min-width: 768px) {
            .about-content {
                flex-direction: row;
                align-items: flex-start;
            }
        }
        
        /* Reviews Mobile Optimization */
        .reviews-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
            .reviews-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
        }
        
        /* Contact Form Mobile */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        @media (min-width: 640px) {
            .form-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }
        }
        
        .form-input {
            width: 100%;
            padding: 0.875rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #0ea5e9;
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }
        
        /* Touch Optimizations */
        @media (hover: none) and (pointer: coarse) {
            .btn-primary,
            .btn-service {
                min-height: 48px;
                min-width: 48px;
            }
            
            .service-card:hover {
                transform: none;
            }
        }
        
        /* Image Responsiveness */
        picture img,
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        
        .hero-visual {
            width: 100%;
            max-width: 400px;
        }
        
        @media (min-width: 768px) {
            .hero-visual {
                max-width: 500px;
            }
        }
        
        /* Navigation Mobile */
        @media (max-width: 767px) {
            nav {
                padding: 1rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .mobile-menu-toggle {
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #1f2937;
                cursor: pointer;
            }
        }
        
        /* Accessibility Improvements */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #111827;
                color: #f9fafb;
            }
            
            .service-card {
                background: #1f2937;
                border-color: #374151;
            }
        }
        
        /* Print Styles */
        @media print {
            .hero-visual,
            .reviews,
            .contact form {
                display: none;
            }
            
            body {
                color: black;
                background: white;
            }
        }
    </style>`;
    
    // Insert mobile CSS before closing head tag
    html = html.replace('</head>', `${mobileCSS}\n</head>`);
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Added comprehensive mobile-first CSS');
}

function addMobileMetaTags() {
    console.log('📋 Adding mobile-specific meta tags...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Add mobile-specific meta tags
    const mobileMeta = `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="Cache-Control" content="max-age=31536000">
    <meta name="format-detection" content="telephone=yes">
    <!-- PWA Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="SwimChamp">
    <meta name="theme-color" content="#0ea5e9">
    <!-- Performance Hints -->
    <meta name="referrer" content="strict-origin-when-cross-origin">`;
    
    // Replace existing viewport meta
    html = html.replace(
        /<meta name="viewport"[^>]*>/,
        mobileMeta
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Added mobile-specific meta tags');
}

function addTouchOptimizations() {
    console.log('👆 Adding touch and gesture optimizations...');
    
    const indexPath = './index.html';
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Add touch-friendly JavaScript
    const touchScript = `
    <!-- Touch Optimization Script -->
    <script>
        // Touch-friendly improvements
        document.addEventListener('DOMContentLoaded', function() {
            // Prevent zoom on form inputs (iOS)
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (window.innerWidth <= 768) {
                        document.querySelector('meta[name=viewport]')
                            .setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                    }
                });
                
                input.addEventListener('blur', () => {
                    document.querySelector('meta[name=viewport]')
                        .setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
                });
            });
            
            // Add visual feedback for touch
            const buttons = document.querySelectorAll('.btn-primary, .btn-service');
            buttons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Mobile menu toggle (if needed)
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', function() {
                    const navLinks = document.querySelector('.nav-links');
                    navLinks.classList.toggle('active');
                });
            }
        });
        
        // Performance: Reduce repaints on scroll
        let ticking = false;
        function updateOnScroll() {
            // Throttled scroll handling
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Add scroll-based optimizations here
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
    </script>`;
    
    // Add before closing body tag, but before existing scripts
    html = html.replace(
        '    <!-- Advanced Performance Script -->',
        `${touchScript}\n    <!-- Advanced Performance Script -->`
    );
    
    fs.writeFileSync(indexPath, html);
    console.log('✅ Added touch and gesture optimizations');
}

try {
    optimizeMobileCSS();
    addMobileMetaTags();
    addTouchOptimizations();
    
    console.log('\n🎉 Mobile-first optimization complete!');
    console.log('\n📱 Mobile improvements:');
    console.log('   ✅ Mobile-first responsive design');
    console.log('   ✅ Touch-friendly button sizes (48px minimum)');
    console.log('   ✅ Optimized typography scaling');
    console.log('   ✅ Gesture and touch optimizations');
    console.log('   ✅ PWA-ready meta tags');
    console.log('   ✅ iOS and Android optimizations');
    console.log('   ✅ Accessibility improvements');
    console.log('   ✅ Dark mode support');
    console.log('\n🔬 Test on:');
    console.log('   📱 iPhone (Safari)');
    console.log('   🤖 Android (Chrome)');
    console.log('   💻 Desktop responsive modes');
    console.log('   🌐 Google Mobile-Friendly Test');
    
} catch (error) {
    console.error('❌ Error:', error.message);
}