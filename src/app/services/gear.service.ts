// src/app/services/gear.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'; // Importamos Router
import { Gear } from '../interfaces/models/gear.model';

@Injectable({
  providedIn: 'root'
})
export class GearService {
  private gearSource = new BehaviorSubject<Gear | null>(null); // Estado con los datos
  gear$ = this.gearSource.asObservable();

  constructor(private router: Router) { }

  // Método para actualizar los datos del equipo y navegar
  updateGear(gear: Gear): void {
    this.gearSource.next(gear); // Actualizamos el estado

    // Navegar a una nueva ruta
    this.router.navigate(['/success']); // Reemplaza '/success' con la ruta a la que quieras ir
  }
}
