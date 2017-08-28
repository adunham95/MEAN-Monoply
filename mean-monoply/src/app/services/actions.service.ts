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

  getChance(){
    let chanceCard =[
      {msg: 'Advance to go', pay: -200, moveTo: 0},
      {msg: 'Advance to Illinois Ave', moveTo: 24},
      {msg: 'Advance to St Charles Place', moveTo: 11},
      {msg: 'Advance to Boardwalk', moveTo: 39},
      {msg: 'Bank Pays Dividend of 50', pay: -50},
      {msg: 'Speeding tax', pay: 15},
      {msg: 'Go back 3 Spaces', move: -3},
      {msg: 'YOu have won a crossword competition', pay: -300},
      {msg: 'Advance to go', pay: -200, moveTo: 0},
      {msg: 'Bank error in your favor', pay: -200 },
      {msg: 'Doctors fee', pay: 50 },
      {msg: 'Go to Jail', moveTo: 10 },
      {msg: 'Holiday Funds Matures', pay: -100 },
      {msg: 'Income Tax Refund', pay: -50 },
      {msg: 'Life Insurance Matures', pay: -100 },
      {msg: 'Hospital Fees of $100', pay: 100 },
      {msg: 'Pay School fees of $150', pay: 150 },
      {msg: 'Receive $25 consulting fee', pay: -25 },
      {msg: 'You won first prize at a beauty contest', pay: -200 },
      {msg: 'You won second prize at a beauty contest', pay: -10 },
      {msg: 'You won third prize at a beauty contest', pay: -1 },
      {msg: 'Your rich uncle dies and you collect his inheritance of $500', pay: -500 },
    ];

    let chanceNumber = this.getRandomInt(1, chanceCard.length);

    return chanceCard[chanceNumber];
  }
}
