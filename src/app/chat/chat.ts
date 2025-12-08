import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule ,RouterLink,MatIconModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
   router= inject(Router);
 logout() {
  localStorage.removeItem('use');
    this.router.navigateByUrl('/login');
  }
  messages: any[] = [
      { sender: 'bot', text: 'How can we <span class="text-warning">assist</span> you today?' }
 
  ];
  userMessage = '';
   showPlaceholder = true;

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
  if (this.showPlaceholder) {
      this.showPlaceholder = false;
      this.messages = []; 
    }
   
    this.messages.push({ sender: 'user', text: this.userMessage });
    const sentMessage = this.userMessage;
    this.userMessage = '';

   
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: ` hello  I'm just a demo bot `
      });
      this.scrollToBottom();
    }, 500);
  }
}
