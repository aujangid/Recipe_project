import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
onFetchRecipes() {
this.dataStore.fetchRecipes();
}

  constructor(private dataStore:DataStorageService){}
onSaveRecipes() {
this.dataStore.storeRecipes();
}
}
