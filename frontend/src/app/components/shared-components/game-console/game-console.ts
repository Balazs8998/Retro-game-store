import {Component, inject, signal} from '@angular/core';
import {SnakeGame} from "./games/snake-game/snake-game";
import {keymap} from './config/keymap';
import {GameStore} from '../../../services/game-store/game-store';
import {GameInputService} from '../../../services/console-games/snake/game-input-service';

@Component({
  selector: 'app-game-console',
    imports: [
        SnakeGame
    ],
  templateUrl: './game-console.html',
  styleUrl: './game-console.css',
})
export class GameConsole {

  protected readonly gameInput = inject(GameInputService);

  protected readonly consoleStartButton = signal(false)
  private inactivityTimer?: ReturnType<typeof setTimeout>;

  setConsoleButtonSquare() {
    this.consoleStartButton.set(true);
    this.resetInactivityTimer();
  }

  setConsoleButtonCircle(): void {
    this.consoleStartButton.set(false);
    this.resetInactivityTimer();

  }

  onKeyDown(event: KeyboardEvent): void{
    const button = keymap[event.key]
    if (!button) return;
    event.preventDefault();

    if (event.repeat) return;

    this.gameInput.press(button);
    this.resetInactivityTimer();
  }

  onKeyUp(event: KeyboardEvent): void{
    const button = keymap[event.key]
    if(!button) return;

    event.preventDefault();
    this.gameInput.release(button);
    this.resetInactivityTimer();
  }





  resetInactivityTimer(): void {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(() => {
      this.consoleStartButton.set(false);
    }, 2 * 60 * 1000);
  }



}
