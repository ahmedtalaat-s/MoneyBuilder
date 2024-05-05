import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Lecture_get } from 'src/app/interfaces/lecture';
import { Level_get, Level_post } from 'src/app/interfaces/level';
import { Question_get, Question_post } from 'src/app/interfaces/question';
import { LectureService } from 'src/app/services/lecture.service';
import { LevelService } from 'src/app/services/level.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-addlevels',
  templateUrl: './addlevels.component.html',
  styleUrls: ['./addlevels.component.css']
})
export class AddlevelsComponent implements OnInit {

  addinglevel:boolean=false
  updatinglevel:boolean=false
  addinglecture:boolean=false
  updatinglecture: boolean = false
  addingQuestion:boolean=false
  updatingQuestion: boolean = false
  parentLevelId: any = 0
  parentLecturelId: any = 0
  AddLevelForm!: FormGroup;
  AddLectureForm!: FormGroup;
  AddQuestionForm!: FormGroup;
  img!: File;
  video!: File;
  imgUrl!: string;
  levels: Level_get[] = [];
  questions:Question_get[]=[]
  idUpdateLevel = 0;
  idUpdateLecture = 0;
  idUpdateQuestion = 0;


  constructor(private fb: FormBuilder, private _LevelService: LevelService, private _LectureService: LectureService
    , private _QuestionService:QuestionService
   ){}
  ngOnInit(): void {
    this.createLevelForm()
    this.createLectureForm()
    this.createQuestionForm()
    this.gettinglevels();
  }

  createLevelForm() {
    this.AddLevelForm = this.fb.group({
      title: ['',Validators.required],
      objectives: [''],
      imgfile:['']
    })
  }
  createLectureForm() {
    this.AddLectureForm = this.fb.group({
      title: ['',Validators.required],
      description: [''],
      videofile:['']
    })
  }
  createQuestionForm() {
    this.AddQuestionForm = this.fb.group({
      description: ['',Validators.required],
      option1: ['',Validators.required],
      option2: ['',Validators.required],
      option3: [''],
      option4: [''],
      explaination1: [''],
      explaination2: [''],
      explaination3: [''],
      explaination4: [''],
      correctAnswer:['',Validators.required]
    })
  }

  onuploadImg(obj: any) {

    this.img = obj.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result;

    }
    reader.readAsDataURL(this.img)

  }
   onuploadVideo(obj: any) {
     this.video = obj.target.files[0];
     console.log('done');

  }
  Addinglevel() {
    this.addinglevel = true
  }
  addlevel() {
    const formdata = new FormData();
    formdata.append("Title",this.AddLevelForm.get('title')?.value)
    formdata.append("Objectives",this.AddLevelForm.get('objectives')?.value)
    formdata.append("PictureUrl",this.img)


    this._LevelService.postLevel(formdata).subscribe({
      next: (res) => {
        this.gettinglevels()
        this.addinglevel = false
        this.imgUrl = ''
        this.createLevelForm()
      },
      error: (err) => {
        console.log(err);

      }
    })


  }
  gettinglevels() {
    this._LevelService.getLevels().subscribe({
      next: (res) => {

        this.levels = res;
        console.log(this.levels);
  }
})
  }

  getupdatelevel(level: Level_get) {
    this.updatinglevel = true;
    this.AddLevelForm.get('title')?.setValue(level.title);
    this.AddLevelForm.get('objectives')?.setValue(level.objectives)
    this.idUpdateLevel = level.id as number;
  }
  updatelevel() {
    const formdata = new FormData();
    formdata.append("Title",this.AddLevelForm.get('title')?.value)
    formdata.append("Objectives",this.AddLevelForm.get('objectives')?.value)
    formdata.append("PictureUrl",this.img,this.img.name)


    this._LevelService.updateLevel(this.idUpdateLevel,formdata).subscribe({
      next: (res) => {
        this.gettinglevels()
        this.updatinglevel = false
        this.imgUrl = ''
this.createLevelForm()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deletelevel(id: any) {
    this._LevelService.DeleteLevel(id).subscribe({
      next: () => {
        this.gettinglevels()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  Addinglecture(id:any) {
    this.addinglecture = true;
    this.parentLevelId=id
  }
  addLecture() {
    const formdata = new FormData();
    formdata.append("Title",this.AddLectureForm.get('title')?.value)
    formdata.append("Description",this.AddLectureForm.get('description')?.value)
    formdata.append("VideoUrl",this.video,this.video.name)
    formdata.append("LevelId",this.parentLevelId)


    this._LectureService.postLecture(formdata).subscribe({
      next: (res) => {
        this.gettinglevels()
        this.addinglecture = false
        this.createLectureForm()
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

//   gettinglectures() {
//     this._LectureService.getLecturesByLevelId(this.parentLevelId).subscribe({
//       next: (res) => {

//   }
// })
//   }

  updateLecture() {

    const formdata = new FormData();
    formdata.append("Title",this.AddLectureForm.get('title')?.value)
    formdata.append("Description",this.AddLectureForm.get('description')?.value)
    formdata.append("VideoUrl",this.video,this.video.name)
    formdata.append("LevelId",this.parentLevelId)


    this._LectureService.updateLecture(this.idUpdateLecture,formdata).subscribe({
      next: (res) => {
        this.gettinglevels()
        this.updatinglecture = false
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  deletelecture(id:any) {
     this._LectureService.DeleteLecture(id).subscribe({
      next: () => {
        this.gettinglevels()
      },
      error: (err) => {
        console.log(err);

      }
    })
}
getupdatelecture(lecture:Lecture_get,id:any) {
  this.updatinglecture = true;
  this.parentLevelId = id;
    this.AddLectureForm.get('title')?.setValue(lecture.title);
    this.AddLectureForm.get('description')?.setValue(lecture.description)
    this.idUpdateLecture = lecture.id as number;
}

  AddingQuestion(id:any) {
    this.addingQuestion = true;
    this.parentLecturelId=id
  }

  addQuestion() {

    const question: any = {
      lectureId: this.parentLecturelId,
      description: this.AddQuestionForm.get('description')?.value,
      answers: [
        {
          description: this.AddQuestionForm.get('option1')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination1')?.value
        },
        {
          description: this.AddQuestionForm.get('option2')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination2')?.value
        }
      ]
    }


    if ((this.AddQuestionForm.get('option3')?.value)) {
      question.answers[2]={
          description: this.AddQuestionForm.get('option3')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination3')?.value
        }
    }
    if ((this.AddQuestionForm.get('option4')?.value)) {
      question.answers[3]= {
          description: this.AddQuestionForm.get('option4')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination4')?.value
        }
    }

    if (this.AddQuestionForm.get('correctAnswer')?.value == "option1") {
      question.answers[0].isRight = true;
    } else if (this.AddQuestionForm.get('correctAnswer')?.value == "option2") {
      question.answers[1].isRight = true;
    }
    else if (this.AddQuestionForm.get('correctAnswer')?.value == "option3") {
      question.answers[2].isRight = true;
    } else {
      question.answers[3].isRight = true;
    }


    this._QuestionService.postQuestion(question).subscribe({
      next: (res) => {
        console.log(res);
        this.createQuestionForm();
        this.addingQuestion = false;
        this.gettinglevels()
        this.getQuestions(this.parentLecturelId)

    }
    })
  }

  getQuestions(id: any) {
    this.questions = []
    this.parentLecturelId=id
    this._QuestionService.getQuestionsByLectureId(id).subscribe({
      next: (res) => {
        this.questions=res
      }
    })
  }

  getupdateQuestion(question: any, id: any) {
    console.log(question);
    this.updatingQuestion = true;
    this.parentLecturelId = id;
    this.idUpdateQuestion = question.id as number;
    this.AddQuestionForm.get('description')?.setValue(question.description),
    this.AddQuestionForm.get('option1')?.setValue(question.answers[0].description),
    this.AddQuestionForm.get('explaination1')?.setValue(question.answers[0].explaination??'')
    this.AddQuestionForm.get('option2')?.setValue(question.answers[1].description),
    this.AddQuestionForm.get('explaination2')?.setValue(question.answers[1].explaination??'')
    this.AddQuestionForm.get('option3')?.setValue(question.answers[2]?.description),
    this.AddQuestionForm.get('explaination3')?.setValue(question.answers[2]?.explaination??'')
    this.AddQuestionForm.get('option4')?.setValue(question.answers[3]?.description),
    this.AddQuestionForm.get('explaination4')?.setValue(question.answers[3]?.explaination??'')






    if (question.answers[0].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option1")
    } else if (question.answers[1].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option2")
    }
    else if (question.answers[2].isRight == true) {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option3")
    } else {
      this.AddQuestionForm.get('correctAnswer')?.setValue("option4")
    }

  }

  updateQuestion() {
      const question: any = {
      lectureId: this.parentLecturelId,
      description: this.AddQuestionForm.get('description')?.value,
      answers: [
        {
          description: this.AddQuestionForm.get('option1')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination1')?.value
        },
        {
          description: this.AddQuestionForm.get('option2')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination2')?.value
        }
      ]
    }


    if ((this.AddQuestionForm.get('option3')?.value)) {
      question.answers[2]={
          description: this.AddQuestionForm.get('option3')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination3')?.value
        }
    }
    if ((this.AddQuestionForm.get('option4')?.value)) {
      question.answers[3]= {
          description: this.AddQuestionForm.get('option4')?.value,
          isRight: false,
          explaination:this.AddQuestionForm.get('explaination4')?.value
        }
    }

    if (this.AddQuestionForm.get('correctAnswer')?.value == "option1") {
      question.answers[0].isRight = true;
    } else if (this.AddQuestionForm.get('correctAnswer')?.value == "option2") {
      question.answers[1].isRight = true;
    }
    else if (this.AddQuestionForm.get('correctAnswer')?.value == "option3") {
      question.answers[2].isRight = true;
    } else {
      question.answers[3].isRight = true;
    }

    this._QuestionService.updateQuestion(this.idUpdateQuestion, question).subscribe({
      next: (res) => {
        this.updatingQuestion = false
        this.createQuestionForm()
        this.getQuestions(this.parentLecturelId)
      }
    })
   }

  deleteQuestion(id: any, id2: any) {
    this.parentLecturelId=id2
    this._QuestionService.DeleteQuestion(id).subscribe({
      next: (res) => {
        this.getQuestions(this.parentLecturelId)
  }
})
  }
  deleteAnswer(id: any, id2: any) {
    this.parentLecturelId=id2
    this._QuestionService.DeleteAnswer(id).subscribe({
      next: (res) => {
        this.getQuestions(this.parentLecturelId)
  }
})
  }
}
