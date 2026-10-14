import { Injectable, signal } from '@angular/core';
import {GameButton} from '../../../components/shared-components/game-console/types/game-button';

@Injectable({ providedIn: 'root' })
export class GameInputService {

  private readonly _pressedButtons = signal<Set<GameButton>>(new Set());


  press(button: GameButton): void {
    this._pressedButtons.update(previous => {
      const next = new Set(previous);
      next.add(button);
      return next;
    });

  }

  release(button: GameButton): void {
    this._pressedButtons.update(previous => {
      const next = new Set(previous);
      next.delete(button);
      return next;
    });

  }

  isPressed(button: GameButton): boolean {
    return this._pressedButtons().has(button)
  }


}
