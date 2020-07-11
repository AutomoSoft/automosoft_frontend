import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderRequestsComponent } from './purchase-order-requests.component';

describe('PurchaseOrderRequestsComponent', () => {
  let component: PurchaseOrderRequestsComponent;
  let fixture: ComponentFixture<PurchaseOrderRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
