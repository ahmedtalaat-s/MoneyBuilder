import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Level_get } from 'src/app/interfaces/level';
import { LectureService } from 'src/app/services/lecture.service';
import { LevelService } from 'src/app/services/level.service';

LectureService
@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
  openedlectureId = 0
  levelId = +(this.route.snapshot.paramMap.get('levelId') as string);
  level!: any
  currentLevel: any = 0

    currentimg=0
  imgs=['assets/images/intro.PNG','assets/images/level1.PNG','assets/images/level2.PNG','assets/images/level3.PNG']


  constructor(private _LevelService:LevelService,private route:ActivatedRoute,private _Router:Router) {
      this.openedlectureId = JSON.parse(localStorage.getItem('lectureId') as string)
      this.currentLevel = JSON.parse(localStorage.getItem('levelId') as string)
    this.getlevel()


  }
  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('levelId'));

      if (+(this.route.snapshot.paramMap.get('levelId') as string) == 2) {
      this.currentimg=0
    } else {
      if (this.levelId == 3) {
        console.log(this.levelId);

        this.currentimg=2
      } else {
        console.log(this.level?.lectures?.length);

        this.currentimg=3

      }
    }
  }




  playsound(obj:any,LectureId:any) {


    if(this.openedlectureId<LectureId){
      obj.target.parentNode.classList.add('shake')
      setTimeout(() => {
        obj.target.parentNode.classList.remove('shake')
      },600)
    } else {
      this._Router.navigate([`lecture`,this.levelId,LectureId])
    }

  }

  getlevel() {
    this._LevelService.getLevelById(this.levelId).subscribe({
      next: (res) => {
        this.level = res;
        console.log(this.level);

  }
})
}

}
