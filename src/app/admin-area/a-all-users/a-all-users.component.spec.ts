import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AAllUsersComponent } from './a-all-users.component';

describe('AAllUsersComponent', () => {
  let component: AAllUsersComponent;
  let fixture: ComponentFixture<AAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AAllUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
