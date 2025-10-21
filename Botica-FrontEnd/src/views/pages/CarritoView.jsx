import React, { useMemo, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CartItem from '../partials/CartItem';
import '../../styles/carrito.css';
import { useCart } from '../../controllers/CartContext';

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const n = Number(priceStr.replace('S/.', '').replace(',', '.').trim());
    return isNaN(n) ? 0 : n;
};

function CarritoView() {
    const { cart, updateCartQuantity, removeFromCart } = useCart();
    const [pasoActivo, setPasoActivo] = useState(null);
    const [tipoEntrega, setTipoEntrega] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [metodoPago, setMetodoPago] = useState('');

    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            const price = parsePrice(item.price);
            return acc + (price * item.quantity);
        }, 0).toFixed(2);
    }, [cart]);

    const togglePaso = (paso) => {
        setPasoActivo(pasoActivo === paso ? null : paso);
    };

    const procederAlPago = () => {
        if (!tipoEntrega) return alert('⚠️ Debes seleccionar el tipo de entrega.');
        if (tipoEntrega === 'direccion' && direccion.trim() === '') return alert('🏠 Por favor, ingresa tu dirección.');
        if (nombre.trim() === '' || correo.trim() === '') return alert('📞 Completa tus datos de contacto.');
        if (!metodoPago) return alert('💳 Selecciona un método de pago.');

        alert('✅ ¡Compra realizada con éxito!');
    };

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
                                {/* Paso 1: Tipo de entrega */}
                                <div className={`accordion-item ${pasoActivo === 1 ? 'activo' : ''}`}>
                                    <button className="accordion-header" onClick={() => togglePaso(1)}>
                                        Dirección de envío o recojo en tienda
                                    </button>
                                    {pasoActivo === 1 && (
                                        <div className="accordion-body">
                                            <label>Seleccione tipo de entrega:</label>
                                            <select
                                                value={tipoEntrega}
                                                onChange={(e) => setTipoEntrega(e.target.value)}
                                            >
                                                <option value="">Seleccione...</option>
                                                <option value="direccion">Envío a domicilio</option>
                                                <option value="tienda">Recojo en tienda</option>
                                            </select>

                                            {/* Animación de aparición */}
                                            <div
                                                className={`direccion-input ${tipoEntrega === 'direccion' ? 'visible' : 'oculto'}`}
                                            >
                                                {tipoEntrega === 'direccion' && (
                                                    <input
                                                        type="text"
                                                        placeholder="Ingrese su dirección"
                                                        value={direccion}
                                                        onChange={(e) => setDireccion(e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Paso 2: Datos de contacto */}
                                <div className={`accordion-item ${pasoActivo === 2 ? 'activo' : ''}`}>
                                    <button className="accordion-header" onClick={() => togglePaso(2)}>
                                        Datos de contacto
                                    </button>
                                    {pasoActivo === 2 && (
                                        <div className="accordion-body">
                                            <input
                                                type="text"
                                                placeholder="Nombre completo"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Correo electrónico"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Paso 3: Método de pago */}
                                <div className={`accordion-item ${pasoActivo === 3 ? 'activo' : ''}`}>
                                    <button className="accordion-header" onClick={() => togglePaso(3)}>
                                        Método de pago
                                    </button>
                                    {pasoActivo === 3 && (
                                        <div className="accordion-body">
                                            <select
                                                value={metodoPago}
                                                onChange={(e) => setMetodoPago(e.target.value)}
                                            >
                                                <option value="">Seleccione...</option>
                                                <option value="tarjeta">Tarjeta</option>
                                                <option value="yape">Yape</option>
                                                <option value="tienda">Pago en tienda</option>
                                            </select>
                                        </div>
                                    )}
                                </div>

                                {/* Paso 4: Resumen final */}
                                <div className={`accordion-item ${pasoActivo === 4 ? 'activo' : ''}`}>
                                    <button className="accordion-header" onClick={() => togglePaso(4)}>
                                        Resumen y confirmación final
                                    </button>
                                    {pasoActivo === 4 && (
                                        <div className="accordion-body">
                                            <p>Revisa tus datos antes de continuar.</p>
                                            <ul>
                                                <li><strong>Entrega:</strong> {tipoEntrega || '-'}</li>
                                                {tipoEntrega === 'direccion' && (
                                                    <li><strong>Dirección:</strong> {direccion || '-'}</li>
                                                )}
                                                <li><strong>Nombre:</strong> {nombre || '-'}</li>
                                                <li><strong>Correo:</strong> {correo || '-'}</li>
                                                <li><strong>Pago:</strong> {metodoPago || '-'}</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Subtotal y botón final */}
                            <div className="cart-total-footer">
                                <h3>Subtotal: S/.{subtotal}</h3>
                                <button className="checkout-btn" onClick={procederAlPago}>
                                    Proceder al Pago
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

export default CarritoView;
