import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeraddressComponent } from './photographeraddress.component';

describe('PhotographeraddressComponent', () => {
  let component: PhotographeraddressComponent;
  let fixture: ComponentFixture<PhotographeraddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographeraddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographeraddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
