import { Component, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements AfterViewInit {
  @ViewChild('fullNameInput') fullNameInput!: ElementRef;
  @ViewChild('contactForm') contactForm!: ElementRef;

  // Countdown properties
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private countdownInterval: any;
  targetDate: Date = new Date('2024-11-07T23:59:59');

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.startCountdown();
  }

  // Countdown function
  startCountdown(): void {
    this.ngZone.runOutsideAngular(() => {
      this.countdownInterval = setInterval(() => {
        this.ngZone.run(() => {
          const currentTime = new Date().getTime();
          const targetTime = this.targetDate.getTime();
          const timeDifference = targetTime - currentTime;

          if (timeDifference > 0) {
            this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            this.minutes = Math.floor((timeDifference % (1000 * 60)) / 1000);
            this.seconds = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
          } else {
            clearInterval(this.countdownInterval);
            this.days = 0;
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
            alert('Countdown Complete!');
          }
        });
      }, 1000); // Update every 1 second
    });
  }

  // Form submission handling
  onSubmit(form: NgForm): void {
    if (form.valid) {
      alert('Registered successfully!');
      this.resetForm();
    } else {
      this.showErrorMessage();
    }
  }

  // Show error message in alert if form is invalid
  showErrorMessage(): void {
    alert("Please fill in all required fields correctly.");
  }

  // Reset the form fields
  resetForm(): void {
    if (this.contactForm) {
      this.contactForm.nativeElement.reset();
    }
  }

  // Focus on the full name input field
  focusFullName(): void {
    if (this.fullNameInput) {
      this.fullNameInput.nativeElement.focus();
    }
  }

  // Scroll to the contact form
  scrollToForm(): void {
    if (this.contactForm) {
      this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to register form
  scrollToRegister(): void {
    window.scrollTo(0, 100);
    if (this.contactForm) {
      this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
