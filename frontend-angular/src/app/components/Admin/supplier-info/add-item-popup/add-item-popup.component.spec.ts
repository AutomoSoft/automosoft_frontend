import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemPopupComponent } from './add-item-popup.component';

describe('AddItemPopupComponent', () => {
  let component: AddItemPopupComponent;
  let fixture: ComponentFixture<AddItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
