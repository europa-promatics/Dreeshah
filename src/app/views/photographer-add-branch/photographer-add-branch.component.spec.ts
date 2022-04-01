import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerAddBranchComponent } from './photographer-add-branch.component';

describe('PhotographerAddBranchComponent', () => {
  let component: PhotographerAddBranchComponent;
  let fixture: ComponentFixture<PhotographerAddBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerAddBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerAddBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
