import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionComponent } from './inscripcion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InscripcionComponent', () => {
  let component: InscripcionComponent;
  let fixture: ComponentFixture<InscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InscripcionComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Performance of getLicenciaName', () => {
    it('benchmark getLicenciaName', () => {
      const start = performance.now();
      const iterations = 10000;
      for (let i = 0; i < iterations; i++) {
        component.getLicenciaName('c_inf_fedme');
      }
      const end = performance.now();
      console.log(`Time taken for ${iterations} calls to getLicenciaName: ${end - start} ms`);
    });
  });

  describe('Performance of getLicenciaPrice', () => {
    it('benchmark getLicenciaPrice', () => {
      component.licenciaForm.get('licenciaElegida')?.setValue('c_inf_fedme');
      const start = performance.now();
      const iterations = 10000;
      for (let i = 0; i < iterations; i++) {
        component.getLicenciaPrice();
      }
      const end = performance.now();
      console.log(`Time taken for ${iterations} calls to getLicenciaPrice: ${end - start} ms`);
    });
  });
});
