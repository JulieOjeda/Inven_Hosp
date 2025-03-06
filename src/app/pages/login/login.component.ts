import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {AuthApiService} from '../../api/auth.api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInGrow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('fadeInSlideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showAnimations = false;

  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    setTimeout(() => this.showAnimations = true, 100);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authApiService.login(this.loginForm.value).subscribe((success)=>{
        if (!success){
          alert("Inicio de Sesion Fallido.. Intente Otra vez")
        }
        this.router.navigate(["/board/gear"], {queryParams:{filter: "all"}})
      })
    }
  }
}
