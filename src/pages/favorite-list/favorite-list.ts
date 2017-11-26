import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RecipeService} from '../../providers/recipe-service-rest';
import {RecipeDetailPage} from '../recipe-detail/recipe-detail';
import {CartDetailPage} from '../cart-detail/cart-detail';
import leaflet from 'leaflet';

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
        this.navCtrl.push(CartDetailPage, recipe.show);
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
                })
    }

    openRecipeDetail(recipe: any) {
        this.navCtrl.push(RecipeDetailPage, recipe);
    }

    openCartDetail(cartItem: any) {
    this.navCtrl.push(CartDetailPage, cartItem);
    }

    recipeMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([48.85, 2.35], 10);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.recipeMarkers();
        })
    }

    recipeMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.map.addLayer(this.markersGroup);
    }

}
