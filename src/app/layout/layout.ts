import { Component, DOCUMENT, ElementRef, Inject, inject, Input, ViewChild } from '@angular/core';
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
export class Layout  {
  isDarkMode: boolean = false;


constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {

    const currentTheme = this.document.documentElement.getAttribute('data-bs-theme');
    this.isDarkMode = currentTheme === 'dark';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    
   
    this.document.documentElement.setAttribute('data-bs-theme', theme);
  }



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
