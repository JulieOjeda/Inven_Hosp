import { Component } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientModel } from '../../interfaces/models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from '../../../app-routing.module';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  client: ClientModel
  constructor(private clientService: ClientService,
    private _router: Router,
    private activatedRoute : ActivatedRoute
  ){
    this.client = clientService.getCurrentClient()
  }

  public clickAddEvent(){
    this._router.navigate(["board/gear/register"], {relativeTo: this.activatedRoute})
  }

  public clickLogoutEvent(){
    this._router.navigate(["/logout"])
  }
}
