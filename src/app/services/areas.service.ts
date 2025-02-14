import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base.service';
import { Areas } from '../interfaces/models/areas.model';
import {AreaApiService} from '../api/area.api.service';

@Injectable({
  providedIn: 'root'
})
export class AreasService extends BaseService<Areas>{
  constructor(private areaApiService: AreaApiService){
    super()
    this.areaApiService.getArea().subscribe( (areas: Areas[]) =>{
      this.updateList(areas)
    })
  }
}
