import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level_post } from '../interfaces/level';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class LevelService {
  baseUrl = environment.baseURL +'/api/';
  constructor(private _HttpClient: HttpClient) { }

  postLevel(level: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.post(this.baseUrl+'levels',level,{headers})
  }
  getLevels(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+'levels',{headers})
  }
  getLevelById(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(this.baseUrl+`levels/${id}`,{headers})
  }
  updateLevel(id:any,data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(this.baseUrl+`levels/${id}`,data,{headers})
  }
  DeleteLevel(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.delete(this.baseUrl+`levels/${id}`,{headers})
  }
}
