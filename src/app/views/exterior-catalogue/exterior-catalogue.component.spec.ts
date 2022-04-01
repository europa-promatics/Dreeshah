import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteriorCatalogueComponent } from './exterior-catalogue.component';

describe('ExteriorCatalogueComponent', () => {
  let component: ExteriorCatalogueComponent;
  let fixture: ComponentFixture<ExteriorCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExteriorCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExteriorCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
