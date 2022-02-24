import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantPrivelegeComponent } from './grant-privelege.component';

describe('GrantPrivelegeComponent', () => {
  let component: GrantPrivelegeComponent;
  let fixture: ComponentFixture<GrantPrivelegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantPrivelegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantPrivelegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
