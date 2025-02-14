import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Gear } from '../../../interfaces/models/gear.model';

@Component({
  selector: 'app-gear-view-card',
  standalone: false,

  templateUrl: './gear-view-card.component.html',
  styleUrl: './gear-view-card.component.scss'
})
export class GearViewCardComponent implements OnInit {

  @Input() gear: Gear | null = null;
  imageUrl : string

  constructor(){
    this.imageUrl = ""
  }

  ngOnInit(): void {
    this.imageUrl = 'http://localhost:3000/images/uploads/' + this.gear?.photo
  }
}
