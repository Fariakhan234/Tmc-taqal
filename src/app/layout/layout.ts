import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadedFile } from '../upload/upload';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-layout',
  standalone: true, 
  imports: [RouterLink, RouterOutlet , CommonModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'] 
})
export class Layout {
  router = inject(Router);
  @ViewChild("newModel") newModel!: ElementRef;
  modelinstance!:Modal;
ngaForViewInt(){
  this.modelinstance=(this.newModel.nativeElement);
}
  
openmodel(){
  this.modelinstance.show()
}
  logout() {
    localStorage.removeItem('use');
    this.router.navigateByUrl('/login');
  }


}
