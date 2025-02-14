import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientModel } from '../../interfaces/models/client.model';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  client : ClientModel
  logoUrl : string
  isMinimized = false;
  constructor(private clientService: ClientService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){
    this.client = this.clientService.getCurrentClient()
    this.logoUrl = ""

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onClickButton(to: String){
    this.router.navigate([`board/${to}`], {relativeTo: this.activatedRoute})
  }

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }
}
