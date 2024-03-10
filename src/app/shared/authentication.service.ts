import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Users } from './Users';
import { Credentials } from './Credentials';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private basePath='http://localhost:3000/users';
  
  constructor(private http: HttpClient) { }
  login(credentials:Credentials):Observable<any>{
    return this.http.get(`${this.basePath}?username=${credentials.username}&password=${credentials.password}`);
  }
  register(user:Users):Observable<any>{
    return this.http.post(this.basePath,user)
  }
  getlastuserid():Observable<any>{
    return this.http.get(this.basePath);
  }
  isLoggedIn():boolean{
    let token=localStorage.getItem("username") ?? '';
    if(token!="")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
