"use client"

import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
    if (typeof window !== 'undefined' && window?.localStorage) {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    } else {
        return [];
    }
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartItems(),
    reducers: {
        addToCart: (state, action) => {
            const { id } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('cartItems', JSON.stringify(state));
            }
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const updatedCartItems = state.filter(item => item.id !== itemId);
            state.splice(0, state.length, ...updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(state));
        },

        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            }
            localStorage.setItem('cartItems', JSON.stringify(state));
        },

        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.find(item => item.id === itemId);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
            }
            localStorage.setItem('cartItems', JSON.stringify(state));
        },

        clearCart: (state) => {
            state = [];
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.removeItem('cartItems');
            }
            return state;
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;