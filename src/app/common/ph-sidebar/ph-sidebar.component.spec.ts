import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhSidebarComponent } from './ph-sidebar.component';

describe('PhSidebarComponent', () => {
  let component: PhSidebarComponent;
  let fixture: ComponentFixture<PhSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
