import {Snake} from '../../../components/shared-components/game-console/games/snake-game/model/snake';
import {Coordinate} from '../../../components/shared-components/game-console/games/snake-game/model/coordinate';
import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnakeMoveService{


  moveDirection = signal<Coordinate>({x:0,y:1})
  canChangeDirection = signal<boolean>(true);



  move(snake: Snake):void{

    for (let i = snake.body.length -1; i >= 1; i--) {
      let x = snake.body[i-1].x;
      let y = snake.body[i-1].y;
      snake.body[i].x = x;
      snake.body[i].y = y;
    }

    this.moveControl(snake)
  }

  moveControl(snake:Snake):void{

    let xHeadNow = snake.body[0].x;
    let yHeadNow = snake.body[0].y;
    let xEnd = 20;
    let yEnd = 20;
    let xHeadWithDirection = xHeadNow + this.moveDirection().x;
    let yHeadWithDirection = yHeadNow + this.moveDirection().y;

    if(xHeadWithDirection >= xEnd){
      snake.body[0].x = 0;
      snake.body[0].y = yHeadWithDirection
      return

    }else if(xHeadWithDirection < 0){
      snake.body[0].x = 19
      snake.body[0].y = yHeadWithDirection
      return

    }else if (yHeadWithDirection >= yEnd){
      snake.body[0].y = 0;
      snake.body[0].x = xHeadWithDirection
      return

    }else if(yHeadWithDirection < 0){
      snake.body[0].y = 19
      snake.body[0].x = xHeadWithDirection
      return

    }else
      snake.body[0].y = yHeadWithDirection
    snake.body[0].x = xHeadWithDirection
  }

  allowNextDirectionChange():void{
    this.canChangeDirection.set(true);
  }

  moveRightDirection(): void {
    if (!this.canChangeDirection())
      return;

    if (this.moveDirection().y !== 0)
      return;

    const newCoordinate = {x: 0, y: 1};
    this.moveDirection.set(newCoordinate);
    this.canChangeDirection.set(false);
  }

  moveLeftDirection(): void {
    if (!this.canChangeDirection())
      return;

    if (this.moveDirection().y !== 0)
      return;

    const newCoordinate = {x: 0, y: -1};
    this.moveDirection.set(newCoordinate);
    this.canChangeDirection.set(false);
  }

  moveUpDirection(): void {
    if (!this.canChangeDirection())
      return;

    if (this.moveDirection().x !== 0)
      return;

    const newCoordinate = {x: -1, y: 0};
    this.moveDirection.set(newCoordinate);
    this.canChangeDirection.set(false);
  }

  moveDownDirection(): void {
    if (!this.canChangeDirection())
      return;

    if (this.moveDirection().x !== 0)
      return;

    const newCoordinate = {x: 1, y: 0};
    this.moveDirection.set(newCoordinate);
    this.canChangeDirection.set(false);
  }
}
