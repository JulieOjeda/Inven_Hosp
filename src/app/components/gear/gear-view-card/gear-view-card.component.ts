import { AfterViewInit, Component, Input } from '@angular/core';
import { Gear } from '../../../interfaces/models/gear.model';

@Component({
  selector: 'app-gear-view-card',
  standalone: false,

  templateUrl: './gear-view-card.component.html',
  styleUrl: './gear-view-card.component.scss'
})
export class GearViewCardComponent implements AfterViewInit {

  @Input() gear: Gear | null = null;
  imageUrl : string

  constructor(){
    this.imageUrl = ""
  }

  ngAfterViewInit(): void {
    this.imageUrl = 'http://localhost:3000/gear/images/' + this.gear?.photo
  }
}
