import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import * as Parallax from 'parallax-js';
import { OwlOptions} from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { Level_get } from 'src/app/interfaces/level';
import { LevelService } from 'src/app/services/level.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  imgs=['assets/images/level1.PNG','assets/images/level2.PNG','assets/images/level3.PNG']
  levels:Level_get[]=[]
  userName ='';
  userEmail = '';
  islogin: boolean = localStorage.getItem('userToken') ? true : false;
  loginform: boolean = false;
  isAdmin: boolean = false;
  constructor(private _Router:Router,private _LevelService:LevelService,private _AuthService:AuthService) {
    _AuthService.getCurrentUser().subscribe({
      next: (res) => {
        console.log(res);
        this.userName = res.userName;
        this.userEmail = res.email;
        this.isAdmin = res.roles.includes('Admin')
        localStorage.setItem('isAdmin',`${this.isAdmin}`)
      },
      error: (err) => {
        console.log(err);
        console.log('this is from current');


      }
   })

  }

  currentlevelId = +(localStorage.getItem('levelId') as string);

  ngOnInit(): void {

      AOS.init({
        once: true,
    offset: 0,
      });



    this.getLevels();

    }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
     pullDrag: true,
     margin: 15,
     items:6,
     dots: false,
     autoplay: true,
     autoplaySpeed: 1400,
     navSpeed: 500,
     navText: ['Prev', 'Next'],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
   }





  toAddComponent() {
    this._Router.navigate(['addlevels']);
  }

  getLevels() {
    this._LevelService.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
        console.log(this.levels[0].pictureUrl);

      }
    })
  }
  shake(obj: any) {
    if (localStorage.getItem('userToken')) {
      obj.target.parentNode.classList.add('shake')
      setTimeout(()=>{obj.target.parentNode.classList.remove('shake')},500)
    } else {
      this._Router.navigate(['register',true]);
    }
  }

  navigateToLectures(id: any) {
    this._Router.navigate(['lectures',id]);
  }

  checkLogin() {
    if (localStorage.getItem('userToken')) {
      this.loginform ? this.loginform = false : this.loginform = true;
    } else {
      this._Router.navigate(['register'])
    }
  }

  logOut() {
    document.getElementsByClassName('login-form').item(0)?.classList.remove('active')
    localStorage.removeItem('userToken');
    this.islogin=false
    // this.levels=[]
    // this.getLevels();
  }

}
