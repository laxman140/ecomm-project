import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { LogIn, SignUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css',
})
export class SellerAuth implements OnInit {
  constructor(private seller: Seller, private router:Router) { }

  showLogIn = false;
  authError = '';
  ngOnInit(): void {
     this.seller.reloadSeller();
   }
  signUp(formData: SignUp): void {
    this.seller.userSignUp(formData);
  }
  openLogInOrSignUp(flag: boolean){
    this.showLogIn = flag;
  }
  login(logInData: LogIn): void {
   this.authError = ''
   this.seller.userLogin(logInData);
   this.seller.isLoginError.subscribe((isError)=>{
    this.authError = (isError)?'Email or Password is incorrect':'';
   })

  }
}

