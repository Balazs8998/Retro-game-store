import {Component, effect, inject, output, signal} from '@angular/core';
import {SnakeMenuAction} from '../../types/snake-menu-action';
import {GameInputService} from '../../../../../../../services/console-games/snake/game-input-service';

@Component({
  selector: 'app-snake-menu',
  imports: [],
  templateUrl: './snake-menu.html',
  styleUrl: './snake-menu.css',
})
export class SnakeMenu {

  private readonly consoleInput = inject(GameInputService);

  private i : number = 0;
  snakeMenus: SnakeMenuAction[] = ['Start Game','Settings','Score','Exit']
  protected readonly snakeSelectedAction = signal<SnakeMenuAction>('Start Game')

  exitSnake = output();
  selectedAction = output<SnakeMenuAction>();

  constructor() {
    effect(() => {
      if(this.consoleInput.isPressed('down')){
        this.consoleInput.release('down')
        this.i += 1;
        if (this.i>= this.snakeMenus.length){
          this.i =  0
        }
        this.snakeSelectedAction.set(this.snakeMenus[this.i])
      }
      if(this.consoleInput.isPressed('up')){
        this.consoleInput.release('up')

        this.i -= 1;
        if(this.i <  0){
          this.i = this.snakeMenus.length-1;
        }
        this.snakeSelectedAction.set(this.snakeMenus[this.i])
      }
      if (this.consoleInput.isPressed('select')){
        this.consoleInput.release('select')
        if(this.snakeSelectedAction() === "Exit"){
          this.outputExit();
        }else{
        this.outputSelectedAction(this.snakeSelectedAction())
      }}

    });

  }


  outputSelectedAction(snakeSelectedAction : SnakeMenuAction){
    this.selectedAction.emit(snakeSelectedAction)
  }

  outputExit(){
    this.exitSnake.emit();
  }

}
