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
  rolled: boolean;

  message: string;

  locations: any;
  purchaseable: boolean;
  userID: string;

  users: any;
  activeUser: any;
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

  movePlayer(userIndex){
    this.purchaseable = false;
    this.message = null;

    this.diceNumberOne = this.actionService.getDiceRoll();
    this.diceNumberTwo = this.actionService.getDiceRoll();
    this.diceDoubles = this.doublesCheck(this.diceNumberOne, this.diceNumberTwo);
    this.diceTotal = this.diceNumberOne + this.diceNumberTwo;

    let currentUser = this.activeUser;

    // Sets the new location  number in the array.
    const newLocation = currentUser.location + this.diceTotal;

    if(newLocation >= this.locations.length){
      //If the number is larger then the array it finds the difference and moves the user to that location
      currentUser.location = newLocation - this.locations.length
    }
    else {
      currentUser.location = newLocation
    }

    //Grabs the users current location information
    const userLocation = this.locations[currentUser.location];

    //Checks to see if the location is a property
    if(userLocation.type === 'property'){
      //Checks to see if the property is owned. If the player does not own the property then a button pops up where the user can purchase it
      if(userLocation.owned === false){
        //Checks to see if the user has the money to purchase the property
        if(currentUser.money > this.locations[currentUser.location].cost){
          this.purchaseable = true;
        }
      }

      //If the property is owned
      if(userLocation.owned === true){
        //Checks to see if the property is owned but the current player, if not it takes rent from the player
        if (userLocation.ownedBy !== currentUser.name){
          const rent = userLocation.rent[userLocation.buildings];
          this.message = "You have to pay rent of " + rent;
          currentUser.money = currentUser.money - rent;
        }
      }
    }
    if(userLocation.type === 'action'){
      if(userLocation.actions[0].type === 'money'){
        currentUser.money = currentUser.money + userLocation.actions[0].money;
        this.message = userLocation.actions[0].message
      }
      if(userLocation.actions[0].type === 'goToJail'){
        this.message = userLocation.actions[0].message;
        currentUser.location = 8
      }
    }

    if(currentUser.money < 0){
      this.message = "BANKRUPT"
    }

    this.profileService.setPlayerStatus(currentUser._id, true, currentUser.location).subscribe(data =>{
      console.log(data)
    });

    this.rolled = true;
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
    let currentUser = this.activeUser;
    let currentLoc = property;

    //Calls the location service to update the database
    this.locationService.purchaseUpdate(property._id, currentUser.name.toString()).subscribe(data => {
      if(data.location.ok === 1){


        let initialArray = currentUser.ownedProperties;
        let updatedArray = initialArray.push(currentLoc.name);
        //Calls the profile service to update with your purchase
        this.profileService.purchaseUpdate((currentUser.money - currentLoc.cost), currentUser._id, initialArray).subscribe(data =>{
          //Updates the user with the server info
          this.getUser()
        }, err =>{
          console.log(err);
          return false
        });
        //Updates the
        this.reloadLocations();
      }
      else {
        console.log("Err saved data");
        console.log(data);
      }
    });
    console.log("Successfully saved data");
    this.purchaseable = false;


  }

  resetGame() {
    console.log("Game reset")
  }


  reloadLocations(){
    this.locationService.getAllLocations().subscribe(locations =>{
      console.log(locations);
      this.locations = locations.locations;
      this.locations.sort(function (a, b) {
        return a.locationOnBoard - b.locationOnBoard;
      });
    }, err =>{
      console.log(err);
      return false
    });
  }

  getUser(){
    this.profileService.getAll().subscribe(user =>{
      console.log(user);
      this.users = user.user;
      this.activeUser = this.users.find(user  => user.active === true);
      // this.activeUser = this.activeUser;
      console.log(this.activeUser)
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

  endTurn(){
    this.rolled = false;
    this.purchaseable = false;
    let nextUserID =  this.users.indexOf(this.activeUser);
    nextUserID = nextUserID + 1;
    if(nextUserID >= this.users.length){
      //If the number is larger then the array it finds the difference and moves the user to that location
      nextUserID = 0
    }
    let nextUser = this.users[nextUserID];
    console.log(nextUser);

    //Changes Current User to status to false
    this.profileService.setPlayerStatus(this.activeUser._id, false, this.activeUser.location).subscribe(data =>{
      console.log(data)
    });
    //Changes Next user in the array to active true
    this.profileService.setPlayerStatus(nextUser._id, true, nextUser.location).subscribe(data =>{
      console.log(data)
    });
    this.getUser();
  }
}
