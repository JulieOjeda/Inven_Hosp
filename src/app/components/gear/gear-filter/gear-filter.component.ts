import {AfterViewInit, Component, OnInit} from '@angular/core';
import { AreasService } from '../../../services/areas.service';
import { Areas } from '../../../interfaces/models/areas.model';
import {Gear} from '../../../interfaces/models/gear.model';
import {GearService} from '../../../services/gear.service';
import {filter, take} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gear-filter',
  standalone: false,

  templateUrl: './gear-filter.component.html',
  styleUrl: './gear-filter.component.scss'
})
export class GearFilterComponent implements OnInit {
  selectedOption: string = 'all';
  areas: Areas[] = [];
  allGears: Gear[] = [];
  filteredGears: Gear[] = [];

  constructor(
    private areasService: AreasService,
    private gearService: GearService,
    private route : ActivatedRoute
  ) {}

  selectOption(option: string): void {
    this.selectedOption = option;
    this.filteredGears =
      option === 'all'
        ? this.allGears
        : this.allGears.filter((gear) => gear.areaAssigned === option);
    this.gearService.updateList(this.filteredGears);
  }

  ngOnInit(): void {
    // Ahora las suscripciones ocurren antes del chequeo de Angular
    this.areasService.list$.subscribe((areas: Areas[]) => {
      this.areas = areas;
    });

    this.gearService.list$
      .pipe(
        filter((gears) => gears.length > 0), // Solo si hay datos
        take(1) // Se desuscribe después de recibir la primera lista válida
      )
      .subscribe((gears: Gear[]) => {
        this.allGears = gears;
      });

    this.route.queryParamMap.subscribe(params => {
      this.selectedOption = params.get('filter')+ "";
    });
  }
}
