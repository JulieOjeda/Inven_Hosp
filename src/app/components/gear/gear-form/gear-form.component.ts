import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GearService } from '../../../api/gear.api.service';
import { Router } from '@angular/router';
import { Gear } from '../../../interfaces/models/gear.model';

@Component({
  selector: 'app-gear-form',
  standalone: false,
  
  templateUrl: './gear-form.component.html',
  styleUrl: './gear-form.component.scss'
})
export class GearFormComponent {
  deviceForm: FormGroup;

  constructor(private _gearService: GearService,
    private _router:Router
  ) {
    this.deviceForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      deviceModel: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      serialNumber: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      manufacturer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      manufacturingYear: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]),
      classification: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      weight: new FormControl('', [Validators.required, Validators.min(0)]),
      screenType: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      screenResolution: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      parametersMonitored: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      powerSupply: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      battery: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      connectivity: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      alarms: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      accessoriesIncluded: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      applicableStandards: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      warranty: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      createdAt: new FormControl(''),
      updatedAt: new FormControl('')
    });
  }

  ngOnInit(): void {}

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.deviceForm.valid) {
      this._gearService.createGear(this.deviceForm.value).subscribe((gear: Gear)=>{
        this._router.navigate(['/gear/'+ gear._id], {state: {gear: gear}});
      })
    } else {
      console.log('Formulario no válido');
    }
  }
}
