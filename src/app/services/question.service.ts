import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = environment.baseURL +'/api/';
  constructor(private _HttpClient: HttpClient) { }

  postQuestion(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(this.baseUrl+'Questions',data,{headers})
  }
  getQuestionsByLectureId(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+`Questions/${id}/questions`,{headers})
  }
  getQuestionById(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+`Questions/${id}`,{headers})
  }
  updateQuestion(id:any,data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(this.baseUrl+`Questions/${id}`,data,{headers})
  }
  DeleteQuestion(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(this.baseUrl+`Questions/question/${id}`,{headers})
  }
  DeleteAnswer(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(this.baseUrl+`Questions/answer/${id}`,{headers})
  }
}
