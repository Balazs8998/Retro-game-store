import {Component, output, signal} from '@angular/core';
import {SnakeMenuAction} from './types/snake-menu-action';
import {SnakeMenu} from './component/snake-menu/snake-menu';
import {SnakeGamePlay} from './component/snake-game-play/snake-game-play';
import {SnakeGameSettings} from './component/snake-game-settings/snake-game-settings';

@Component({
  selector: 'app-snake-game',
  imports: [
    SnakeMenu,
    SnakeGamePlay,
    SnakeGameSettings
  ],
  templateUrl: './snake-game.html',
  styleUrl: './snake-game.css',
})
export class SnakeGame {

  snakeSelectedAction = signal<SnakeMenuAction>('Menu')

  exitSnake = output();

  selectedAction(selectedAction: SnakeMenuAction){
    this.snakeSelectedAction.set(selectedAction)
  }

  backToSnakeMenu(){
    this.snakeSelectedAction.set('Menu');
    console.log(this.snakeSelectedAction())
  }

  exit(){
    this.exitSnake.emit();
  }
}
