import { Component } from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { Areas } from '../../../interfaces/models/areas.model';

@Component({
  selector: 'app-gear-filter',
  standalone: false,
  
  templateUrl: './gear-filter.component.html',
  styleUrl: './gear-filter.component.scss'
})
export class GearFilterComponent {
  selectedOption: string = '';
  areas : Areas[] =  []
  
  constructor(private areasService: AreasService){
    this.areasService.list$.subscribe(areas => {
      this.areas = areas;
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
