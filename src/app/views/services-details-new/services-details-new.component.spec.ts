import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesDetailsNewComponent } from './services-details-new.component';

describe('ServicesDetailsNewComponent', () => {
  let component: ServicesDetailsNewComponent;
  let fixture: ComponentFixture<ServicesDetailsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesDetailsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesDetailsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
