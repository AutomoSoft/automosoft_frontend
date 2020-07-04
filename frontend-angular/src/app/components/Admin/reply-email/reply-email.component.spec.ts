import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyEmailComponent } from './reply-email.component';

describe('ReplyEmailComponent', () => {
  let component: ReplyEmailComponent;
  let fixture: ComponentFixture<ReplyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
