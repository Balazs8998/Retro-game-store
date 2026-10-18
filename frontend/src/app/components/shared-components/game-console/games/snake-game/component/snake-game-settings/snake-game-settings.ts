import {Component, effect, inject, output, signal} from '@angular/core';
import {KeyBindingService} from '../../../../../../../services/console-games/snake/key-binding-service';
import {GameInputService} from '../../../../../../../services/console-games/snake/game-input-service';

type settingMenu = 'Menu' | 'Controls' | 'Gameplay' | 'Back'

@Component({
  selector: 'app-snake-game-settings',
  imports: [],
  templateUrl: './snake-game-settings.html',
  styleUrl: './snake-game-settings.css',
})
export class SnakeGameSettings {

  protected readonly keyBindingService = inject(KeyBindingService);
  private readonly consoleInput = inject(GameInputService)
  private i: number = 0;

  backOutput = output();

  menus: settingMenu[] = ['Controls', 'Gameplay', 'Back']
  selectedMenu = signal<settingMenu>('Controls')
  menuView = signal<settingMenu>('Menu')

  constructor() {
    effect(() => {
      if (this.consoleInput.isPressed('down')) {
        this.consoleInput.release('down')
        this.i += 1;
        if (this.i >= this.menus.length) {
          this.i = 0
        }
        this.selectedMenu.set(this.menus[this.i])
      }
      if (this.consoleInput.isPressed('up')) {
        this.consoleInput.release('up')

        this.i -= 1;
        if (this.i < 0) {
          this.i = this.menus.length - 1;
        }
        this.selectedMenu.set(this.menus[this.i])
      }
      if (this.consoleInput.isPressed('select')) {
        this.consoleInput.release('select')
        if (this.selectedMenu() === 'Back') {
          this.outputBack();
        }
      }

    });

  }

  outputBack() {
    this.backOutput.emit();
  }

}
