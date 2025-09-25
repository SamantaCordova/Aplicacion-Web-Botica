// src/controllers/CartContext.jsx

import React, { createContext, useContext } from 'react';
import useAppController from './AppController'; 

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const cartControls = useAppController();

    return (
        <CartContext.Provider value={cartControls}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};