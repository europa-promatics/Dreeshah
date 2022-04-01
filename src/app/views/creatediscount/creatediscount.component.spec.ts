import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatediscountComponent } from './creatediscount.component';

describe('CreatediscountComponent', () => {
  let component: CreatediscountComponent;
  let fixture: ComponentFixture<CreatediscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatediscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatediscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
