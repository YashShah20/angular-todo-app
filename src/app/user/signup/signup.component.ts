import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  userForm = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;
    this.errorMessage = 'user already exists...';
    return throwError(() => {
      new Error(this.errorMessage);
    });
  };
  signup() {
    if (
      this.userForm.get('password')?.value ==
      this.userForm.get('confirmPassword')?.value
    ) {
      this.userService
        .signup({
          name: this.userForm.get('name')?.value,
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        })
        .pipe(catchError(this.errorHandler))
        .subscribe((res) => {
          this.router.navigate(['/signin']);
        });
    } else {
      this.isError = true;
      this.errorMessage = 'password and confirm password does not matched';
    }
  }
}
