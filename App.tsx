import React from 'react';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
      </CartProvider>
    </UserProvider>
  );
}
