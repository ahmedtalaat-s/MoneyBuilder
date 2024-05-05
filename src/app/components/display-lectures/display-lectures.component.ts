import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Parallax from 'parallax-js';
import { Lecture_get } from 'src/app/interfaces/lecture';
import { Level_get } from 'src/app/interfaces/level';
import { Question_get } from 'src/app/interfaces/question';
import { AuthService } from 'src/app/services/auth.service';
import { LectureService } from 'src/app/services/lecture.service';
import { LevelService } from 'src/app/services/level.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-display-lectures',
  templateUrl: './display-lectures.component.html',
  styleUrls: ['./display-lectures.component.css']
})
export class DisplayLecturesComponent implements OnInit {

  levelId = + (this.router.snapshot.paramMap.get('levelId')as string);
  lectureId:number = + (this.router.snapshot.paramMap.get('lectureId') as string);
  lecture: Lecture_get={description:'',id:0,level:'0',levelId:0,title:'',videoUrl:''}
  videoUrl = '';
  questions: Question_get[]=[];
  explaination: any[]=[];
  startQuize: boolean = false;
  endQuize: boolean = false;
  passed: boolean = false;
  selectedAnswers: any[] = [];
  isSubmit: boolean = false;
  allLevelsCompleted: boolean = false;
  score: any = 0;
  level!: Level_get
  levels: Level_get[]=[];
  nextLectureId: any = 0;
  nextlevelId: any = 0;

  constructor(private router: ActivatedRoute, private _LectureService: LectureService,
    private _QuestionService: QuestionService, private _LevelService: LevelService,
    private _Router: Router,private _auth:AuthService) {
    this.getLecture()
    this.getQuestions()
    this.getlevel()
    this.getlevels()

  }

  ngOnInit(): void {
     var scene = document.getElementById('scene') as HTMLElement;
    var parallax = new Parallax(scene);
    this.getLecture()
  }

  getLecture() {
    this._LectureService.getLectureById(this.lectureId).subscribe({
      next: (res) => {
        this.lecture = res;
        this.videoUrl = this.lecture.videoUrl
      }
    })
  }
  getlevel() {
    this._LevelService.getLevelById(this.levelId).subscribe({
      next: (res) => {
        this.level = res;
      }
    })
  }
  getlevels() {
    this._LevelService.getLevels().subscribe({
      next: (res) => {
        this.levels = res;
      }
    })
  }

  getQuestions() {
    this._QuestionService.getQuestionsByLectureId(this.lectureId).subscribe({
      next: (res) => {
        this.questions = res

      }
    })
  }
  StartQuize() {
    this.startQuize = true;
  }
  EndQuiz() {
    this.endQuize = true;
  }
  retryQuiz() {
     this.getQuestions();
    this.defaultValues()
  }
  submitAnswer() {
    this.isSubmit = true;

    this.selectedAnswers.forEach(answer => {
      if (answer == true) {
        this.score += 1;
      }
    });
    if (this.score >= ((this.selectedAnswers.length) / 2)) {
      this.passed = true;

    }

  }
  onAnswerChange(i: any,j:any) {
    this.selectedAnswers[i] = this.questions[i].answers[j].isRight
    this.explaination[i] = this.questions[i].answers[j].explaination

  }
  disablebtn() {

    if (this.selectedAnswers.length == this.questions.length) {
      return false
    }
    return true;
  }

  defaultValues() {
    this.explaination =[];
  // this.startQuize = false;
  this.endQuize = false;
  this.passed = false;
  this.selectedAnswers = [];
  this.isSubmit = false;
  this.score= 0;
  }

  proceedNextLecture() {

    if (this.level.id ?? 0 == (+(localStorage.getItem('levelId') as string))) {

      if (this.level.lectures) {
      for (var i = 0; i < this.level.lectures?.length ; i++){
        if (this.level.lectures[i].id > (this.lectureId)) {
          console.log(this.level.lectures[i].id);

          this.nextLectureId = this.level.lectures[i].id;
          break;
        }
        }
      }

      if (this.nextLectureId == 0) {


        for (var i = 0; i < this.levels.length; i++){


          if (this.levels?.[i]?.id as number> this.levelId) {

            this.nextlevelId= this.levels?.[i]?.id;
            this.nextLectureId = this.levels?.[i]?.lectures?.[0].id;
            console.log(this.nextLectureId)
            break

          }
          }

      }
    }
     var audio = new Audio();
    audio.src = 'assets/sounds/lock.mp3'
    audio.load();

    if (this.nextlevelId == 0 && !(this.nextLectureId == 0)) {
      console.log('enter the func');


      this._Router.navigate(['lectures', this.levelId])
      setTimeout(() => {
        document.getElementsByClassName('lockedimg')[0].setAttribute('src', 'assets/images/padlockopen.png')
        audio.play();
        setTimeout(() => {
          document.getElementsByClassName('layer')[0].remove()
          setTimeout(() => {
            this._Router.navigate(['lecture', this.levelId, this.nextLectureId])
            this._auth.updateNextLecture(this.nextLectureId).subscribe({
              next: (res) => {
                console.log(res);

              }
            })
            this._auth.getCurrentUser().subscribe({
              next: (res) => {
                console.log(res);
                localStorage.setItem('lectureId', res.userProgress.currentLectureId);
              localStorage.setItem('levelId', res.userProgress.currentLecture.levelId);
              },
              error: (err) => {
                 console.log(err);
                 console.log('from next lecture');

               }
            })
          },400)

        },300)
      },3000);

}else if (!(this.nextlevelId == 0) && !(this.nextLectureId == 0)) {


      this._Router.navigate(['lectures',this.nextlevelId])
      setTimeout(() => {
        document.getElementsByClassName('lockedimg')[0].setAttribute('src', 'assets/images/padlockopen.png')
        audio.play();
        setTimeout(() => {
          document.getElementsByClassName('layer')[0].remove()
          setTimeout(() => {

            this._Router.navigate(['lecture', this.nextlevelId, this.nextLectureId])
            this._auth.updateNextLecture(this.nextLectureId).subscribe({
              next: (res) => {
                console.log(res);
              }

            })
             this._auth.getCurrentUser().subscribe({
              next: (res) => {
                console.log(res);
                localStorage.setItem('lectureId', res.userProgress.currentLectureId);
              localStorage.setItem('levelId', res.userProgress.currentLecture.levelId);
               },
               error: (err) => {
                 console.log(err);
                 console.log('from next lecture');

               }
            })
          },400)

        },300)
      },3000);

}




  }

}
