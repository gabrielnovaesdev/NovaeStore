import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Menu, 
  X, 
  Zap, 
  ShieldCheck, 
  ShoppingBag, 
  Search, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  Tag, 
  Layers, 
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useCart } from '../context/CartContext';
import { ThemeToggle } from './ThemeToggle';
import { Product } from '../types';

interface NavbarProps {
  products?: Product[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
  onExploreClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  products = [],
  searchQuery = '',
  onSearchChange,
  onSelectProduct,
  onExploreClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { totalItems, openCart } = useCart();

  // Scroll Progress Tracking for the top gradient progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global keyboard shortcuts: / or Ctrl+K for search, Escape to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setIsSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll detection for navbar background & active link
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['inicio', 'ofertas', 'produtos', 'como-funciona', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio', id: 'inicio', icon: Sparkles },
    { label: 'Ofertas', href: '#ofertas', id: 'ofertas', icon: Tag, badge: 'Hot', badgeColor: 'bg-rose-500' },
    { label: 'Produtos', href: '#produtos', id: 'produtos', icon: Layers, badge: 'Popular' },
    { label: 'Como Funciona', href: '#como-funciona', id: 'como-funciona', icon: CheckCircle2 },
    { label: 'FAQ', href: '#faq', id: 'faq', icon: HelpCircle },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setDrawerOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchFocused(false);
    setDrawerOpen(false);
    onExploreClick();
  };

  // Matched products for instant dropdown
  const searchResults = searchQuery.trim()
    ? products.filter((p) => {
        const query = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.platform.toLowerCase().includes(query)
        );
      }).slice(0, 5)
    : [];

  const popularCategories = ['Ação', 'RPG', 'Esportes', 'Mundo Aberto', 'Corrida'];

  return (
    <>
      {/* Slim Gradient Scroll Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 origin-left z-[100] shadow-[0_0_10px_rgba(99,102,241,0.7)] pointer-events-none"
        style={{ scaleX }}
      />

      <header
        id="main-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        {/* Top Announcement Bar - Micro ticker with trust elements */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isScrolled 
            ? 'h-0 opacity-0' 
            : 'h-8 sm:h-9 bg-slate-900 text-slate-300 dark:bg-[#050508] dark:text-slate-400 border-b border-slate-800 dark:border-white/5 opacity-100'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-200 dark:text-slate-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-semibold">Entrega Instantânea:</span> Chaves originais via PIX em segundos
              </span>
              <span className="hidden md:inline text-slate-600 dark:text-slate-700">•</span>
              <span className="hidden md:inline text-slate-400">
                Garantia vitalícia e ativação 100% segura
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1 text-amber-400 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9/5</span>
                <span className="text-slate-400 text-[10px]">(+1.200 avaliações)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 border-l border-slate-700 dark:border-white/10 pl-3">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold text-slate-200 dark:text-slate-300">Loja Verificada</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Floating Glass Navbar Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-3">
          <div
            className={`transition-all duration-300 rounded-2xl border ${
              isScrolled || drawerOpen
                ? 'bg-white/90 dark:bg-[#0a0a14]/90 backdrop-blur-2xl border-slate-200/90 dark:border-white/10 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(99,102,241,0.08)]'
                : 'bg-white/75 dark:bg-[#0a0a14]/75 backdrop-blur-xl border-slate-200/60 dark:border-white/5 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between h-16 sm:h-18 px-3 sm:px-6 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
              {/* Brand Logo with Modern Holographic Glow */}
              <a
                href="#inicio"
                id="brand-logo"
                className="flex items-center gap-2 sm:gap-3 group cursor-pointer flex-shrink lg:flex-shrink-0 min-w-0"
                onClick={(e) => handleNavClick(e, '#inicio')}
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-400 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300 group-hover:scale-105" />
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center shadow-inner border border-white/20">
                    <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2] group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none truncate">
                      Novae<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">Store</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0 hidden sm:block" />
                  </div>
                  <span className="hidden sm:block text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 truncate">
                    Jogos Digitais • PIX 24h
                  </span>
                </div>
              </a>

              {/* Command Palette / Omnisearch Bar (Desktop) */}
              <div ref={searchContainerRef} className="hidden xl:block relative flex-1 max-w-md">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    id="header-search-input"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Buscar jogos, pacotes ou plataformas..."
                    className="w-full bg-slate-100/90 dark:bg-[#12121e] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-20 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-inner"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {searchQuery ? (
                      <button
                        type="button"
                        onClick={() => onSearchChange?.('')}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                        aria-label="Limpar busca"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-400 dark:text-slate-500 shadow-2xs">
                        <span>⌘K</span>
                      </div>
                    )}
                  </div>
                </form>

                {/* Instant Search Command Palette Dropdown */}
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2.5 w-[440px] sm:w-[480px] max-w-[90vw] bg-white dark:bg-[#0c0c16] border border-slate-200 dark:border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-3.5 z-50 max-h-[460px] overflow-y-auto"
                    >
                      {/* Search Header */}
                      <div className="px-1.5 py-1 flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2.5 mb-2.5 gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 whitespace-nowrap">
                          <TrendingUp className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span>{searchQuery ? `Resultados (${searchResults.length})` : 'Sugestões & Categorias'}</span>
                        </span>
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={handleSearchSubmit}
                            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 whitespace-nowrap shrink-0"
                          >
                            <span>Ver todos no catálogo</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* If no query, show trending quick tags */}
                      {!searchQuery && (
                        <div className="mb-3 px-1">
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Categorias populares:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {popularCategories.map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  onSearchChange?.(cat);
                                  searchInputRef.current?.focus();
                                }}
                                className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Results List */}
                      {searchResults.length > 0 ? (
                        <div className="space-y-1.5">
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => {
                                setIsSearchFocused(false);
                                if (onSelectProduct) {
                                  onSelectProduct(product);
                                } else {
                                  onExploreClick();
                                }
                              }}
                              className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-left group border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                            >
                              {/* Left: Thumbnail & Name */}
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center p-0.5">
                                  <div
                                    className="absolute inset-0 bg-cover bg-center blur-xs opacity-40 scale-125"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                  />
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    referrerPolicy="no-referrer"
                                    className="relative z-10 max-w-full max-h-full object-contain rounded group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {product.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    <span className="truncate">{product.platform.split(' ')[0]}</span>
                                    <span>•</span>
                                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate">{product.category}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Price & Tag */}
                              <div className="shrink-0 flex flex-col items-end justify-center text-right pl-2">
                                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white whitespace-nowrap block">
                                  R$ {product.price.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                                  PIX Instantâneo
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : searchQuery ? (
                        <div className="p-5 text-center text-xs text-slate-500 dark:text-slate-400">
                          Nenhum jogo encontrado com &ldquo;{searchQuery}&rdquo;.
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Modern Segmented Navigation Links (Large Screens) */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100/70 dark:bg-[#12121e]/70 p-1.5 rounded-full border border-slate-200/80 dark:border-white/5 flex-shrink min-w-0">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      id={`nav-link-${link.id}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/25'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter hidden xl:block ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : link.badgeColor ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Right Action Cluster: Theme, Cart, CTA (Desktop) */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                {/* Theme Toggle */}
                <ThemeToggle id="navbar-theme-toggle-desktop" />

                {/* Modern Cart Button */}
                <button
                  id="navbar-cart-btn"
                  onClick={openCart}
                  className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#141424] dark:hover:bg-[#1e1e32] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 shadow-sm group"
                  aria-label={`Abrir carrinho com ${totalItems} itens`}
                >
                  <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        key="cart-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#08080c] shadow-lg"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Primary CTA Button with Radiant Glow */}
                <button
                  id="navbar-cta-btn"
                  onClick={onExploreClick}
                  className="relative group overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs xl:text-sm font-bold px-3 xl:px-5 py-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
                  <Zap className="w-4 h-4 text-indigo-200 fill-indigo-200 group-hover:rotate-12 transition-transform" />
                  <span>Catálogo</span>
                </button>
              </div>

              {/* Mobile & Tablet Right Bar Controls */}
              <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
                <ThemeToggle id="navbar-theme-toggle-tablet-mobile" />

                <button
                  id="tablet-mobile-cart-btn"
                  onClick={openCart}
                  className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#141424] dark:hover:bg-[#1c1c30] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 transition-colors"
                  aria-label={`Abrir carrinho com ${totalItems} itens`}
                >
                  <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#08080c] shadow">
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  id="tablet-mobile-drawer-toggle"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
                  aria-label="Abrir menu de navegação"
                  aria-expanded={drawerOpen}
                >
                  {drawerOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <>
                      <Menu className="w-5 h-5" />
                      <span className="hidden md:inline text-xs font-bold text-slate-700 dark:text-slate-300 pr-1">
                        Menu
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Modern Drawer for Tablet & Mobile (lg:hidden) */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              id="tablet-mobile-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2"
            >
              <div className="bg-white/95 dark:bg-[#0c0c16]/95 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    id="drawer-search-input"
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Buscar jogos por nome, categoria ou console..."
                    className="w-full bg-slate-100 dark:bg-[#141424] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange?.('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Instant Search Results inside Drawer */}
                {searchQuery.trim() !== '' && searchResults.length > 0 && (
                  <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 rounded-2xl p-3 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between px-1">
                      <span>Jogos Encontrados ({searchResults.length})</span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 text-[11px] font-bold"
                      >
                        Ver todos <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setDrawerOpen(false);
                            if (onSelectProduct) {
                              onSelectProduct(product);
                            } else {
                              onExploreClick();
                            }
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#141420] border border-slate-200 dark:border-white/5 hover:border-indigo-500 text-left transition-colors"
                        >
                          <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center p-0.5">
                            <div
                              className="absolute inset-0 bg-cover bg-center blur-xs opacity-40 scale-125"
                              style={{ backgroundImage: `url(${product.image})` }}
                            />
                            <img
                              src={product.image}
                              alt={product.name}
                              referrerPolicy="no-referrer"
                              className="relative z-10 max-w-full max-h-full object-contain rounded"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold">
                              R$ {product.price.toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Links Grid */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block px-1">
                    Navegação
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = activeSection === link.id;
                      return (
                        <a
                          key={link.id}
                          href={link.href}
                          id={`drawer-nav-${link.id}`}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                              : 'bg-slate-100/80 dark:bg-white/[0.03] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                            <span>{link.label}</span>
                          </div>
                          {link.badge && (
                            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ${
                              isActive ? 'bg-white/20 text-white' : link.badgeColor ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'
                            }`}>
                              {link.badge}
                            </span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 w-full md:w-auto justify-between md:justify-start">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" /> Pagamento PIX 100% Seguro
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">•</span>
                    <span>Entrega 24/7</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:flex md:items-center">
                    <button
                      id="drawer-cart-btn"
                      onClick={() => {
                        setDrawerOpen(false);
                        openCart();
                      }}
                      className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 dark:bg-[#181828] dark:hover:bg-[#202035] text-slate-800 dark:text-white font-bold px-4 py-2.5 rounded-xl text-center border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
                    >
                      <ShoppingBag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Carrinho ({totalItems})</span>
                    </button>

                    <button
                      id="drawer-explore-cta"
                      onClick={() => {
                        setDrawerOpen(false);
                        onExploreClick();
                      }}
                      className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-indigo-200 fill-indigo-200" />
                      <span>Ver Catálogo</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop overlay for tablet/mobile drawer when open */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          />
        )}
      </AnimatePresence>
    </>
  );
};



