import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class ProfileService {

  user: any;

  constructor(
    private http: Http,
  ) { }

  createProfile(name) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/newuser', {name: name}, {headers: headers}).map(res => res.json())
  }

  getUser(userID){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/profile',{userID: userID},{headers: headers}).map(res => res.json())
  }

  getAll(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/allprofiles',{headers: headers}).map(res => res.json())
  }

  purchaseUpdate(money, userID, locationName){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/update/purchase', {money: money, _id: userID, locationName: locationName}, {headers: headers}).map(res => res.json())
  }

  setPlayerStatus(userID, status, currentLocation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/update/setActive', {status: status, userID: userID, location: currentLocation}, {headers: headers}).map(res => res.json())
  }
}

