import {Component, effect, inject, output, signal} from '@angular/core';
import {GameInputService} from '../../../../../../services/console-games/snake/game-input-service';
import {ConsoleMenuAction} from '../../../types/console-menu-action';


@Component({
  selector: 'app-game-console-menu',
  imports: [],
  templateUrl: './game-console-menu.html',
  styleUrl: './game-console-menu.css',
})
export class GameConsoleMenu {


  private readonly consoleInput = inject(GameInputService);

  menus : ConsoleMenuAction[] = ['Snake','Tetris','Pong','Exit']

  protected readonly game = signal<ConsoleMenuAction>('Snake');
  private i: number = 0;

  exit = output();
  gameOutput = output<ConsoleMenuAction>();

  constructor() {
    effect(() => {
      if(this.consoleInput.isPressed('down')){
        this.consoleInput.release('down')
        this.i += 1;
        if (this.i>= this.menus.length){
          this.i =  0
        }
        this.game.set(this.menus[this.i])
      }
      if(this.consoleInput.isPressed('up')){
        this.consoleInput.release('up')
        this.i -= 1;
        if(this.i <  0){
          this.i = this.menus.length-1;
        }
        this.game.set(this.menus[this.i])
      }
      if (this.consoleInput.isPressed('select')){
        this.consoleInput.release('select')
        if (this.game() === 'Exit'){
          this.exitConsole();
        }
        this.gameOut(this.menus[this.i])
      }
    });

  }

  gameOut(game: ConsoleMenuAction){
    this.gameOutput.emit(game)
  }

  exitConsole(){
    this.exit.emit()
  }



}
