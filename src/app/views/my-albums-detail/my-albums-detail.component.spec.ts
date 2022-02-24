import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAlbumsDetailComponent } from './my-albums-detail.component';

describe('MyAlbumsDetailComponent', () => {
  let component: MyAlbumsDetailComponent;
  let fixture: ComponentFixture<MyAlbumsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAlbumsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAlbumsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
