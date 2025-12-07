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
imageurl = 'assets/images/logo.png';



loginobj:UsersModel = new UsersModel();
imagePath = 'assets/img/Frame.png';

userservice = inject(Users)
route= inject(Router)

onlogin(){

this.userservice.onlogin(this.loginobj).subscribe({
  next:(result:any)=>{
    if(result.result){
      alert('login sucessfully')
localStorage.setItem('user',JSON .stringify(result.data));
this.route.navigateByUrl("/dashboard")
    }
    else{
      alert(result.message)
    }

  },
error:()=>{
  alert('api error')

}
  
})
}
}
