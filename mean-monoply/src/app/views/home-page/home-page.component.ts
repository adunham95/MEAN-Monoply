import { Component, OnInit } from '@angular/core';
import { ActionsService} from "../../services/actions.service"
import { LocationsService} from "../../services/locations.service"
import {flatMap} from "tslint/lib/utils";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  diceNumberOne: number;
  diceNumberTwo: number;
  diceDoubles: boolean;
  diceTotal: number;

  message: string;

  locations: any;
  purchaseable: boolean;
  // username: String;
  // name: String;

  user: any;

  constructor(
    private actionService: ActionsService,
    private locationService: LocationsService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.reloadLocations();
    this.user = {
      _id: 1,
      name: 'Adrian',
      username: 'adunham',
      money: 500,
      ownedProperties: [],
      location: 0
  };
  }

  movePlayer(){
    this.purchaseable = false;
    this.message = null;

    this.diceNumberOne = this.actionService.getDiceRoll();
    this.diceNumberTwo = this.actionService.getDiceRoll();
    this.diceDoubles = this.doublesCheck(this.diceNumberOne, this.diceNumberTwo);
    this.diceTotal = this.diceNumberOne + this.diceNumberTwo;

    // Sets the new location  number in the array.
    const newLocation = this.user.location + this.diceTotal;
    if(newLocation >= this.locations.length){
      //If the number is larger then the array it finds the difference and moves the user to that location
      this.user.location = newLocation - this.locations.length
    }
    else {
      this.user.location = newLocation
    }

    //Grabs the users current location information
    const userLocation = this.locations[this.user.location];

    //Checks to see if the location is a property
    if(userLocation.type === 'property'){
      //Checks to see if the property is owned. If the player does not own the property then a button pops up where the user can purchase it
      if(userLocation.owned === false){
        //Checks to see if the user has the money to purchase the property
        if(this.user.money > this.locations[this.user.location].cost){
          this.purchaseable = true;
        }
      }

      //If the property is owned
      if(userLocation.owned === true){
        //Checks to see if the property is owned but the current player, if not it takes rent from the player
        if (userLocation.ownedBy !== this.user.name){
          const rent = userLocation.rent[userLocation.buildings];
          this.message = "You have to pay rent of " + rent;
          this.user.money = this.user.money - rent;
        }
      }
    }
    if(userLocation.type === 'action'){
      if(userLocation.actions[0].type === 'money'){
        this.user.money = this.user.money + userLocation.actions[0].money;
        this.message = userLocation.actions[0].message
      }
      if(userLocation.actions[0].type === 'goToJail'){
        this.message = userLocation.actions[0].message;
        this.user.location = 8
      }
    }

    if(this.user.money < 0){
      this.message = "BANKRUPT"
    }

  }

  doublesCheck(diceOne, diceTwo){
    if (diceOne === diceTwo){
      return true
    }
    else {
      return false
    }

  }

  purchaseProperty(userID, propertyID, propertyIndex){
    console.log(userID);
    console.log(propertyID);
    //Takes the money out of the users account
    this.user.money = this.user.money - this.locations[propertyIndex].cost;

    this.locationService.purchaseUpdate(propertyID, userID.toString()).subscribe(data => {
      if(data.location.ok === 1){
        console.log("Successfully saved data");
        this.reloadLocations();
      }
      else {
        console.log("Err saved data");
        console.log(data);
      }
    });

    this.user.ownedProperties.push({property: this.locations[propertyIndex]});
    this.purchaseable = false;

  }

  resetGame() {
    console.log("Game reset")
  }


  reloadLocations(){
    this.locationService.getAllLocations().subscribe(locations =>{
      console.log(locations);
      this.locations = locations.locations
    }, err =>{
      console.log(err);
      return false
    });
  }

}
