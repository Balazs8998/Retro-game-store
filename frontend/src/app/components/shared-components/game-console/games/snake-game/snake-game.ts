import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  signal,

} from '@angular/core';
import {SnakeBodyService} from '../../../../../services/console-games/snake/snake-body-service';
import {SnakeMoveService} from '../../../../../services/console-games/snake/snake-move-service';
import {GameInputService} from '../../../../../services/console-games/snake/game-input-service';
import {levelSpeeds, levelUpScore} from './config/snake-config';


@Component({
  selector: 'app-snake-game',
  imports: [],
  templateUrl: './snake-game.html',
  styleUrl: './snake-game.css',
})

export class SnakeGame {

  private cdr = inject(ChangeDetectorRef);
  protected readonly snakeBodyService = inject(SnakeBodyService);
  protected readonly snakeMoveService = inject(SnakeMoveService);
  protected readonly gameInput = inject(GameInputService);


  private timer?: ReturnType<typeof setInterval>;


  protected readonly score = signal <number>(0);


  cells: number[][] = [];

  snake = this.snakeBodyService.createSnake();
  food = this.snakeBodyService.createFood(this.snake);

  snakeLevel = signal(this.snake.level);

  speed = computed(() => {
    const level = Math.min(10, Math.max(1, this.snakeLevel()));
    return levelSpeeds[level - 1]
  });

  isGameRunning = signal<boolean>(false);


  constructor() {
    effect(() => {
      if (this.gameInput.isPressed('up')) {
        this.snakeMoveService.moveUpDirection();
      } else if (this.gameInput.isPressed('down')) {
        this.snakeMoveService.moveDownDirection();
      } else if (this.gameInput.isPressed('left')) {
        this.snakeMoveService.moveLeftDirection();
      } else if (this.gameInput.isPressed('right')) {
        this.snakeMoveService.moveRightDirection()
      } else if (this.gameInput.isPressed('square')) {
        this.gameStart()
      } else if (this.gameInput.isPressed('circle')) {
        this.gameStop()
      }
    });

    effect(() => {
      if (this.isGameRunning()) {
        this.gameRun()
      }
    });
  }


  ngOnDestroy() {
    this.gameStop();
  }

  private gameStart(): void {
    this.isGameRunning.set(true)
    this.snake = this.snakeBodyService.createSnake();
    this.food = this.snakeBodyService.createFood(this.snake);
    this.snakeLevel.set(this.snake.level)
    this.score.set(0);
  }

  private gameStop(): void {
    this.isGameRunning.set(false)
    clearInterval(this.timer);
    this.timer = undefined;
  }

  private gameRun(): void {
    if (this.isGameRunning()) {
      clearInterval(this.timer);
      this.timer = undefined;
      this.timer = setInterval(() => {
        this.tickGame();
        this.cdr.markForCheck();
      }, this.speed());
    } else {
      this.gameStop();
    }
  }

  private tickGame(): void {

    this.createBoard();
    const snakeBodyX = this.snake.body[this.snake.body.length - 1].x
    const snakeBodyY = this.snake.body[this.snake.body.length - 1].y
    this.snakeMoveService.move(this.snake)
    this.checkCollisions(snakeBodyX, snakeBodyY)
    this.placeSnakeOnBoard();
    this.placeFoodOnBoard();
    this.snakeMoveService.allowNextirectionChange();
    console.log(this.snake.level, "snake level")

    console.log(this.snakeLevel(), "snakelevel signal")
  }

  private createBoard(): void {

    this.cells = [];
    const rows: number = 20;
    const columns: number = 20;

    for (let i = 0; i < rows; i++) {
      this.cells.push([]);

      for (let g = 0; g < columns; g++) {
        this.cells[i][g] = 0;
      }

    }
  }

  private placeSnakeOnBoard(): void {
    for (let i = 0; i < this.snake.body.length; i++) {
      let x = this.snake.body[i].x;
      let y = this.snake.body[i].y;

      this.cells[x][y] = 1;
    }
  }

  private placeFoodOnBoard(): void {

    const x = this.food.body.x;
    const y = this.food.body.y;
    this.cells[x][y] = 2
  }

  private checkCollisions(snakeBodyX: number, snakeBodyY: number): void {
    this.checkSelfCollision();
    this.handleFoodCollision(snakeBodyX, snakeBodyY);
  }

  private checkSelfCollision(): void {
    for (let i = 1; i < this.snake.body.length; i++) {
      if (this.snake.body[0].x === this.snake.body[i].x && this.snake.body[0].y === this.snake.body[i].y) {
        this.gameStop();
      }
    }
  }

  private handleFoodCollision(snakeBodyX: number, snakeBodyY: number): void {
    if (this.snake.body[0].x === this.food.body.x && this.snake.body[0].y === this.food.body.y) {

      this.cells[this.snake.body[0].x][this.snake.body[0].y] = 0;
      this.food = this.snakeBodyService.createFood(this.snake);

      this.addScoreToSnake();
      this.growSnake(snakeBodyX, snakeBodyY);

    }
  }

  private growSnake(snakeBodyX: number, snakeBodyY: number): void {
    this.snake.body.push({x: snakeBodyX, y: snakeBodyY})
  }

  private addScoreToSnake(): void {
    this.score.set(this.score() + 10);
    this.levelUpSnake();

  }

  private levelUpSnake(): void {
    if (this.snakeLevel() < 10 && levelUpScore.includes(this.score())) {
      this.snakeLevel.update(level => level + 1)
    }
  }


}
