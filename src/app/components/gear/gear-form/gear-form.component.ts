import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GearApiService} from '../../../api/gear.api.service';
import { Router } from '@angular/router';
import { Gear } from '../../../interfaces/models/gear.model';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {AreasService} from '../../../services/areas.service';
import {Areas} from '../../../interfaces/models/areas.model';
import {AreaApiService} from '../../../api/area.api.service';
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
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  areas: Areas[] = []
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
  label = new Map<string, string>();
  labels = ["nombre", "modelo de dispositivo", "numero de serie", "area", "fabricante", "descripcion", "resolucion", "fuente de energia", "tamaño", "conectivida", "año de fabricacion", "garantia", "datos extras", "Imagen","fecha de puesta en marcha", "descripcion para mantenimiento", "responsable" ]
  selectedArea: string = "";
  constructor(private _gearService: GearApiService,
    private _router:Router,
    private areasService: AreasService,
    private areaApiService: AreaApiService
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
      { title: 'Informacion General', form: this.generalInfo },
      { title: 'Informacion Tecnica', form: this.technicalInfo },
      { title: 'Informacion Adicional', form: this.additionalInfo },
      { title: 'Hoja de Vida', form: this.lifeInformation },
    ];
    const data: Gear = {
      ...this.generalInfo.value,
      ...this.technicalInfo.value,
      ...this.additionalInfo.value,
      ...this.lifeInformation.value
    };
    const gearKeys = Object.keys(data) as (keyof Gear)[];
    gearKeys.forEach(key => {
      this.label.set(key, ``);
    });
    let index = 0;
    this.label.forEach((value, key) => {
      this.label.set(key, this.labels[index])
      index++;
    });
    this.areasService.list$.subscribe( (areas: Areas[])=>{
      this.areas = areas
    })
  }

  ngOnInit(): void {
    console.log("steps to take", this.steps)
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const data = {
        ...this.generalInfo.value,
        ...this.technicalInfo.value,
        ...this.additionalInfo.value,
        ...this.lifeInformation.value
      };
      this._gearService.createGear(data).subscribe((gear: Gear)=>{
        this._router.navigate(['board/gear/'+ gear._id]);
      })
    } else {
      console.log('Formulario no válido');
    }
  }

  isFormValid(){
    return this.lifeInformation.valid && this.additionalInfo.valid && this.technicalInfo.valid && this.generalInfo.valid
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Previsualización de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Crear FormData para enviar al backend
      const formData = new FormData();
      formData.append('file', file);

      // Enviar la imagen al backend
      this._gearService.sendImage(formData).subscribe( data => {
        this.additionalInfo.get('photo')?.setValue(data.file.filename); // Asignar el ID al formulario
      })
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

  getLabel(controlName: any) : string | undefined {
    return this.label.get(controlName)
  }

  onAreaSelected(value: string) {
    this.selectedArea = value; // Guardar selección
  }

  addNewArea(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newAreaName = inputElement.value.trim();

    let newArea = {
      itemsCount : 0,
      createdAt : new Date(),
      name : newAreaName
    };
    if (newArea && !this.areas.map( area => {return area.name} ).includes(newAreaName)) {
      this.areaApiService.createArea( newArea).subscribe( (response) =>{
        this.areasService.addItemToList(response)
      })
      this.generalInfo.get('areaAssigned')?.setValue(newArea.name); // Establecer el valor en el formulario
    }

    inputElement.value = ''; // Limpiar input
  }
}
