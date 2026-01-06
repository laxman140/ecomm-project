import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LogIn, SignUp } from '../data-type';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css',
})
export class UserAuth {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  signUp(data: SignUp) {
    this.userService.userSignUp(data);
    // this.router.navigate(['/']);
  }
  login(data: LogIn) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((isInvalid: boolean) => {
      if (isInvalid) {
        alert('Invalid Credentials. Please try again.');
        this.authError = 'Invalid email or password';
      } else {
        // Successful login actions can be handled here if needed
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}
