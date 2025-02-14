import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GearApiService} from '../../../api/gear.api.service';
import { Router } from '@angular/router';
import { Gear } from '../../../interfaces/models/gear.model';
import {OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-gear-form',
  standalone: false,

  templateUrl: './gear-form.component.html',
  styleUrl: './gear-form.component.scss'
})
export class GearFormComponent implements OnInit{
  currentStep = 0;
  steps : {
    title: string,
    form: FormGroup
  }[]

  // Configuración para el Slick Carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,  // Habilita el arrastre con el mouse
    touchDrag: true,  // Habilita el arrastre táctil
    pullDrag: true,   // Habilita el arrastre al deslizar
    dots: false,      // Oculta los puntos de navegación
    navSpeed: 700,    // Velocidad de la navegación
    navText: ['<', '>'],  // Texto para los botones de navegación
    responsive: {
      0: {
        items: 1  // Solo muestra 1 elemento en pantallas pequeñas
      },
      600: {
        items: 1  // Solo muestra 1 elemento en pantallas medianas
      },
      1000: {
        items: 1  // Solo muestra 1 elemento en pantallas grandes
      }
    },
    nav: true  // Muestra los botones de navegación
  };
  public generalInfo : FormGroup
  public technicalInfo: FormGroup
  public lifeInformation: FormGroup
  public additionalInfo: FormGroup
  constructor(private _gearService: GearApiService,
    private _router:Router
  ) {
    this.generalInfo = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      deviceModel: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      areaAssigned : new FormControl('', [Validators.required, Validators.maxLength(50)]),
      manufacturer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description:  new FormControl('', [Validators.required, Validators.maxLength(100)]),
    })

    this.technicalInfo = new FormGroup({
      screenResolution: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      powerSupply: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      weight: new FormControl('', [Validators.required, Validators.min(0)]),
      connectivity: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    })

    this.additionalInfo = new FormGroup({
      manufacturingYear: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]),
      warranty: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      extraData: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      photo: new FormControl(''),
    })

    this.lifeInformation = new FormGroup({
      startingDate: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]),
      descriptionMaintenance : new FormControl('', [Validators.required, Validators.maxLength(100)]),
      responsible : new FormControl('', [Validators.required, Validators.maxLength(50)]),
    })

    this.steps = [
      { title: 'General Information', form: this.generalInfo },
      { title: 'Technical Information', form: this.technicalInfo },
      { title: 'Additional Information', form: this.additionalInfo },
      { title: 'Life Information', form: this.lifeInformation },
    ];
  }

  ngOnInit(): void {
    console.log("steps to take", this.steps)
  }

  onSubmit(): void {
    debugger
    if (this.isFormValid()) {
      const data = {
        ...this.generalInfo.value,
        ...this.technicalInfo.value,
        ...this.additionalInfo.value,
        ...this.lifeInformation.value
      };
      this._gearService.createGear(data).subscribe((gear: Gear)=>{
        this._router.navigate(['/gear/'+ gear.serialNumber], {state: {gear: gear}});
      })
    } else {
      console.log('Formulario no válido');
    }
  }

  isFormValid(){
    return this.lifeInformation.valid && this.additionalInfo.valid && this.technicalInfo.valid && this.generalInfo.valid
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      console.log("Imagen seleccionada: ", file.name);
    }
  }

  getControlType(controlName: any): string {
    switch (controlName) {
      case 'weight':
        return 'number';
      case 'startingDate':
        return 'date';
      case 'photo':
        return 'file';
      default:
        return 'text';
    }
  }

  getControls(form: FormGroup): string[] {
    return Object.keys(form.controls);
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Navegar al siguiente paso
  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
}
