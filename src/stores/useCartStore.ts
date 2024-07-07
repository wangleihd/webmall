import { create } from 'zustand'
import { CartItem } from '@/types/stores/cart';

interface CardStore {
	items: CartItem[];
	totalQuantity: number;
	addItem: (item: CartItem) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
	addToCard: () => void;
	setQuantity: (id: number, quantity: number) => void;
}



export const useCartStore = create<CardStore>((set) => ({
	items: [],
	totalQuantity: 0,
	addItem: (item) => set((state) => {
		const existingItem = state.items.find((i) => i.id === item.id);
		let newItems;
		if (existingItem) {
			newItems = state.items.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
			);
		} else {
			newItems = [...state.items, item];
		}
		return {
			items: newItems,
			totalQuantity: newItems.reduce((total, item) => total + item.quantity, 0),
		};
	}),
	removeItem: (id) => set((state) => {
		const newItems = state.items.filter((item) => item.id !== id);
		return {
			items: newItems,
			totalQuantity: newItems.reduce((total, item) => total + item.quantity, 0),
		};
	}),
	clearCart: () => set({ items: [], totalQuantity: 0 }),
	addToCard: () => set((state) => ({ totalQuantity: state.totalQuantity + 1 })),
	setQuantity: (id, quantity) => set((state) => {
		const newItems = state.items.map((item) =>
			item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item).filter(item => item.quantity > 0);
		return {
			items: newItems,
			totalQuantity: newItems.length,
		};
	}),
}));


