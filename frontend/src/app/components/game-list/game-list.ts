import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GameStore} from '../../services/game-store/game-store';
import {GameConsole} from '../shared-components/game-console/game-console';



@Component({
  selector: 'app-game-list',
  imports: [
    RouterLink,
    GameConsole
  ],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css',
})
export class GameList {

  private readonly gameStore = inject(GameStore);

  protected readonly viewMode = signal<'list' | 'grid'>('grid')
  protected readonly games = this.gameStore.games;


  ngOnInit() {
    this.gameStore.loadGames()
  }


  setGridVeiw() {
    this.viewMode.set('grid')
  }

  setListVeiw() {
    this.viewMode.set('list')
  }





}
