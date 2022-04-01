import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryImageDetailComponent } from './category-image-detail.component';

describe('CategoryImageDetailComponent', () => {
  let component: CategoryImageDetailComponent;
  let fixture: ComponentFixture<CategoryImageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryImageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryImageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
