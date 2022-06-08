import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCatalogueComponent } from './seller-catalogue.component';

describe('SellerCatalogueComponent', () => {
  let component: SellerCatalogueComponent;
  let fixture: ComponentFixture<SellerCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
