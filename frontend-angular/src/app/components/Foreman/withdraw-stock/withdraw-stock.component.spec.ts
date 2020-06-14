import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawStockComponent } from './withdraw-stock.component';

describe('WithdrawStockComponent', () => {
  let component: WithdrawStockComponent;
  let fixture: ComponentFixture<WithdrawStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
