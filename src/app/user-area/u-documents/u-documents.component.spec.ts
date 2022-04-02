import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UDocumentsComponent } from './u-documents.component';

describe('UDocumentsComponent', () => {
  let component: UDocumentsComponent;
  let fixture: ComponentFixture<UDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
