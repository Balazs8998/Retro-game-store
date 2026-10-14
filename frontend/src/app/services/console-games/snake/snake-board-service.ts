import {Injectable} from '@angular/core';
import {
  boardHeight,
  boardWidth
} from '../../../components/shared-components/game-console/games/snake-game/config/snake-config';
import {Snake} from '../../../components/shared-components/game-console/games/snake-game/model/snake';
import {Food} from '../../../components/shared-components/game-console/games/snake-game/model/food';
import {Coordinate} from '../../../components/shared-components/game-console/games/snake-game/model/coordinate';

@Injectable({providedIn: 'root'})
export class SnakeBoardService {

  cells: number[][] = [];


  createBoard(): void {
    this.cells.length = 0;

    for (let i = 0; i < boardHeight; i++) {
      this.cells.push(Array(boardWidth).fill(0));
    }
  }


  placeSnakeOnBoard(snake: Snake): void {
    for (let i = 0; i < snake.body.length; i++) {
      let x = snake.body[i].x;
      let y = snake.body[i].y;

      this.cells[x][y] = 1;
    }
  }

  placeFoodOnBoard(food: Food): void {

    const x = food.body.x;
    const y = food.body.y;
    this.cells[x][y] = 2
  }

  freeCells(cells: number[][]): Coordinate[] {
    let coordinate: Coordinate[] = [];

    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        if (cells[i][j] === 0) {
          let freeCoordinate = {x: i, y: j};
          coordinate.push(freeCoordinate);
        }
      }

    }
    return coordinate;
  }


}
