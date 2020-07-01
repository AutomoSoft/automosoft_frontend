import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTechniciansComponent } from './view-technicians.component';

describe('ViewTechniciansComponent', () => {
  let component: ViewTechniciansComponent;
  let fixture: ComponentFixture<ViewTechniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTechniciansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
