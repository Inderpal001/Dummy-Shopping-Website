'use client'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store';
import { Toaster } from 'react-hot-toast';

export default function StoreProvider({ children }) {

  return <Provider store={makeStore}><Toaster /> {children}</Provider>
}