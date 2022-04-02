import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADocumentTypesComponent } from './a-document-types.component';

describe('ADocumentTypesComponent', () => {
  let component: ADocumentTypesComponent;
  let fixture: ComponentFixture<ADocumentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADocumentTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
