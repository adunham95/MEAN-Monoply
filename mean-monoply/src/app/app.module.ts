import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";

// Component Imports
import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';

// Service Imports
import { ActionsService} from "./services/actions.service";
import { LocationsService} from "./services/locations.service";
import { ProfileService} from "./services/profile.service";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'user', component: ProfilePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
  ],
  providers: [ActionsService, LocationsService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
