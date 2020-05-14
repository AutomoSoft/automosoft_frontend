import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplierComponent } from './register-supplier.component';

describe('RegisterUserComponent', () => {
  let component: RegisterSupplierComponent;
  let fixture: ComponentFixture<RegisterSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
