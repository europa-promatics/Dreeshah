import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantDashboardComponent } from './consultant-dashboard.component';

describe('ConsultantDashboardComponent', () => {
  let component: ConsultantDashboardComponent;
  let fixture: ComponentFixture<ConsultantDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
