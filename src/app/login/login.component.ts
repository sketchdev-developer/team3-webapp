import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.loginForm.value;

    this.auth.authenticateUser(formValue.email, formValue.password).subscribe(
      result => this.router.navigate(['/dashboard']),
      errorResponse => {
        console.log('error!!!', errorResponse.error.errors);
        this.formErrors = errorResponse.error.errors;
      }
    )
  }
}
