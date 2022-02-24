import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSidebarComponent } from './consultant-sidebar.component';

describe('ConsultantSidebarComponent', () => {
  let component: ConsultantSidebarComponent;
  let fixture: ComponentFixture<ConsultantSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
