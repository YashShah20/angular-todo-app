import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  isError: boolean = false;
  errorMessage: string = 'Something went wrong!!';

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', Validators.required],
  });

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;
    console.log(error);
    this.errorMessage = 'user already exists...';
    return throwError(() => {
      new Error(this.errorMessage);
    });
  };
  signup() {
    if (this.signupForm.valid) {
      if (
        this.signupForm.get('password')?.value ==
        this.signupForm.get('confirmPassword')?.value
      ) {
        this.userService
          .signup({
            name: this.signupForm.get('name')?.value,
            email: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value,
          })
          .pipe(catchError((error:any)=>{
            console.log(error)
            throw new Error('error.')
          }))
          .subscribe((res) => {
            this.router.navigate(['/signin']);
          });
      } else {
        this.isError = true;
        this.errorMessage = 'password and confirm password does not matched';
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
