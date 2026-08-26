import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './skeletons/ProductCardSkeleton';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onBuyProduct: (product: Product) => void;
  isLoading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  categories,
  searchQuery: controlledSearchQuery,
  onSearchChange,
  onBuyProduct,
  isLoading = false,
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>('');
  const searchQuery = controlledSearchQuery !== undefined ? controlledSearchQuery : internalSearchQuery;
  const setSearchQuery = onSearchChange || setInternalSearchQuery;

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'discount'>('relevance');

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'Todos' ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const term = searchQuery.trim().toLowerCase();
    const matchesSearch =
      term === '' ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.platform.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return 0;
  });

  return (
    <section id="produtos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs uppercase font-bold tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            Catálogo Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Produtos em destaque
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Chaves digitais e ativações originais com garantia e liberação instantânea.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-88 relative">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="product-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por jogo, gênero ou plataforma..."
            className="w-full bg-white dark:bg-[#12121c] border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-16 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm transition-colors"
          />
          {searchQuery ? (
            <button
              id="clear-grid-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 transition-colors"
            >
              Limpar
            </button>
          ) : (
            <span className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5 font-mono">
              /
            </span>
          )}
        </div>
      </motion.div>

      {/* Active Search & Filter Indicator */}
      {searchQuery.trim() !== '' && (
        <div className="mb-6 -mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Resultados da busca por:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-500/30">
            &ldquo;{searchQuery}&rdquo;
            <button
              onClick={() => setSearchQuery('')}
              className="hover:text-indigo-950 dark:hover:text-white ml-0.5"
              title="Remover filtro de busca"
            >
              ×
            </button>
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            ({sortedProducts.length} {sortedProducts.length === 1 ? 'jogo encontrado' : 'jogos encontrados'})
          </span>
        </div>
      )}

      {/* Category Pills & Sort Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-white/5"
      >
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === 'Todos'
                ? products.length
                : products.filter((p) => p.category.toLowerCase().includes(category.toLowerCase())).length;

            return (
              <button
                key={category}
                id={`category-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white dark:bg-[#12121c] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1a1a28] border border-slate-200 dark:border-white/5 shadow-sm'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-indigo-700/80 text-white'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 self-end lg:self-auto text-xs text-slate-600 dark:text-slate-400">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Ordenar por:</span>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white dark:bg-[#12121c] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-indigo-500 shadow-sm cursor-pointer"
          >
            <option value="relevance">Relevância</option>
            <option value="price-asc">Menor Preço</option>
            <option value="price-desc">Maior Preço</option>
            <option value="discount">Maior Desconto</option>
          </select>
        </div>
      </motion.div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={onBuyProduct}
              index={idx}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#101018] border border-slate-200 dark:border-white/5 rounded-3xl p-12 text-center max-w-md mx-auto my-8 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Nenhum produto encontrado</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Não encontramos resultados para &quot;{searchQuery}&quot; na categoria selecionada.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
            }}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-600/30"
          >
            Redefinir filtros
          </button>
        </div>
      )}
    </section>
  );
};

