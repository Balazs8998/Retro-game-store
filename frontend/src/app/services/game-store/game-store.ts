import {DestroyRef, inject, Service, signal} from '@angular/core';
import {GameApiService} from '../game-api-service/game-api-service';
import {GameModel} from '../../models/game-model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Service()
export class GameStore {

  private readonly gameApiService = inject(GameApiService);
  private readonly destroyRef = inject(DestroyRef);


   readonly games = signal<GameModel[]>([])


  loadGames() {
    this.gameApiService.fetchGames().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: value =>
        this.games.set(value),
      error: err => console.log(err)
    })

  }

}
