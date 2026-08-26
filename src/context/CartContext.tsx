import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  subtotal: number;
  totalPrice: number;
  discountTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  lastAddedItem: { product: Product; timestamp: number } | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'novaestore_cart_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item) => item && item.product && typeof item.product.id === 'string' && item.quantity > 0
          );
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar o carrinho do localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<{ product: Product; timestamp: number } | null>(null);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Erro ao salvar o carrinho no localStorage:', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1, openDrawer: boolean = false) => {
    if (quantity <= 0) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return newCart;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    setLastAddedItem({ product, timestamp: Date.now() });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string): number => {
    const found = cart.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const discountTotal = Math.max(0, subtotal - totalPrice);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const dismissToast = () => setLastAddedItem(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        totalItems,
        subtotal,
        totalPrice,
        discountTotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        lastAddedItem,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }
  return context;
};
