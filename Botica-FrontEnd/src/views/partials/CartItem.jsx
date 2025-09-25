
import React from 'react';
import { Link } from 'react-router-dom';

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const n = Number(priceStr.replace('S/.', '').replace(',', '.').trim());
    return isNaN(n) ? 0 : n;
};

function CartItem({ item, updateQuantity, removeItem }) {
    const itemTotal = (parsePrice(item.price) * item.quantity).toFixed(2);

    return (
        <div className="cart-item-card">
            <div className="cart-item-details">
                <Link to={`/producto/${item.id}`} className="cart-item-image">
                    <img src={item.src} alt={item.name} />
                </Link>
                <div className="cart-item-info">
                    <Link to={`/producto/${item.id}`} className="cart-item-name">{item.name}</Link>
                    <div className="cart-item-price-unit">{item.price} c/u</div>
                    <button 
                        className="cart-item-remove-btn" 
                        onClick={() => removeItem(item.id)}
                    >
                        Quitar
                    </button>
                </div>
            </div>
            
            <div className="cart-item-quantity-control">
                <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                >-</button>
                <input 
                    type="number" 
                    className="quantity-input" 
                    value={item.quantity} 
                    min="1" 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                />
                <button 
                    className="quantity-btn" 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >+</button>
            </div>
            
            <div className="cart-item-total">
                S/.{itemTotal}
            </div>
        </div>
    );
}

export default CartItem;