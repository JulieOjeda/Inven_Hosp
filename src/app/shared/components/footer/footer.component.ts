import { Component } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ClientModel} from '../../interfaces/models/client.model';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  todayDate : Date
  client: ClientModel
  constructor( private clientService: ClientService){
    this.todayDate = new Date()
    this.client = clientService.getCurrentClient()
  }
}
