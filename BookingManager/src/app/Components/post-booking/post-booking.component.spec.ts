import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBookingComponent } from './post-booking.component';

describe('PostBookingComponent', () => {
  let component: PostBookingComponent;
  let fixture: ComponentFixture<PostBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
