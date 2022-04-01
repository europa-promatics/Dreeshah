import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleProjectListComponent } from './view-single-project-list.component';

describe('ViewSingleProjectListComponent', () => {
  let component: ViewSingleProjectListComponent;
  let fixture: ComponentFixture<ViewSingleProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
