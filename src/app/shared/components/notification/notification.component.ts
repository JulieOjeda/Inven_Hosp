import { Component, OnInit, OnDestroy } from '@angular/core';
import { GearApiService } from '../../../api/gear.api.service';
import { Gear } from '../../../interfaces/models/gear.model';
import { forkJoin, map, mergeMap, Subscription } from 'rxjs';
import {NotificationService} from '../../../services/notification.service';

export interface Notification {
  message: string;
  gearId: string;
  createdAt: Date;
  gear?: Gear;
}

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private refreshSub!: Subscription;

  constructor(
    private gearApiService: GearApiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.refreshSub = this.notificationService.refresh$.subscribe(() => {
      this.loadNotifications();
    });
  }

  ngOnDestroy(): void {
    this.refreshSub.unsubscribe();
  }

  loadNotifications(): void {
    this.gearApiService.getGearMaintenanceNotifications().pipe(
      mergeMap(notificaciones => {
        const observablesActualizados = notificaciones.map(notificacion =>
          this.gearApiService.getGearById(notificacion.gearId).pipe(
            map((gear: Gear) => ({
              ...notificacion,
              gear
            }))
          )
        );
        return forkJoin(observablesActualizados);
      })
    ).subscribe((listaNotificacionesActualizadas: Notification[]) => {
      this.notifications = listaNotificacionesActualizadas;
    });
  }

  removeNotification(notification: Notification): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
