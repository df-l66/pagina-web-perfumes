import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Formatear mensaje para WhatsApp
    let message = "Hola, me gustaría comprar los siguientes perfumes:\n\n";
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.brand}) ${item.type ? `[${item.type}]` : ''} - $${item.price * item.quantity}\n`;
    });
    message += `\n*Total: $${cartTotal}*`;
    
    const whatsappUrl = `https://wa.me/525512345678?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-serif text-white tracking-wide">Tu Carrito</h2>
          </div>
          <button 
            onClick={closeCart}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p>Tu carrito está vacío.</p>
              <button 
                onClick={closeCart}
                className="text-amber-500 hover:text-amber-400 font-medium mt-4 underline underline-offset-4"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50">
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{item.brand}</span>
                        <h3 className="text-white font-medium leading-tight mt-0.5">{item.name}</h3>
                        {item.type && item.type !== 'Original' && (
                          <span className="inline-block mt-1 bg-zinc-800 text-amber-500 text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {item.type.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-600 hover:text-red-500 p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm text-white w-4 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-zinc-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-amber-500 font-medium">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-900 p-6 bg-zinc-950/80 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-400 font-medium">Subtotal</span>
              <span className="text-2xl font-serif text-white">${cartTotal}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium py-4 rounded-xl transition-colors shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              Finalizar Compra
            </button>
            <p className="text-center text-xs text-zinc-500 mt-4">
              Serás redirigido a WhatsApp para confirmar tu pedido.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
