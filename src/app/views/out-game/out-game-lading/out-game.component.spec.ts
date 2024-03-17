import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutGameComponent } from './out-game.component';

describe('OutGameComponent', () => {
  let component: OutGameComponent;
  let fixture: ComponentFixture<OutGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutGameComponent]
    });
    fixture = TestBed.createComponent(OutGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
