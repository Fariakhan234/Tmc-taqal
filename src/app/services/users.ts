import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewEmployee } from '../Model/users.model';

@Injectable({
  providedIn: 'root'
})
export class Users {
  
  constructor(private http:HttpClient ){}
  onlogin(obj:any){
return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login",obj)
  }
  onupload(obj:any){
    return this.http.post("https://petstore.swagger.io/v2/pet",obj)
  }
  getusers(): Observable<NewEmployee[]> {
    return this.http.get<NewEmployee[]>("https://api.escuelajs.co/api/v1/users");
  }
saveemp(obj:any){
  return this.http.post("https://api.escuelajs.co/api/v1/users/",obj)
}

chat(obj: any) {
  return this.http.post("https://faria-10.app.n8n.cloud/webhook/f00bc2a6-a1b5-4333-9f4a-bddc118e38a0", obj);
}


}



