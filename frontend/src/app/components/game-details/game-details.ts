import {Component, computed, DestroyRef, inject, input, numberAttribute, signal} from '@angular/core';
import {GameApiService} from '../../services/game-api-service/game-api-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {GameDetailsModel} from '../../models/game-details-model';
import { CartStore} from '../../services/cart-store/cart-store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-details',
  imports: [],
  templateUrl: './game-details.html',
  styleUrl: './game-details.css',
})
export class GameDetails {

  private readonly gameApiService = inject(GameApiService);
  private readonly cartStore = inject(CartStore);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected id = input.required({transform : numberAttribute});
  protected game = signal<GameDetailsModel | null>(null);
  protected purchaseQuantity = signal(1);

  available = computed(() => {
    const game = this.game();
    if(!game){
      return;
    }
    return game.stockQuantity > 0 ? "Available" : "Not Available"
});

  ngOnInit() {

    this.loadGame(this.id());
  }

  private loadGame(id : number){
    this.gameApiService.fetchGameDetails(id).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (value => {
          this.game.set(value)
          console.log(value)
        }),
        error :err => console.log(err)
      });
  }

  increasePurchaseQuantity() {
    this.purchaseQuantity.update(value => value +1)
  }
  decreasePurchaseQuantity(){
    if (this.purchaseQuantity() > 1){
      this.purchaseQuantity.update(value => value-1)
    }
  }

  addToCart(gameId:number){
    this.cartStore.addToCart(gameId, this.purchaseQuantity())
    this.router.navigate(['/cart'])
  }






}
