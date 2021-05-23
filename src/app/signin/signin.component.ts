import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }
  failedLogin:boolean;

  ngOnInit(): void {
  }

  onSignIn(){
    if(this.formData.invalid) return;
  
    this.authService.SignIn(this.formData.value)
    .then(()=>{
      this.router.navigate(['']);
    })
    .catch(err=>{
      if(err.code === "auth/wrong-password" || err.code === "auth/user-not-found")
      this.failedLogin = true;      
    });
  }

}
