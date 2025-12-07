import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { UploadedFile } from '../upload/upload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-knowledgebase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './knowledgebase.html',
  styleUrls: ['./knowledgebase.scss']
})
export class Knowledgebase implements OnInit {

  @Input() requiredFileType?: string;
  fileName = '';
  uploadProgress?: number;
  uploadSub?: Subscription;
  uploadMessage = '';
  uploadedFiles: UploadedFile[] = [];
  fileToUpload: File | null = null;
  isupload = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      this.uploadedFiles = JSON.parse(savedFiles);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.fileName = file.name;
    this.fileToUpload = file;

    
    const isDuplicate = this.uploadedFiles.some(f => f.name === file.name);
    if (isDuplicate) {
      alert(' This file is already uploaded!');
      this.uploadMessage = 'Duplicate file detected. Upload skipped.';
      this.reset();
      return; 
    }

    
    const formData = new FormData();
    formData.append('file', file);

    const upload$ = this.http.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(finalize(() => this.reset()));

    this.uploadSub = upload$.subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        } else if (event.type === HttpEventType.Response) {
          alert(' File uploaded successfully!');
          this.uploadMessage = 'File uploaded successfully!';
          this.isupload = true;

          const uploadedFile: UploadedFile = {
            name: event.body.originalname || this.fileName,
            url: event.body.location,
            size: file.size,
            type: file.type,
            date: new Date().toLocaleString(),
            

          };

          this.uploadedFiles.push(uploadedFile);
          localStorage.setItem('uploadedFiles', JSON.stringify(this.uploadedFiles));

          this.fileToUpload = null;
          this.reset();
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.uploadMessage = 'Upload failed. Please try again.';
        this.reset();
      }
    });
  }

  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }

  uploadAnother() {
    this.isupload = false;
    this.fileName = '';
    this.uploadMessage = '';
  }
deleteFile(file: UploadedFile): void {
   
    this.uploadedFiles = this.uploadedFiles.filter(doc => doc.name !== file.name);

    localStorage.setItem('uploadedFiles', JSON.stringify(this.uploadedFiles));

    alert(`File "${file.name}" has been removed .`);


  }
}
