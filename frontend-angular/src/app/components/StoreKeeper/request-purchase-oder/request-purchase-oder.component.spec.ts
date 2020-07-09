import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPurchaseOderComponent } from './request-purchase-oder.component';

describe('RequestPurchaseOderComponent', () => {
  let component: RequestPurchaseOderComponent;
  let fixture: ComponentFixture<RequestPurchaseOderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPurchaseOderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPurchaseOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
