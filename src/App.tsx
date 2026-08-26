import React, { useState, useEffect } from 'react';
import { products, categories } from './data/products';
import { Product } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Offers } from './components/Offers';
import { ProductGrid } from './components/ProductGrid';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { CartDrawer } from './components/CartDrawer';
import { CartToast } from './components/CartToast';
import { FloatingCartButton } from './components/FloatingCartButton';

function StoreApp() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartCheckoutOpen, setIsCartCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { cart, clearCart } = useCart();

  useEffect(() => {
    // Perceived loading speed optimization: simulate brief data hydration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  // Featured game for the weekly spotlight (GTA VI)
  const spotlightOffer = products.find((p) => p.id === 'gta-vi') || products[0];

  // Top 4 featured games for the hero showcase
  const heroProducts = products.filter((p) => p.featured || p.badge);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuySingleProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleStartCartCheckout = () => {
    setIsCartCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080c] text-slate-900 dark:text-slate-100 selection:bg-indigo-600 selection:text-white relative font-sans transition-colors duration-300">
      {/* Fixed Sticky Navbar with Live Search, Live Cart Badge & Theme Toggle */}
      <Navbar
        products={products}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectProduct={handleBuySingleProduct}
        onExploreClick={() => scrollToSection('produtos')}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Showcase Cards */}
        <Hero
          onExploreClick={() => scrollToSection('produtos')}
          onOffersClick={() => scrollToSection('ofertas')}
          onSelectProduct={handleBuySingleProduct}
          featuredProducts={heroProducts}
          isLoading={isLoading}
        />

        {/* Dynamic Infinite Marquee of Platforms & Official Guarantees */}
        <TechMarquee />

        {/* Weekly Spotlight Offers */}
        <Offers
          offerProduct={spotlightOffer}
          onBuyProduct={handleBuySingleProduct}
        />

        {/* Main Catalog & Interactive Category Filter with Instant Search */}
        <ProductGrid
          products={products}
          categories={categories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onBuyProduct={handleBuySingleProduct}
          isLoading={isLoading}
        />

        {/* Benefits / Por que escolher a NovaeStore? */}
        <Benefits />

        {/* How it works (01 -> 02 -> 03) */}
        <HowItWorks />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Final Conversion CTA */}
        <FinalCTA onExploreClick={() => scrollToSection('produtos')} />
      </main>

      {/* Footer with legal info */}
      <Footer />

      {/* Persistent Shopping Cart Slide-over Drawer */}
      <CartDrawer
        onCheckout={handleStartCartCheckout}
        onExploreClick={() => scrollToSection('produtos')}
      />

      {/* Quick Interactive Toast on Add to Cart */}
      <CartToast />

      {/* Floating Cart Quick Access Pill */}
      <FloatingCartButton />

      {/* Embedded Single Product Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Multi-Item Cart Checkout Modal */}
      {isCartCheckoutOpen && cart.length > 0 && (
        <CheckoutModal
          items={cart}
          onClose={() => setIsCartCheckoutOpen(false)}
          onSuccess={() => {
            clearCart();
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <StoreApp />
      </CartProvider>
    </ThemeProvider>
  );
}

