import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  formErrors: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private users: UserService
  ) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formValue = this.signupForm.value;

    this.users.registerUser(formValue.email, formValue.password).subscribe(
      result => this.router.navigate(['/dashboard']),
      errorResponse => {
        console.log('error!!!', errorResponse.error.errors);
        this.formErrors = errorResponse.error.errors;
      }
    )
  }
}
