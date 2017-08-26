import { Component, OnInit } from '@angular/core';
import { ActionsService} from "../../services/actions.service"
import { LocationsService} from "../../services/locations.service";
import { ProfileService} from "../../services/profile.service"
import {init} from "protractor/built/launcher";

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
  userID: string;

  user: any;
  name: any;

  constructor(
    private actionService: ActionsService,
    private locationService: LocationsService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.reloadLocations();
    this.getUser();
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

  purchaseProperty(user, property, propertyIndex){
    console.log(user);
    console.log(property);

    let currentUser = user;
    let currentLoc = property;
    //Takes the money out of the users account

    this.locationService.purchaseUpdate(property._id, user.name.toString()).subscribe(data => {
      if(data.location.ok === 1){
        let initialArray = currentUser.ownedProperties
        let updatedArray = initialArray.push(currentLoc.name);
        console.log("Successfully saved data");
        console.log(initialArray);
        console.log('Starting Sync');
        this.profileService.purchaseUpdate((this.user.money - currentLoc.cost), currentUser._id, initialArray).subscribe(data =>{
          console.log(data);
          this.getUser()
        }, err =>{
          console.log(err);
          return false
        });
        this.reloadLocations();
      }
      else {
        console.log("Err saved data");
        console.log(data);
      }
    });


    // this.user.ownedProperties.push({property: this.locations[propertyIndex]});
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

  getUser(){
    this.userID = localStorage.getItem('userId');
    this.profileService.getUser(this.userID).subscribe(user =>{
      console.log(user);
      this.user = user.user
    }, err =>{
      console.log(err);
      return false
    });
  }

  newUser(){
    this.profileService.createProfile(this.name).subscribe(data =>{
      console.log(data);
      localStorage.setItem('userId', data.user._id);
      this.getUser()
    }, err =>{
      console.log(err);
      return false
    });
  }

}
