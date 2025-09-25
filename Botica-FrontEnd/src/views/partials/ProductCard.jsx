import React, { useState } from 'react';
import '../../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.src} alt={product.name} />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-price">{product.price}</div>
        <div className="product-presentation">Presentación: {product.presentation}</div>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        
        <div className="quantity-section">
          <div className="quantity-label">Cantidad</div>
          <div className="quantity-selector">
            <button className="quantity-btn" onClick={handleDecrement}>-</button>
            <input 
              type="number" 
              className="quantity-input" 
              value={quantity} 
              min="1" 
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <button className="quantity-btn" onClick={handleIncrement}>+</button>
          </div>
          
          <button 
            className="add-to-cart"
            onClick={() => onAddToCart(product, quantity)}
          >
            AGREGAR AL CARRITO
          </button>
          
          <div className="delivery-info">
            <span className="delivery-badge">50 MIN</span>
            <span>Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
