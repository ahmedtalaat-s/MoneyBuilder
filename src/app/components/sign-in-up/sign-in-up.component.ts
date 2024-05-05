import { Component } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as AOS from 'aos'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrls: ['./sign-in-up.component.css']
})
export class SignInUpComponent {

  signUpForm!:FormGroup;
  logInForm!:FormGroup;
  logInError: boolean=false;
  registerError: string = "";
  isloading: boolean = false;
  emailNotExists: boolean = false;
  signUpsuccess = false;

  constructor(private _fb:FormBuilder , private _Router:Router ,private _AuthService:AuthService){}
  ngOnInit(): void {
      AOS.init();
    this.createSignUpForm();
    this.createLogInForm();
  }

   createSignUpForm() {
    this.signUpForm = this._fb.group({

      userName:['', [Validators.required, Validators.minLength(3)]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*/)]]
    });
  }

  createLogInForm() {
    this.logInForm = this._fb.group({
      Email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)*/)]],
    });
  }

  toggle() {
    const container = document.getElementsByClassName('container');
    container.item(0)?.classList.toggle('right-panel-active');
}


  handleSignUp(signUp: any) {
    this.isloading = true;
    const value = {
      userName:  signUp.get('userName')?.value,
      email:  signUp.get('email')?.value,
      password:  signUp.get('password')?.value
    };
    console.log(value);

    this._AuthService.register(value).subscribe({
      next: (res) => {
        document.getElementsByClassName('signbox').item(0)?.classList.add('display')
         console.log(res);
        this.signUpsuccess=true

          localStorage.setItem('userToken', res.token);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('lectureId', res.userProgress.currentLectureId);
          localStorage.setItem('levelId', res.userProgress.currentLecture.levelId);
          this._AuthService.saveUser();
        setTimeout(() => {
          this.isloading = false;
          this._Router.navigate(['/']);
          },4000)
      },
      error: (err) => {
        this.isloading = false;
        this.registerError = err.error.errors[0];
        console.log(err);

      }
    })
  }

  handleLogIn(logIn: any) {
    this.isloading = true;
    const value = {
      Email: logIn.get('Email')?.value,
      password:  logIn.get('password')?.value
    };
    this._AuthService.logIn(value).subscribe({
      next:(res) => {
        console.log(res);
        this.isloading = false;
        this._Router.navigate(['/']);
        localStorage.setItem('userToken', res.token);
          localStorage.setItem('userName', res.userName);

        localStorage.setItem('lectureId', res.userProgress.currentLectureId);
        localStorage.setItem('levelId', res.userProgress.currentLecture.levelId);
        this._AuthService.saveUser();
      },
      error: (err) => {
        this.isloading = false;
        this.logInError = true;
        console.log(err);
      }

    })
  }

    fogotPassword(_email:any) {
    const value = {
      email:_email
    }
      console.log(value);
    this._AuthService.fogotPassword(value).subscribe({
      next:(res) => {
        console.log(res);
        this._Router.navigate(['/ResetPassword',res.email,res.token]);
      },
      error: (err) => {
        this.emailNotExists = true;
        console.log(err);

      }
    })
  }
}
