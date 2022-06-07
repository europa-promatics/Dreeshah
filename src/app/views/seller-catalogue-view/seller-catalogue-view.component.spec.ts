import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCatalogueViewComponent } from './seller-catalogue-view.component';

describe('SellerCatalogueViewComponent', () => {
  let component: SellerCatalogueViewComponent;
  let fixture: ComponentFixture<SellerCatalogueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCatalogueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCatalogueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
