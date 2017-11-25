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

    openRecipeDetail(recipe: any) {
        console.log(recipe.category);
        this.navCtrl.push(RecipeDetailPage, recipe);
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
        this.recipes.forEach(recipe => {
            if (recipe.lat, recipe.lng) {
                let marker: any = leaflet.marker([recipe.lat, recipe.lng]).on('click', event => this.openRecipeDetail(event.target.data));
                marker.data = recipe;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
