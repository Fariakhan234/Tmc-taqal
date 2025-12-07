import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

export interface UploadedFile {
  name: string;
  url: string;
  size?: number;
  type?:string;
  date ?: string;
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatProgressBarModule, CommonModule, MatTableModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class Upload implements OnInit {

  @Input() requiredFileType?: string;

  fileName = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;
  fileToUpload: File | null = null;
  uploadedFiles: UploadedFile[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      this.uploadedFiles = JSON.parse(savedFiles);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.fileToUpload = file;
      (event.target as HTMLInputElement).value = '';
    } else {
      this.fileToUpload = null;
      this.fileName = '';
    }
  }

  uploadFile() {
    if (!this.fileToUpload) return;

    const file = this.fileToUpload;
    const formData = new FormData();
    formData.append('file', file);

    const upload$ = this.http.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });

    this.uploadSub = upload$.subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        } else if (event.type === HttpEventType.Response && event.body) {
          const uploadedFile: UploadedFile = {
            name: event.body.originalname || this.fileName,
            url: event.body.location,
            size: file.size
          };
          this.uploadedFiles.push(uploadedFile);
          localStorage.setItem('uploadedFiles', JSON.stringify(this.uploadedFiles));

          this.fileToUpload = null;
          this.reset();
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.fileToUpload = null;
        this.reset();
      }
    });
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.fileToUpload = null;
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
