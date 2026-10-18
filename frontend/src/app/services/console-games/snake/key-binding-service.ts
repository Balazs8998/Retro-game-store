import {Injectable} from '@angular/core';
import {ConsoleButton} from '../../../components/shared-components/game-console/types/console-button';

@Injectable({
  providedIn: 'root'
})

export class KeyBindingService {

  keyBindingMap = new Map<ConsoleButton, string[]>([
    ['up', ['ArrowUp', 'KeyW']],
    ['down', ['ArrowDown', 'KeyS']],
    ['left', ['ArrowLeft', 'KeyA']],
    ['right', ['ArrowRight', 'KeyD']],
    ['center', ['Space']],
    ['cross', ['KeyP']],
    ['circle', ['KeyO']],
    ['triangle', ['KeyU']],
    ['square', ['KeyI']],
    ['menu', ['KeyM']],
    ['select', ['Enter']]
  ])

  keyCodeToButtonMap = new Map<string, ConsoleButton>();

  generateReverseKeyBindingMap():void{
    this.keyCodeToButtonMap.clear();
    for(const [button,codes] of this.keyBindingMap.entries()){
      for(const code of codes){
        this.keyCodeToButtonMap.set(code,button);
      }
    }
  }

  searchButton(keyCode: string): ConsoleButton | undefined {
    return this.keyCodeToButtonMap.get(keyCode);
  }

  getKeyCode(button: ConsoleButton): string[]  {
    const nonFormatedKeys: string[] | undefined = this.keyBindingMap.get(button);
    let formatedKeys: string[] | undefined = []

    if (nonFormatedKeys != undefined) {
      for (const nonFormatedKey of nonFormatedKeys) {
      formatedKeys.push(this.formatKey(nonFormatedKey))
      }
    }


    return formatedKeys;
  }

  formatKey(button: string): string {
    if (button.startsWith('Key')) {
      return button.replace('Key', '');
    }

    if (button === 'ArrowUp') return '↑';
    if (button === 'ArrowDown') return '↓';
    if (button === 'ArrowLeft') return '←';
    if (button === 'ArrowRight') return '→';

    return button;
  }

}
