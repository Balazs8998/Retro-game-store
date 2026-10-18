import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject, output,
  signal,

} from '@angular/core';
import {SnakeBodyService} from '../../../../../../../services/console-games/snake/snake-body-service';
import {SnakeMoveService} from '../../../../../../../services/console-games/snake/snake-move-service';
import {GameInputService} from '../../../../../../../services/console-games/snake/game-input-service';
import {levelSpeeds, levelUpScore} from '../../config/snake-config';
import {SnakeBoardService} from '../../../../../../../services/console-games/snake/snake-board-service';
import {Food} from '../../model/food';
import {Coordinate} from '../../model/coordinate';
import {GameStatus} from '../../../../types/game-status';
import {GameScreen} from '../../../../types/game-screen';
import {KeyBindingService} from '../../../../../../../services/console-games/snake/key-binding-service';


@Component({
  selector: 'app-snake-game-play',
  imports: [],
  templateUrl: './snake-game-play.html',
  styleUrl: './snake-game-play.css',
})

export class SnakeGamePlay {

  private cdr = inject(ChangeDetectorRef);
  private readonly snakeBodyService = inject(SnakeBodyService);
  private readonly snakeMoveService = inject(SnakeMoveService);
  private readonly snakeBoardService = inject(SnakeBoardService);
  private readonly consoleInput = inject(GameInputService);
  protected readonly keyBindingService = inject(KeyBindingService);

  isGameRunning = signal<GameStatus>('stopped');
  gameScreen = signal<GameScreen>('control')

  private timer?: ReturnType<typeof setInterval>;
  protected readonly score = signal<number>(0);


  cells: number[][] = this.snakeBoardService.cells;
  snake = this.snakeBodyService.snake;
  freeCells: Coordinate[] = [];
  food: Food = new Food;

  snakeLevel = signal(this.snake.level);

  speed = computed(() => {
    const level = Math.min(10, Math.max(1, this.snakeLevel()));
    return levelSpeeds[level - 1]
  });

  exitToSnakeMenu = output();

  constructor() {
    effect(() => {
      if (this.consoleInput.isPressed('up')) {
        this.snakeMoveService.moveUpDirection();
      } else if (this.consoleInput.isPressed('down')) {
        this.snakeMoveService.moveDownDirection();
      } else if (this.consoleInput.isPressed('left')) {
        this.snakeMoveService.moveLeftDirection();
      } else if (this.consoleInput.isPressed('right')) {
        this.snakeMoveService.moveRightDirection()
      } else if (this.consoleInput.isPressed('square')) {
        this.gameStart();
        console.log(this.isGameRunning())
      } else if (this.consoleInput.isPressed('circle')) {
        this.gameStop()
        this.outputExit();

      }else if (this.consoleInput.isPressed('triangle')){
        this.gamePause();
      }else if(this.gameScreen() === 'control' && this.consoleInput.isPressed('select')){
        this.fromControlToPlayScreen();
      }
    });

  }

  ngOnDestroy() {
    this.gameStop();
  }

  private fromControlToPlayScreen(){
    this.gameScreen.set("play")
    this.gameStart();
  }

  private gameStart(): void {

    if (this.isGameRunning() === 'stopped') {
      this.isGameRunning.set('running');
      this.snake = this.snakeBodyService.createSnake();

      this.prepareGame();

      this.snakeLevel.set(this.snake.level);
      this.score.set(0);
      this.gameRun();
    }
    if (this.isGameRunning() === 'paused'){
      this.isGameRunning.set('running');
      this.gameRun();
    }


  }

  private gamePause(): void {
    this.isGameRunning.set('paused')
    clearInterval(this.timer);
    this.timer= undefined;
  }

  private gameStop(): void {
    this.isGameRunning.set('stopped')
    this.gameScreen.set('game over')
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

  private prepareGame(): void {
    this.snakeBoardService.createBoard();
    this.snakeBoardService.placeSnakeOnBoard(this.snake);
    this.freeCells = this.snakeBoardService.freeCells(this.cells);
    this.food = this.snakeBodyService.createFood(this.freeCells);
    this.snakeBoardService.placeFoodOnBoard(this.food);
    this.snakeMoveService.moveDirection.set({x:0,y:1})

  }

  private tickGame(): void {
    this.snakeBoardService.createBoard();
    const snakeBodyX = this.snake.body[this.snake.body.length - 1].x
    const snakeBodyY = this.snake.body[this.snake.body.length - 1].y
    this.snakeMoveService.move(this.snake);
    let isSelfCollier: boolean = this.snakeBodyService.checkSelfCollision(this.snake);
    if (isSelfCollier) {
      this.gameStop();
      return;
    }
    let isFoodEat: boolean = this.snakeBodyService.handleFoodCollision(this.food, this.snake);
    if (isFoodEat) {
      this.snakeBodyService.growSnake(snakeBodyX, snakeBodyY, this.snake);
      this.addScoreToSnake();
    }
    this.snakeBoardService.placeSnakeOnBoard(this.snake);

    if (isFoodEat) {
      this.freeCells = this.snakeBoardService.freeCells(this.cells);
      this.food = this.snakeBodyService.createFood(this.freeCells);
    }
    this.snakeBoardService.placeFoodOnBoard(this.food);
    this.snakeMoveService.allowNextDirectionChange();
    // this.debugSnakeState();
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

  outputExit() {
    this.exitToSnakeMenu.emit();
  }

  // private debugSnakeState() {
  //   for (let i = 0; i < this.snake.body.length; i++) {
  //     console.log("Snake: ", this.snake.body[i])
  //   }
  // }



}
