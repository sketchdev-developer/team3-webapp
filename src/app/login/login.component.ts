import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.loginForm.value;

    if (formValue.email === 'valid@example.com'
      && formValue.password === 'ValidPassword123!') {
       this.router.navigate(['/dashboard']);
    } else {
      this.formErrors = 'Invalid email/password combination';
    }
  }
}
