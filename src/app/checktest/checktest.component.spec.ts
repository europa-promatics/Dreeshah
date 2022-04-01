import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecktestComponent } from './checktest.component';

describe('ChecktestComponent', () => {
  let component: ChecktestComponent;
  let fixture: ComponentFixture<ChecktestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecktestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecktestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
