import React, { useState } from 'react';
import { products, categories } from './data/products';
import { Product } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Offers } from './components/Offers';
import { ProductGrid } from './components/ProductGrid';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Featured game for the weekly spotlight (GTA IV)
  const spotlightOffer = products.find((p) => p.id === 'gta-iv') || products[0];

  // Top 4 featured games for the hero showcase
  const heroProducts = products.filter((p) => p.featured || p.badge);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 selection:bg-indigo-600 selection:text-white relative font-sans">
      {/* Fixed Sticky Navbar */}
      <Navbar onExploreClick={() => scrollToSection('produtos')} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Showcase Cards */}
        <Hero
          onExploreClick={() => scrollToSection('produtos')}
          onOffersClick={() => scrollToSection('ofertas')}
          onSelectProduct={(product) => setSelectedProduct(product)}
          featuredProducts={heroProducts}
        />

        {/* Weekly Spotlight Offers */}
        <Offers
          offerProduct={spotlightOffer}
          onBuyProduct={(product) => setSelectedProduct(product)}
        />

        {/* Main Catalog & Interactive Category Filter */}
        <ProductGrid
          products={products}
          categories={categories}
          onBuyProduct={(product) => setSelectedProduct(product)}
        />

        {/* Benefits / Por que escolher a NovaeStore? */}
        <Benefits />

        {/* How it works (01 -> 02 -> 03) */}
        <HowItWorks />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* FAQ Accordion (8 items) */}
        <FAQ />

        {/* Final Conversion CTA */}
        <FinalCTA onExploreClick={() => scrollToSection('produtos')} />
      </main>

      {/* Footer with legal info */}
      <Footer />

      {/* Embedded Checkout Modal / Bottom Sheet */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
