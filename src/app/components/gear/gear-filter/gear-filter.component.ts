import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { Areas } from '../../../interfaces/models/areas.model';
import {Gear} from '../../../interfaces/models/gear.model';
import {GearService} from '../../../services/gear.service';
import {filter, take} from 'rxjs';

@Component({
  selector: 'app-gear-filter',
  standalone: false,

  templateUrl: './gear-filter.component.html',
  styleUrl: './gear-filter.component.scss'
})
export class GearFilterComponent implements AfterViewInit{
  selectedOption: string = '';
  areas : Areas[] =  []
  allGears: Gear[] = []
  filteredGears: Gear[] = []
  constructor(private areasService: AreasService,
    private gearService: GearService){
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    if(option === "All"){
      this.filteredGears = this.allGears
    }else{
      this.filteredGears = this.allGears.filter(gear => {
        return gear.areaAssigned === option
      })
    }
    this.gearService.updateList(this.filteredGears)
  }

  ngAfterViewInit(): void {
    this.areasService.list$.subscribe((areas:Areas[]) => {
      this.areas = areas;
    });
    this.gearService.list$
      .pipe(
        filter((gears) => gears.length > 0), // Solo se ejecuta cuando hay datos
        take(1) // Se desuscribe después de recibir la primera lista válida
      )
      .subscribe((gears: Gear[]) => {
        this.allGears = gears;
      });
  }
}
