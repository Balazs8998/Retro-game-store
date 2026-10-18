import { Injectable, signal } from '@angular/core';
import {ConsoleButton} from '../../../components/shared-components/game-console/types/console-button';

@Injectable({ providedIn: 'root' })
export class GameInputService {

  private readonly _pressedButtons = signal<Set<ConsoleButton>>(new Set());


  press(button: ConsoleButton): void {
    this._pressedButtons.update(previous => {
      const next = new Set(previous);
      next.add(button);
      return next;
    });

  }

  release(button: ConsoleButton): void {
    this._pressedButtons.update(previous => {
      const next = new Set(previous);
      next.delete(button);
      return next;
    });

  }

  isPressed(button: ConsoleButton): boolean {
    return this._pressedButtons().has(button)
  }
}
