import { Injectable, signal, computed, effect } from '@angular/core';

export interface CartItem {
  // Define the structure of a cart item
  _id: string;
  name_en: string;
  price: number;
  images: string[];
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {


  // The core state of our cart
  cartItems = signal<CartItem[]>([]);

  // Computed signals for derived state
  cartCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );
  cartTotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  constructor() {
    // Load cart from localStorage when the service is initialized
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.set(JSON.parse(savedCart));
    }

    // Use an effect to save the cart to localStorage whenever it changes
    effect(() => {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    });
  }

  addItem(product: any) {
    const existingItem = this.cartItems().find(item => item._id === product._id);

    if (existingItem) {
      // If item already exists, just update its quantity
      this.cartItems.update(items =>
        items.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If it's a new item, add it to the cart
      const newItem: CartItem = { ...product, quantity: 1 };
      this.cartItems.update(items => [...items, newItem]);
    }
  }

  // We will add remove/update quantity methods later
}
