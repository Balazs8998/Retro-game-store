import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameConsole } from './game-console';

describe('GameConsole', () => {
  let component: GameConsole;
  let fixture: ComponentFixture<GameConsole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameConsole],
    }).compileComponents();

    fixture = TestBed.createComponent(GameConsole);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
