import { Component, Input } from '@angular/core';
import { Gear } from '../../../interfaces/models/gear.model';

@Component({
  selector: 'app-gear-view',
  standalone: false,  
  templateUrl: './gear-view.component.html',
  styleUrl: './gear-view.component.scss'
})
export class GearViewComponent {
  @Input() gear: Gear | null = null; // Recibimos los datos del componente padre

  constructor() { }

  ngOnInit(): void {
    this.gear = history.state.gear;
  }
}
