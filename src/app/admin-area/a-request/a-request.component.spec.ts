import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ARequestComponent } from './a-request.component';

describe('ARequestComponent', () => {
  let component: ARequestComponent;
  let fixture: ComponentFixture<ARequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ARequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ARequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
