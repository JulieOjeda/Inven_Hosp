import {Component, Input} from '@angular/core';
import {Areas} from '../../../interfaces/models/areas.model';
import {AreasService} from '../../../services/areas.service';
import {AreaApiService} from '../../../api/area.api.service';

@Component({
  selector: 'app-areas-board',
  standalone: false,

  templateUrl: './areas-board.component.html',
  styleUrl: './areas-board.component.scss'
})
export class AreasBoardComponent {
  areas : Areas[] = []
  constructor(private areaService: AreasService,
    private  areaApìService: AreaApiService) {
    areaService.list$.subscribe((areas: Areas[]) =>{
     this.areas = areas;
    })
  }
}
