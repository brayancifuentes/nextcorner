
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from "../services/data.service";


import { IonPullUpFooterState } from 'ionic-pullup';
import {
  ToastController,
  Platform
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: GoogleMap;
  address:string;
  public searchTerm: string = "";
  public items: any =[];

  footerState: IonPullUpFooterState;


  constructor(
    private dataService: DataService,
    public toastCtrl: ToastController,
    private platform: Platform,
    public navCtrl: NavController
    ) { this.footerState = IonPullUpFooterState.Collapsed; 
      this.items = [
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false },
        { expanded: false }
      ];
    }
    

    

  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
    this.setFilteredItems();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    
    this.goToMyLocation();
  }


  goToMyLocation(){
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });

      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        //title: 'hi',
        //snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      let marker2: Marker= this.map.addMarkerSync({
        icon: 'blue',
        animation: GoogleMapsAnimation.BOUNCE,
        position:{
          lat: 34.993370,
          lng: -119.273770,   
          
        }



      });
      //show the infoWindow
      //marker.showInfoWindow();

      

      
    })
    .catch(err => {
      //this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
    
  }


          footerExpanded() {
            console.log('Footer expanded!');
          }

          footerCollapsed() {
            console.log('Footer collapsed!');
          }

          toggleFooter() {
            this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
          }
          setFilteredItems() {
            this.items = this.dataService.filterItems(this.searchTerm);
          }

          expandItem(item): void {
            if (item.expanded) {
              item.expanded = false;
            } else {
              this.items.map(listItem => {
                if (item == listItem) {
                  listItem.expanded = !listItem.expanded;
                } else {
                  listItem.expanded = false;
                }
                return listItem;
              });
            }
          }

          
      
}
