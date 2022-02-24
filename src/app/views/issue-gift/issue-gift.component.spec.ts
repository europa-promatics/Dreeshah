import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueGiftComponent } from './issue-gift.component';

describe('IssueGiftComponent', () => {
  let component: IssueGiftComponent;
  let fixture: ComponentFixture<IssueGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
