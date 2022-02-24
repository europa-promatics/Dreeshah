import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueDesigningComponent } from './catalogue-designing.component';

describe('CatalogueDesigningComponent', () => {
  let component: CatalogueDesigningComponent;
  let fixture: ComponentFixture<CatalogueDesigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueDesigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueDesigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
