import {Snake} from '../../../components/shared-components/game-console/games/snake-game/model/snake';
import {Injectable} from '@angular/core';
import {Food} from '../../../components/shared-components/game-console/games/snake-game/model/food';
import {Coordinate} from '../../../components/shared-components/game-console/games/snake-game/model/coordinate';

@Injectable({
  providedIn: 'root'
})
export class SnakeBodyService {

  snake = this.createSnake();

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

  public createFood(freeCoordinate: Coordinate[] ) {


    let randomIndex = Math.floor(Math.random() * freeCoordinate.length);
    const food : Food = new Food;
    food.body.x = freeCoordinate[randomIndex].x;
    food.body.y = freeCoordinate[randomIndex].y;

    return food;
  }

  growSnake(snakeBodyX: number, snakeBodyY: number, snake: Snake): void {
    snake.body.push({x: snakeBodyX, y: snakeBodyY})
    console.log(snake.body.length)
  }


  checkSelfCollision(snake : Snake): boolean {
    let hasCollision : boolean = false;

    for (let i = 1; i < snake.body.length; i++) {

      if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y)
        hasCollision = true
        if(hasCollision)
         return hasCollision;
    }

    return hasCollision;
  }

  handleFoodCollision(food: Food, snake: Snake): boolean {
    return snake.body[0].x === food.body.x && snake.body[0].y === food.body.y;
  }

}
