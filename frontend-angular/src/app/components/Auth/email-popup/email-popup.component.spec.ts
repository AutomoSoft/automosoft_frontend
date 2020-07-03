import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPopupComponent } from './email-popup.component';

describe('EmailPopupComponent', () => {
  let component: EmailPopupComponent;
  let fixture: ComponentFixture<EmailPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
