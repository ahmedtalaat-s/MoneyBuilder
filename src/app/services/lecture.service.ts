import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  baseUrl = environment.baseURL +'/api/';
  constructor(private _HttpClient: HttpClient) { }

  postLecture(level: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(this.baseUrl+'Lectures',level,{headers})
  }
  getLecturesByLevelId(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+`Lectures/${id}/lectures`,{headers})
  }
  getLectureById(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+`Lectures/${id}`,{headers})
  }
  updateLecture(id:any,data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(this.baseUrl+`Lectures/${id}`,data,{headers})
  }
  DeleteLecture(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(this.baseUrl+`Lectures/${id}`,{headers})
  }
}
