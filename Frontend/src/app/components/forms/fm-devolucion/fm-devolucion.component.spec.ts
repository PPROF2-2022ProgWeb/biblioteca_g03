import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmDevolucionComponent } from './fm-devolucion.component';

describe('FmDevolucionComponent', () => {
  let component: FmDevolucionComponent;
  let fixture: ComponentFixture<FmDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmDevolucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
