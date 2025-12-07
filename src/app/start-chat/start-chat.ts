import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './start-chat.html',
  styleUrl: './start-chat.scss'
})
export class StartChat implements  AfterViewChecked{
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
    }, 800);
  }

}
