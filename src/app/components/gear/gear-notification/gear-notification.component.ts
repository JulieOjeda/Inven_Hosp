import {Component, Input} from '@angular/core';
import {Gear} from '../../../interfaces/models/gear.model';

@Component({
  selector: 'app-gear-notification',
  standalone: false,
  templateUrl: './gear-notification.component.html',
  styleUrl: './gear-notification.component.scss'
})
export class GearNotificationComponent {
  @Input() gear: Gear | null = null;
  imageUrl : string

  constructor(){
    this.imageUrl = ""
  }

  ngOnInit(): void {
    this.imageUrl = 'http://localhost:3000/images/uploads/' + this.gear?.photo
  }
}
