import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class LocationsService {

  constructor(
    private http: Http,
  ) { }


  getAllLocations(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get('http://localhost:8080/locations/getlocations', {headers: headers}).map(res => res.json())
  }
}
