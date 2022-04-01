import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerBoughtPackagesComponent } from './photographer-bought-packages.component';

describe('PhotographerBoughtPackagesComponent', () => {
  let component: PhotographerBoughtPackagesComponent;
  let fixture: ComponentFixture<PhotographerBoughtPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerBoughtPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerBoughtPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
