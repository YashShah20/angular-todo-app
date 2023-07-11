import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  signup() {
    console.log('here');
  }
}
