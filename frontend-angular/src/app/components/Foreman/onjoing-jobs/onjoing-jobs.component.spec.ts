import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnjoingJobsComponent } from './onjoing-jobs.component';

describe('OnjoingJobsComponent', () => {
  let component: OnjoingJobsComponent;
  let fixture: ComponentFixture<OnjoingJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnjoingJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnjoingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
