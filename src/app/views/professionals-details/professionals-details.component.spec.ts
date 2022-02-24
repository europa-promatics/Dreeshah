import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalsDetailsComponent } from './professionals-details.component';

describe('ProfessionalsDetailsComponent', () => {
  let component: ProfessionalsDetailsComponent;
  let fixture: ComponentFixture<ProfessionalsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessionalsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
