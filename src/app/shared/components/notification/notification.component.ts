import { Component, OnInit } from '@angular/core';
import { GearApiService } from '../../../api/gear.api.service';
import {Gear} from '../../../interfaces/models/gear.model';
import {forkJoin, map, mergeMap} from 'rxjs';

export interface Notification {
  message: string;
  gearId: string;
  createdAt: Date;
  gear ?: Gear;
}

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private gearApiService: GearApiService) {}

  ngOnInit(): void {
    this.gearApiService.getGearMaintenanceNotifications().pipe(
      mergeMap(notificaciones => {
        const observablesActualizados = notificaciones.map(notificacion =>
          this.gearApiService.getGearById(notificacion.gearId).pipe(
            map( (gear: Gear) => ({
              ...notificacion,
              gear
            }))
          )
        );
        return forkJoin(observablesActualizados);
      })
    ).subscribe((listaNotificacionesActualizadas: Notification[]) => {
      this.notifications = this.notifications.concat(listaNotificacionesActualizadas)
    });
  }

  removeNotification(notification: Notification): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
