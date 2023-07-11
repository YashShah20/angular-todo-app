import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  email!: string;
  password!: string;
  constructor(private userService: UserService) {}

  signin() {
    console.log('here');
    this.userService
      .signin({ email: this.email, password: this.password })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
