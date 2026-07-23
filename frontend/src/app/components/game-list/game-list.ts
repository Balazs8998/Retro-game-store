import {Component, DestroyRef, inject, signal} from '@angular/core';
import {GameService} from '../../services/game.service';
import {GameModel} from '../../models/game-model';
import {Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-game-list',
  imports: [
    RouterLink
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList {

  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly veiwMode = signal<'list' | 'grid'>('grid')
  protected readonly games = signal<GameModel[]>([])

  protected readonly consoleStartButton = signal(false)

  ngOnInit() {
  this.loadGames()
  }

  ngOnDestroy() {
    if(this.inactivityTimer){
      clearTimeout(this.inactivityTimer)
    }
  }

  setGridVeiw(){
    this.veiwMode.set('grid')
  }

  setListVeiw(){
    this.veiwMode.set('list')
  }

  setConsoleStartButton(){
    this.consoleStartButton.set(true);
    this.resetInactivityTimer();
  }

  private inactivityTimer?: ReturnType<typeof setTimeout>;

  resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(() => {
      this.consoleStartButton.set(false);
    }, 1 * 60 * 1000);
  }


  loadGames() {
    this.gameService.fetchGames().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: value =>
        this.games.set(value),
      error: err => console.log(err)
    })



  }


}
