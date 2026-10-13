import {Snake} from '../../../components/shared-components/game-console/games/snake-game/model/snake';
import {HostListener, Injectable} from '@angular/core';
import {Coordinate} from '../../../components/shared-components/game-console/games/snake-game/model/coordinate';
import {Food} from '../../../components/shared-components/game-console/games/snake-game/model/food';

@Injectable({
  providedIn: 'root'
})
export class SnakeBodyService {

  public createSnake(): Snake {
    const snake = new Snake();
    const head = {
      x: 10,
      y: 12
    };
    const body = {
      x: 10,
      y: 11
    };

    snake.body.push(head);
    snake.body.push(body);

    return snake;
  }

  public createFood(snake:Snake){
    let randomXCoordinate = Math.floor(Math.random() * 19);
    let randomYCoordinate = Math.floor(Math.random() * 19);

    const eat: Food = new Food();

    eat.body.x = randomXCoordinate;
    eat.body.y = randomYCoordinate;

    return eat;
  }

  private snakeCoordinatList(snake:Snake){}

}
