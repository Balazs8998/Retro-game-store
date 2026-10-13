import {Service, signal} from '@angular/core';

@Service()
export class CartStore {

  cart = signal(new Map<number, number>())

  addToCart(gameId: number, purchaseQuantity:number) {
    this.cart.update(cart => {
      const updatedCart = new Map(cart);
      const currentyQuantity = updatedCart.get(gameId) ?? 0;

      updatedCart.set(gameId, currentyQuantity + purchaseQuantity);
      return updatedCart;
    })
  }

  removeFromCart(gameId: number, purchaseQuantity:number) {
    if (!this.cart().has(gameId)) {
      return;
    }

    this.cart.update(cart => {
      const updatedCart = new Map(cart);
      const currentQuantity = updatedCart.get(gameId) ?? 0;

      if (currentQuantity > 1) {
        updatedCart.set(gameId, currentQuantity - purchaseQuantity);
        return updatedCart;
      }
      updatedCart.delete(gameId)
      return updatedCart;

    })

  }

  clearCart(){
    this.cart().clear();
  }


}
