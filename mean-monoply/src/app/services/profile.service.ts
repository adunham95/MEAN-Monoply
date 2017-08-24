import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {

  user: any;

  constructor(
    private http: Http,
  ) { }

  createProfile(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/newuser', user, {headers: headers}).map(res => res.json())
  }

  getUser(userID){
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers}).map(res => res.json())
  }

}

