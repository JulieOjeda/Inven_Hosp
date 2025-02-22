import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GearApiService} from '../../../api/gear.api.service';

export interface Notification{
  message: string
  gearId: string
  createdAt: Date
}

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnChanges {
  notificationList: Notification[] = [];
  notifications: Notification[] = [];

  constructor(private gearApiService: GearApiService) {
    gearApiService.getGearMaintenanceNotifications().subscribe((notifications:Notification[]) =>{
      this.notificationList = notifications
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notificationList'] && this.notificationList) {
      // Agregar nuevas notificaciones al arreglo
      this.notificationList.forEach(newNotification => {
        this.notifications.push(newNotification);

        setTimeout(() => {
          this.removeNotification(newNotification);
        }, 30000); // 30 segundos
      });
    }
  }

  removeNotification(notification: Notification): void {
    this.notifications = this.notifications.filter(n => n !== notification);
  }
}
