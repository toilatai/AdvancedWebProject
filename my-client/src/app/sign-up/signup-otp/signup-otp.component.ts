import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.component.html',
  styleUrls: ['./signup-otp.component.css']
})
export class SignupOtpComponent {
  constructor(
    private router: Router
  ) { }

  verificationCode: string = '';
  isVerificationCodeValid: boolean = true;

  checkVerificationCode() {
    if (this.verificationCode.trim().length === 0) {
      this.isVerificationCodeValid = true;
    } else
      if (this.verificationCode === '666666') {
        this.isVerificationCodeValid = true;
      } else {
        this.isVerificationCodeValid = false;
      }
  }

  resend() {
    alert('Verification code has been resent.!')
  }

  onComplete() {
    if (this.isVerificationCodeValid === false) {
      alert('Please enter the correct verification code!');
      return false;
    }
    else if (this.verificationCode.trim().length === 0) {
      alert('Please enter the verification code!');
      return false;
    }
    else {
      this.router.navigate(['/app-sign-up-successfully']);
      return true
    }
  }
}
