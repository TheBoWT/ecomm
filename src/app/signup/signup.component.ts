import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userExist:boolean;

  formData = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validators: this.passwordMatch })
  constructor(private authService: AuthService, private router: Router) { }

  
  private passwordMatch(formGroup: FormGroup){
    const { password, passwordConfirm } = formGroup.value;
    
    if(password != '' && passwordConfirm !='' && password !== passwordConfirm) return  { notMatch: true };
    else  null;
  }
  onSignup(){
    if(this.formData.invalid) return;

    this.authService.SignUp(this.formData.value).then(()=>{
      this.router.navigate(['']);      
    }).catch(err=>{
      if(err.code === "auth/email-already-in-use")
        this.userExist = true;
    });
  }

}
