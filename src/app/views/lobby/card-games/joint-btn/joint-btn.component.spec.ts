import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointBtnComponent } from './joint-btn.component';

describe('JointBtnComponent', () => {
  let component: JointBtnComponent;
  let fixture: ComponentFixture<JointBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JointBtnComponent]
    });
    fixture = TestBed.createComponent(JointBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
