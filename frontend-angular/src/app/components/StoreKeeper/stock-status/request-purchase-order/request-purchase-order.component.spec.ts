import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPurchaseOrderComponent } from './request-purchase-order.component';

describe('RequestPurchaseOrderComponent', () => {
  let component: RequestPurchaseOrderComponent;
  let fixture: ComponentFixture<RequestPurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
