import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  register(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/register', value);
  }
  logIn(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/login', value);
  }
  fogotPassword(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/forgetPassword', value);
  }
  reserPassword(value:any):Observable<any> {
    return this._HttpClient.post(environment.baseURL+'/api/Account/ResetPassword', value);
  }
  getCurrentUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.get(environment.baseURL+'/api/Account/GetCurrentUser',{headers});
  }
  updateNextLecture(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${localStorage.getItem('userToken')}`
    })
    return this._HttpClient.put(environment.baseURL+`/api/Account/Proceed/${id}`,id,{headers});
  }

  saveUser():void {
    let token = JSON.stringify(localStorage.getItem('userToken'));
    let decode:any = jwtDecode(token);
    this.userData.next(decode);

  }
}
