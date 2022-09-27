import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmPrestamoComponent } from './fm-prestamo.component';

describe('FmPrestamoComponent', () => {
  let component: FmPrestamoComponent;
  let fixture: ComponentFixture<FmPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmPrestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
