import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public items: any = [];
 public showToolbar;

  constructor(private nav: NavController) { 
    this.showToolbar =false; 

    this.items = [
  
      { title: "one" },
      { title: "two" },
      { title: "three" },
      { title: "four" },
      { title: "five" },
      { title: "six" }
    ];
  }
  

ionViewWillEnter() {
    // timeout would be a http request in a real application 
    window.setTimeout(() => {
        this.showToolbar = true;
    }, 1000);
}

  
  
  
  filterItems(searchTerm) {
    return this.items.filter(item  => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      this.showToolbar = true;
    });
  }
}

