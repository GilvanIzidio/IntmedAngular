import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaConsultaDialog } from './nova-consulta.dialog';

describe('NovaConsultaDialog', () => {
  let component: NovaConsultaDialog;
  let fixture: ComponentFixture<NovaConsultaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaConsultaDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaConsultaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
