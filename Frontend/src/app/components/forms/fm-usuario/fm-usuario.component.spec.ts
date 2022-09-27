import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmUsuarioComponent } from './fm-usuario.component';

describe('FmUsuarioComponent', () => {
  let component: FmUsuarioComponent;
  let fixture: ComponentFixture<FmUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
