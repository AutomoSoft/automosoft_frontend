import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectJobStatusComponent } from './select-job-status.component';

describe('SelectJobStatusComponent', () => {
  let component: SelectJobStatusComponent;
  let fixture: ComponentFixture<SelectJobStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectJobStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectJobStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
