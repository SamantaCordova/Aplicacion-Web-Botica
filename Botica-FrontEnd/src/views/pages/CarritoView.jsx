// src/views/pages/CarritoView.jsx

import React, { useMemo } from 'react';
import MainLayout from '../layouts/MainLayout'; 
import  CartItem  from '../partials/CartItem';
import '../../styles/carrito.css'; 
import { useCart } from '../../controllers/CartContext'; // Hook para el estado global

// Función convertir precio a string
const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const n = Number(priceStr.replace('S/.', '').replace(',', '.').trim());
    return isNaN(n) ? 0 : n;
};

function CarritoView() {
    // Obtener el contexto del carrito
    const { cart, updateCartQuantity, removeFromCart } = useCart(); 

    // Calcular el subtotal cada vez que el carrito cambie
    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const price = parsePrice(item.price);
            return acc + (price * item.quantity);
        }, 0).toFixed(2);
    }, [cart]);

    return (
        <MainLayout backgroundImageUrl="/assets/fondo-carrito.JPG"> 
            <div className="cart-container">
                <h1 className="page-title">Resumen de compra</h1>                
                {cart.length === 0 ? (
                    <div className="empty-cart-message">
                        <h2>Tu carrito está vacío.</h2>
                        <p>¡Explora nuestro <a href="/catalogo">catálogo</a> para encontrar tus productos!</p>
                    </div>
                ) : (
                    <div className="cart-content-wrapper">
                        <section className="cart-items-list" aria-labelledby="products-in-cart">
                            <h2 id="products-in-cart" className="section-header">Productos de tu carrito</h2>
                            {cart.map(item => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    updateQuantity={updateCartQuantity} 
                                    removeItem={removeFromCart} 
                                />
                            ))}
                        </section>
                        <aside className="checkout-summary">
                            <h2 className="section-header">¿Listo para continuar?</h2>
                            
                            <div className="accordion-steps">
                                <details open>
                                    <summary>Dirección de envío o retiro en tienda</summary>
                                </details>
                                <details>
                                    <summary>Datos de contacto</summary>
                                </details>
                                <details>
                                    <summary>Método de pago</summary>
                                </details>
                                <details>
                                    <summary>Resumen y confirmación final</summary>
                                </details>
                            </div>
                            
                            <div className="cart-total-footer">
                                <h3>Subtotal: S/.{subtotal}</h3>
                                <button className="checkout-btn">Proceder al Pago</button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default CarritoView;