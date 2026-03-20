import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAPIService } from '../user-api.service';
import { DateService } from '../services/date.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  months: string[] = [];
  days: number[] = [];
  years: number[] = [];

  constructor(
    private fb: FormBuilder,
    private userAPIService: UserAPIService,
    private dateService: DateService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      profileName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: [''],
      birthMonth: ['', Validators.required],
      birthDay: ['', Validators.required],
      birthYear: ['', Validators.required],
      marketing: [false],
      notRobot: [false, Validators.requiredTrue],
      role: ['user']
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.months = this.dateService.getMonths();
    this.days = this.dateService.getDays();
    this.years = this.dateService.getYears();

    const savedData = sessionStorage.getItem('signupForm');
    if (savedData) {
      this.signupForm.setValue(JSON.parse(savedData));
    }

    this.signupForm.valueChanges.subscribe(value => {
      sessionStorage.setItem('signupForm', JSON.stringify(value));
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('signupForm');
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.userAPIService.registerUser(this.signupForm.value).subscribe({
        next: () => {
          sessionStorage.removeItem('signupForm');
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Đăng ký thất bại. Vui lòng thử lại.');
        }
      });
    } else {
      alert('Vui lòng kiểm tra lại thông tin của bạn.');
    }
  }
}
