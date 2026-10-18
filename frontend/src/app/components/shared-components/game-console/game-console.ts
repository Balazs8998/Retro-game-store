import {Component, inject, signal} from '@angular/core';
import {GameInputService} from '../../../services/console-games/snake/game-input-service';
import {GameConsoleMenu} from './games/menu/game-console-menu/game-console-menu';
import {ConsoleMenuAction} from './types/console-menu-action';
import {SnakeGame} from './games/snake-game/snake-game';
import {KeyBindingService} from '../../../services/console-games/snake/key-binding-service';

type ConsoleViewType = 'Idle' | 'Menu' | ConsoleMenuAction

@Component({
  selector: 'app-game-console',
  imports: [
    GameConsoleMenu,
    SnakeGame
  ],
  templateUrl: './game-console.html',
  styleUrl: './game-console.css',
})
export class GameConsole {

  protected readonly gameInput = inject(GameInputService);
  private readonly keybindingService = inject(KeyBindingService);
  protected readonly consoleView = signal<ConsoleViewType>('Idle')

  private inactivityTimer?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    this.keybindingService.generateReverseKeyBindingMap();
  }

  setConsoleButtonMenu(): void {
    this.consoleView.set('Menu')
    this.resetInactivityTimer();
  }

  exitGame(){
    this.consoleView.set("Menu");
  }

  shutDown(){
    this.consoleView.set('Idle')
  }
  runGame(game:ConsoleMenuAction){
    this.consoleView.set(game)
  }

  onKeyDown(event: KeyboardEvent): void{
    const keyCode = event.code;
    const button = this.keybindingService.searchButton(keyCode)
    if (!button) return;
    event.preventDefault();

    if (event.repeat) return;

    this.gameInput.press(button);
    this.resetInactivityTimer();
  }

  onKeyUp(event: KeyboardEvent): void{
    const keyCode = event.code;
    const button = this.keybindingService.searchButton(keyCode)
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
      this.consoleView.set('Idle');
    }, 2 * 60 * 1000);
  }



}
