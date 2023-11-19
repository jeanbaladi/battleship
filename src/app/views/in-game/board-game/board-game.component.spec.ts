import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameComponent } from './board-game.component';

describe('BoardGameComponent', () => {
  let component: BoardGameComponent;
  let fixture: ComponentFixture<BoardGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardGameComponent]
    });
    fixture = TestBed.createComponent(BoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
