import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWithdrawalPopupComponent } from './stock-withdrawal-popup.component';

describe('StockWithdrawalPopupComponent', () => {
  let component: StockWithdrawalPopupComponent;
  let fixture: ComponentFixture<StockWithdrawalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockWithdrawalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockWithdrawalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
