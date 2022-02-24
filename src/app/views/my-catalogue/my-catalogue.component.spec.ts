import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCatalogueComponent } from './my-catalogue.component';

describe('MyCatalogueComponent', () => {
  let component: MyCatalogueComponent;
  let fixture: ComponentFixture<MyCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
