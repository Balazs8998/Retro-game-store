import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeMenu } from './snake-menu';

describe('SnakeMenu', () => {
  let component: SnakeMenu;
  let fixture: ComponentFixture<SnakeMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
