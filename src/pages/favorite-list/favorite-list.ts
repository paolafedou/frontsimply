import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecipeService} from '../../providers/recipe-service-rest';
import {RecipeDetailPage} from '../recipe-detail/recipe-detail';

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    cartItems: Array<any>;
    recipesForSearch: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;

    constructor(public navCtrl: NavController, public service: RecipeService) {
        this.getCart();
    }

    itemTapped(recipe) {
        this.navCtrl.push(RecipeDetailPage, recipe.show);
    }

    deleteItem(recipe) {
        this.service.removeFromCart(recipe)
            .then(() => {
                this.getCart();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getCart() {
        this.service.getCart()
        .then(data => {
                this.cartItems = data;
                this.recipesForSearch = data;
                console.log("data", this.cartItems);
                })
    }

}
