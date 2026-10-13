import {Component, computed, inject} from '@angular/core';
import {CartStore} from '../../services/cart-store/cart-store';
import {GameStore} from '../../services/game-store/game-store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  private readonly cartStore = inject(CartStore);
  private readonly gameStore = inject(GameStore);
  private readonly router = inject(Router);


  protected readonly cartRows = computed(() =>{
    const carts = this.cartStore.cart();
    const games = this.gameStore.games();

    return Array.from(carts.entries()).flatMap(([gameId, quantity]) => {
      const game = games.find(game => game.id === gameId );
      if (!game){
        return[]
      }
      return [{
        game,
        quantity
      }];
    });

  });



  clearCart(){
    this.cartStore.clearCart();
  }


  protected backToGames() {
    this.router.navigate(['/games'])
  }
}


// protected readonly rentalRows = computed(() => {
//   const rentals = this.rentalsService.rentals();
//   const games = this.gameService.games();
//
//   return Array.from(rentals.values()).flatMap((rental) => {
//     const game = games.find(
//       game => game.id === rental.gameId
//     );
//     if (!game){
//       return [];
//     }
//     return [{
//       game,
//       quantity: rental.quantity
//     }];
//   });
// });
