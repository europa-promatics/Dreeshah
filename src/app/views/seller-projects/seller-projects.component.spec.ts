import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerProjectsComponent } from './seller-projects.component';

describe('SellerProjectsComponent', () => {
  let component: SellerProjectsComponent;
  let fixture: ComponentFixture<SellerProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
