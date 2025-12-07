import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Users } from '../services/users';
import { EmpModel, NewEmployee } from '../Model/users.model';
import { AsyncPipe, CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Modal } from 'bootstrap';






@Component({
  selector: 'app-employee',
  standalone: true,
 
  imports: [CommonModule , FormsModule ,MatPaginatorModule ,  AsyncPipe,  ],
  templateUrl: './employee.html' ,
  styleUrl: './employee.scss'
})

export class Employee implements OnInit {



  user = inject(Users);
  empobj : EmpModel = new EmpModel;
 

  employee: NewEmployee[] = [];


   getAllUsers() {
    this.user.getusers().subscribe({
      next: (response: any) => {
    console.log(response)
        this.employee = response;
           
      },
      error: () =>
         alert('Error fetching users')
    });
  
  }


onsaveempolye(){
  this.user.saveemp(this.empobj).subscribe({
    next:(res:any)=>{
      if(res.result){
        this.getAllUsers();
        alert('user created ')
      }
else{
    alert('User creaed sucessfully')
}

    },
    error:()=>{
alert('user created failed ')
    }
  });
}
  @ViewChild("newModel") newModel!: ElementRef;

 modalInstance!: Modal;

  ngOnInit(): void {
    this.getAllUsers(); 
  }
ngAfterViewInit() {
  
    this.modalInstance = new Modal(this.newModel.nativeElement);
}

openmodel(){
  this.modalInstance.show();
}
}