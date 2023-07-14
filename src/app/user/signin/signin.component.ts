import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  signinForm = this.fb.group({
    email: ['yash@gmail.com', [Validators.required, Validators.email]],
    password: ['abc', [Validators.required, Validators.minLength(3)]],
  });

  isError: boolean = false;

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;
    console.log(error.error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  };

  signin() {
    this.userService
      .signin({
        email: this.signinForm.get('email')?.value,
        password: this.signinForm.get('password')?.value,
      })
      .pipe(catchError(this.errorHandler))
      .subscribe((res: any) => {
        localStorage.setItem('token', res?.token);
        this.router.navigate(['/notes']);
      });
  }
}
