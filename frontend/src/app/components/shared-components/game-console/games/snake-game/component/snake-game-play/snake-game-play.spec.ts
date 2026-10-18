import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGamePlay } from './snake-game-play';

describe('SnakeGame', () => {
  let component: SnakeGamePlay;
  let fixture: ComponentFixture<SnakeGamePlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGamePlay],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeGamePlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
