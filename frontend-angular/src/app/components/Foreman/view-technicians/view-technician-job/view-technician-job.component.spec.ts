import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTechnicianJobComponent } from './view-technician-job.component';

describe('ViewTechnicianJobComponent', () => {
  let component: ViewTechnicianJobComponent;
  let fixture: ComponentFixture<ViewTechnicianJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTechnicianJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTechnicianJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
