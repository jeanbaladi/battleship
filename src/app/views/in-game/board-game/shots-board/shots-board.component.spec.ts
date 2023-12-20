import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotsBoardComponent } from './shots-board.component';

describe('ShotsBoardComponent', () => {
  let component: ShotsBoardComponent;
  let fixture: ComponentFixture<ShotsBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShotsBoardComponent]
    });
    fixture = TestBed.createComponent(ShotsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
