import { ComponentFixture, TestBed } from '@angular/core/testing';

import { URequestComponent } from './u-request.component';

describe('URequestComponent', () => {
  let component: URequestComponent;
  let fixture: ComponentFixture<URequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ URequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(URequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
