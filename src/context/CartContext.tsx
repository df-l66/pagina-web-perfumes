import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  type?: string;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, type?: string) => void;
  updateQuantity: (id: number, quantity: number, type?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const itemType = product.type || 'Original';
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id && (item.type || 'Original') === itemType
      );
      if (existingItem) {
        return currentItems.map(item => 
          (item.id === product.id && (item.type || 'Original') === itemType)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, type: itemType, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (id: number, type?: string) => {
    setItems(currentItems => 
      currentItems.filter(item => !(item.id === id && (type ? item.type === type : true)))
    );
  };

  const updateQuantity = (id: number, quantity: number, type?: string) => {
    if (quantity < 1) {
      removeFromCart(id, type);
      return;
    }
    setItems(currentItems => 
      currentItems.map(item => 
        (item.id === id && (type ? item.type === type : true)) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
