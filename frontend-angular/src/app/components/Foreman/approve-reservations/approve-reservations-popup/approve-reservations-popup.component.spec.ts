import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReservationsPopupComponent } from './approve-reservations-popup.component';

describe('ApproveReservationsPopupComponent', () => {
  let component: ApproveReservationsPopupComponent;
  let fixture: ComponentFixture<ApproveReservationsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveReservationsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveReservationsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
