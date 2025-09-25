
import { useState, useCallback } from 'react';
import { initialState } from '../models/AppModel';

export default function useAppController() {
    const [counter, setCounter] = useState(initialState.counter || 0);

    //  Nuevo estado para el carrito
    const [cart, setCart] = useState(initialState.cart || []);

    const increment = useCallback(() => setCounter((c) => c + 1), []);
    const decrement = useCallback(() => setCounter((c) => c - 1), []);

    // Lógica para agregar al
    const addToCart = useCallback((product, quantity) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Si el producto existe, aumenta la cantidad
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                // Si no existe, agrégalo al carrito con la cantidad
                return [...prevCart, { ...product, quantity }];
            }
        });
    }, []);

    // Logica para actualizar la cantidad
    const updateCartQuantity = useCallback((productId, quantity) => {
        setCart(prevCart => {
            if (quantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            );
        });
    }, []);

    // Lógica para eliminar
    const removeFromCart = useCallback((productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);


    return {
        title: initialState.title,
        subtitle: initialState.subtitle,
        counter,
        increment,
        decrement,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
    };
}