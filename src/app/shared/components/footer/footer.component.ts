import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  todayDate : Date
  constructor(){
    this.todayDate = new Date()
  }
}
