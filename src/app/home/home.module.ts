import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { RouterModule } from "@angular/router";

import { HomePageRoutingModule } from './home-routing.module';

import { IonicPullupModule } from 'ionic-pullup';
import { ExpandableComponent } from "../components/expandable/expandable.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicPullupModule,
    RouterModule.forChild([
      {
        path:"",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ExpandableComponent]
})
export class HomePageModule {}


