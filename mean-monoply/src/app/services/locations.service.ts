import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class LocationsService {

  locationID: string;
  user: string;


  constructor(
    private http: Http,
  ) { }


  getAllLocations(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:8080/locations/getlocations', {headers: headers}).map(res => res.json())
  }

  purchaseUpdate(locationID, user){
    console.log(typeof locationID);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/locations/update/purchase', {locationID: locationID, user: user}, {headers: headers}).map(res => res.json())
  }
}
