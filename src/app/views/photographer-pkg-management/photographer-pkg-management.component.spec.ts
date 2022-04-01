import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerPkgManagementComponent } from './photographer-pkg-management.component';

describe('PhotographerPkgManagementComponent', () => {
  let component: PhotographerPkgManagementComponent;
  let fixture: ComponentFixture<PhotographerPkgManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerPkgManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerPkgManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
