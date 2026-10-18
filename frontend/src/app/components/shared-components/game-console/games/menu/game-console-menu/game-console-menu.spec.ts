import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConsoleMenu } from './game-console-menu';

describe('GameConsoleMenu', () => {
  let component: GameConsoleMenu;
  let fixture: ComponentFixture<GameConsoleMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameConsoleMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(GameConsoleMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
