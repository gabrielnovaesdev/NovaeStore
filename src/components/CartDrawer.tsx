import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Tag,
  Gamepad2
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onExploreClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onExploreClick }) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    totalPrice,
    discountTotal,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Sliding Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white dark:bg-[#0d0d15] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-[#12121e]/80 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        Seu Carrinho
                      </h2>
                      {totalItems > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Chaves originais com entrega instantânea
                    </p>
                  </div>
                </div>

                <button
                  id="close-cart-drawer-btn"
                  onClick={closeCart}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
                  aria-label="Fechar carrinho"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  /* Empty State */
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-[#151522] border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-2">
                      <Gamepad2 className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                      Você ainda não adicionou nenhum jogo. Explore nosso catálogo com super descontos via PIX.
                    </p>
                    <button
                      id="cart-empty-explore-btn"
                      onClick={() => {
                        closeCart();
                        onExploreClick();
                      }}
                      className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Explorar Catálogo</span>
                    </button>
                  </div>
                ) : (
                  /* Items List */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-100 dark:border-white/5">
                      <span>Jogos selecionados</span>
                      <button
                        id="clear-cart-btn"
                        onClick={clearCart}
                        className="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-medium transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Limpar tudo</span>
                      </button>
                    </div>

                    {cart.map((item) => {
                      const itemTotal = item.product.price * item.quantity;
                      const itemOriginalTotal = item.product.originalPrice
                        ? item.product.originalPrice * item.quantity
                        : null;

                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          key={item.product.id}
                          id={`cart-item-${item.product.id}`}
                          className="bg-slate-50 dark:bg-[#131320] border border-slate-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-white/10 rounded-2xl p-3.5 flex gap-3 transition-colors"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center p-1">
                            <div
                              className="absolute inset-0 bg-cover bg-center blur-md opacity-40 scale-125"
                              style={{ backgroundImage: `url(${item.product.image})` }}
                            />
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="relative z-10 max-w-full max-h-full object-contain rounded"
                              referrerPolicy="no-referrer"
                            />
                            {item.product.discount && (
                              <span className="absolute top-1 left-1 z-20 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow">
                                -{item.product.discount}%
                              </span>
                            )}
                          </div>

                          {/* Info & Controls */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">
                                  {item.product.name}
                                </h4>
                                <button
                                  id={`remove-cart-item-${item.product.id}`}
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                                  title="Remover do carrinho"
                                  aria-label={`Remover ${item.product.name} do carrinho`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block mt-0.5">
                                {item.product.platform.split(' ')[0]} • {item.product.category}
                              </span>
                            </div>

                            {/* Quantity & Price Row */}
                            <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60 dark:border-white/5">
                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-1 bg-white dark:bg-[#1a1a2b] border border-slate-200 dark:border-white/10 rounded-lg p-0.5">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-slate-900 dark:text-white px-2 min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                {itemOriginalTotal && (
                                  <span className="text-[10px] text-slate-400 dark:text-slate-500 line-through block -mb-0.5">
                                    R$ {itemOriginalTotal.toFixed(2).replace('.', ',')}
                                  </span>
                                )}
                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                  R$ {itemTotal.toFixed(2).replace('.', ',')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer Summary & Checkout Action */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#10101c] space-y-4">
                  {/* Financial Breakdown */}
                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Subtotal ({totalItems} itens):</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        R$ {subtotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    {discountTotal > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          Descontos aplicados:
                        </span>
                        <span>- R$ {discountTotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-baseline">
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">Total no PIX:</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Confirmação em segundos</span>
                      </div>
                      <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        R$ {totalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={() => {
                      closeCart();
                      onCheckout();
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black text-base py-4 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Zap className="w-5 h-5 text-indigo-200 fill-indigo-200" />
                    <span>Finalizar Compra ({totalItems})</span>
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>

                  {/* Trust footer */}
                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" /> Chaves originais
                    </span>
                    <span>•</span>
                    <span>Garantia vitalícia</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

