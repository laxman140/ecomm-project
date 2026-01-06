import { EventEmitter, Injectable } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    console.log('User Sign-Up Data:', user);
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((response) => {
      console.log('User signed up successfully:', response);
      if (response) {
        localStorage.setItem('user', JSON.stringify(response.body));
        this.router.navigate(['/']);
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  userLogin(data: LogIn) {
    console.log('User Login Data:', data);
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
      else {
        console.log('Invalid login credentials');
        this.invalidUserAuth.emit(true);
      }
    });
  }
}
