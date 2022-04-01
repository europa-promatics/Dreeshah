import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerdiscountsComponent } from './sellerdiscounts.component';

describe('SellerdiscountsComponent', () => {
  let component: SellerdiscountsComponent;
  let fixture: ComponentFixture<SellerdiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerdiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerdiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
