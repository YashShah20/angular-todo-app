import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  isError: boolean = false;

  private errorHandler = (error: HttpErrorResponse) => {
    this.isError = true;

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  };

  signin() {
    this.userService
      .signin({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      })
      .pipe(catchError(this.errorHandler))
      .subscribe((res: any) => {
        console.log(res.status);
        localStorage.setItem('token', res?.token);
        this.router.navigate(['/notes']);
      });
  }
}
