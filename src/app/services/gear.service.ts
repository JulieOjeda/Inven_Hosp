// src/app/services/gear.service.ts
import { Injectable } from '@angular/core';
import { Gear } from '../interfaces/models/gear.model';
import { BaseService } from '../shared/services/base.service';
import { GearApiService } from '../api/gear.api.service';

@Injectable({
  providedIn: 'root'
})
export class GearService extends BaseService<Gear>{
  constructor(private apiGearService : GearApiService){
    super()
    this.apiGearService.getGears().subscribe((list : Gear[])=>{
      console.log("receive from backend", list)
      this.updateList(list)
    })
  }
}
