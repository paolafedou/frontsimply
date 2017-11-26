import {Component, ViewChild} from '@angular/core';
import { Slides, NavController } from 'ionic-angular';
import {RecipeListPage} from '../recipe-list/recipe-list';
import {FavoriteListPage} from '../favorite-list/favorite-list';

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
  @ViewChild(Slides) slides: Slides;
  categories: Array<any>;

    constructor(public navCtrl: NavController) {
        this.categories = [{"name" : "Healthy", "img" : "assets/img/Healthy.jpg"},{"name" : "Noel", "img" : "assets/img/Noel.jpg"},{"name" : "Automne", "img" : "assets/img/Automne.jpg"}];

    }
    ngAfterViewInit() {
      this.slides.pager = true;
    }

    openRecipeList() {
        this.navCtrl.push(RecipeListPage);
    }

    openRecipeListCat(category) {
        console.log(category);
        this.navCtrl.push(RecipeListPage,category);
    }

    openCart() {
    this.navCtrl.push(FavoriteListPage);
    }
}