import { Injectable } from '@angular/core';

@Injectable()
export class ActionsService {

  constructor() { }

  getDiceRoll(){
    return this.getRandomInt(1,7)

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
}
