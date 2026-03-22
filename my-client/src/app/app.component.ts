import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-client';
  isChatOpen: boolean = false;

  quickQuestions = [
    'How long does shipping take?',
    'Can I customize a product?',
    'What is your return policy?',
    'How can I join the workshop?',
  ];

  chatHistory: Array<{ sender: 'bot' | 'user'; text: string }> = [
    {
      sender: 'bot',
      text: 'Hi! I am ClayStudio assistant. Tap a quick question below and I will answer right away.',
    },
  ];

  constructor(public router: Router) {}

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  askQuickQuestion(question: string): void {
    const replies: Record<string, string> = {
      'How long does shipping take?': 'Most orders are delivered in 2-5 business days, depending on your location.',
      'Can I customize a product?': 'Yes. Go to the Customization service on Home page and submit your request there.',
      'What is your return policy?': 'You can request a return within 30 days if the product is defective or not as described.',
      'How can I join the workshop?': 'Open the Workshop service on Home page, choose a session, and follow the registration steps.',
    };

    this.chatHistory.push({ sender: 'user', text: question });
    this.chatHistory.push({
      sender: 'bot',
      text: replies[question] || 'Thanks for your question. Our support team will assist you soon.',
    });
  }
}
