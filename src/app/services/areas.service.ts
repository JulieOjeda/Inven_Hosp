import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Areas } from '../interfaces/models/areas.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService extends BaseService<Areas>{
areas: Areas[]
  constructor(){
    super()
    this.areas = [
        {
            itemsCount : 1,
            createdAt : new Date(),
            name : "Emergency"
        },
        {
            itemsCount : 25,
            createdAt : new Date(),
            name : "Quirofano"
        },
        {
            itemsCount : 255,
            createdAt : new Date(),
            name : "Pediatria"
        }
    ]
    this.updateList(this.areas)
  }
}
