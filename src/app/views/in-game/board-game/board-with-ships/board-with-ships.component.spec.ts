import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardWithShipsComponent } from './board-with-ships.component';

describe('BoardWithShipsComponent', () => {
  let component: BoardWithShipsComponent;
  let fixture: ComponentFixture<BoardWithShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardWithShipsComponent]
    });
    fixture = TestBed.createComponent(BoardWithShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
