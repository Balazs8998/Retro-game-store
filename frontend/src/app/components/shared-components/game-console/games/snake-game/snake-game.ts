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
import {SnakeBoardService} from '../../../../../services/console-games/snake/snake-board-service';
import {Food} from './model/food';
import {Coordinate} from './model/coordinate';


@Component({
  selector: 'app-snake-game',
  imports: [],
  templateUrl: './snake-game.html',
  styleUrl: './snake-game.css',
})

export class SnakeGame {

  private cdr = inject(ChangeDetectorRef);
  private readonly snakeBodyService = inject(SnakeBodyService);
  private readonly snakeMoveService = inject(SnakeMoveService);
  private readonly snakeBoardService = inject(SnakeBoardService);
  private readonly gameInput = inject(GameInputService);


  private timer?: ReturnType<typeof setInterval>;


  protected readonly score = signal <number>(0);


  cells: number[][] = this.snakeBoardService.cells ;

  snake = this.snakeBodyService.snake;
  freeCells : Coordinate[] = [] ;
  food: Food = new Food;

  snakeLevel = signal(this.snake.level);

  speed = computed(() => {
    const level = Math.min(10, Math.max(1, this.snakeLevel()));
    return levelSpeeds[level - 1]
  });

  isGameRunning = signal<boolean>(false);


  constructor() {
    effect(() => {
      if (this.isGameRunning()) {
        this.prepareBoard();
        this.gameRun();
      }
    });
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

  }


  ngOnDestroy() {
    this.gameStop();
  }




  private gameStart(): void {
    this.snake = this.snakeBodyService.createSnake();

    this.prepareBoard();

    this.snakeLevel.set(this.snake.level);
    this.score.set(0);

    this.isGameRunning.set(true);
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
  private prepareBoard(): void {
    this.snakeBoardService.createBoard();
    this.snakeBoardService.placeSnakeOnBoard(this.snake);
    this.freeCells = this.snakeBoardService.freeCells(this.cells);
    this.food = this.snakeBodyService.createFood(this.freeCells);
    this.snakeBoardService.placeFoodOnBoard(this.food);
  }

  private tickGame(): void {

    this.snakeBoardService.createBoard();
    const snakeBodyX = this.snake.body[this.snake.body.length - 1].x
    const snakeBodyY = this.snake.body[this.snake.body.length - 1].y
    this.snakeMoveService.move(this.snake);
    let isSelfCollier : boolean  = this.snakeBodyService.checkSelfCollision(this.snake);
    if(isSelfCollier){
      this.gameStop();
      return;
    }
    let isFoodEat : boolean = this.snakeBodyService.handleFoodCollision(this.food, this.snake);
    if (isFoodEat){
      this.snakeBodyService.growSnake(snakeBodyX,snakeBodyY,this.snake);
      this.addScoreToSnake();
    }
    this.snakeBoardService.placeSnakeOnBoard(this.snake);

    if (isFoodEat){
      this.freeCells = this.snakeBoardService.freeCells(this.cells);
      this.food = this.snakeBodyService.createFood(this.freeCells);
    }
    this.snakeBoardService.placeFoodOnBoard(this.food);
    this.snakeMoveService.allowNextDirectionChange();
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
