import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerBranchComponent } from './photographer-branch.component';

describe('PhotographerBranchComponent', () => {
  let component: PhotographerBranchComponent;
  let fixture: ComponentFixture<PhotographerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
