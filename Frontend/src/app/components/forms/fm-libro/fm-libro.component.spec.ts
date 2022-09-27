import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmLibroComponent } from './fm-libro.component';

describe('FmLibroComponent', () => {
  let component: FmLibroComponent;
  let fixture: ComponentFixture<FmLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
