import { Component } from '@angular/core';
import { GearService } from '../../../services/gear.service';
import { Gear } from '../../../interfaces/models/gear.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gear-list',
  standalone: false,
  
  templateUrl: './gear-list.component.html',
  styleUrl: './gear-list.component.scss'
})
export class GearListComponent {
  gears: Gear[] = [];
  private gearsListSubscription: Subscription | null = null;

  constructor(private gearService: GearService) { }

  ngOnInit(): void {
    this.gearsListSubscription = this.gearService.list$.subscribe(gears => {
      this.gears = gears;
    });
  }

  ngOnDestroy(): void {
    if (this.gearsListSubscription) {
      this.gearsListSubscription.unsubscribe();
    }
  }
}
