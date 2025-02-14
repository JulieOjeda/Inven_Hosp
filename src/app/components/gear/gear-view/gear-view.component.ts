import {Component, Input, OnInit} from '@angular/core';
import { Gear } from '../../../interfaces/models/gear.model';
import {GearApiService} from '../../../api/gear.api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gear-view',
  standalone: false,
  templateUrl: './gear-view.component.html',
  styleUrl: './gear-view.component.scss'
})
export class GearViewComponent implements OnInit{
  @Input() gear: Gear | null = null;
  id: string = ""

  constructor( private gearApiService: GearApiService,
               private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')+ "";
      this.gearApiService.getGearById(this.id).subscribe(gear =>{
        this.gear = gear
      })
    });
    this.gear = history.state.gear;
  }
}
