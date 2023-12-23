import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShootsBoardComponent } from './shots-board.component';

describe('ShotsBoardComponent', () => {
  let component: ShootsBoardComponent;
  let fixture: ComponentFixture<ShootsBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShootsBoardComponent]
    });
    fixture = TestBed.createComponent(ShootsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
