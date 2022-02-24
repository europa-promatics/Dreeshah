import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerUpdatePasswordComponent } from './photographer-update-password.component';

describe('PhotographerUpdatePasswordComponent', () => {
  let component: PhotographerUpdatePasswordComponent;
  let fixture: ComponentFixture<PhotographerUpdatePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerUpdatePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
