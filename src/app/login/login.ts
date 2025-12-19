import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Users } from '../services/users';
import { UsersModel } from '../Model/users.model';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-login',
  imports: [FormsModule , MatSlideToggleModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login{
 loginobj = {
    emailId: '',
    password: ''
  };

 
  imageurl = 'assets/images/logo.png'; 

  showPassword = false;
  rememberMe = false;

 
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  onlogin(): void {
    
    console.log('Login clicked', this.loginobj);
    
    
    if (!this.loginobj.emailId || !this.loginobj.password) {
      alert('Please enter both username and password');
      return;
    }
   
  }
}

