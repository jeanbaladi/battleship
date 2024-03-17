import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLandingComponent } from './profile-landing.component';

describe('ProfileLandingComponent', () => {
  let component: ProfileLandingComponent;
  let fixture: ComponentFixture<ProfileLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLandingComponent]
    });
    fixture = TestBed.createComponent(ProfileLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
