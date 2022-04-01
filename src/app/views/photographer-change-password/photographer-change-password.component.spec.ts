import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerChangePasswordComponent } from './photographer-change-password.component';

describe('PhotographerChangePasswordComponent', () => {
  let component: PhotographerChangePasswordComponent;
  let fixture: ComponentFixture<PhotographerChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
