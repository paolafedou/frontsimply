import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';
import 'rxjs/Rx';

let recipesURL = SERVER_URL + 'api/recipes/';

@Injectable()
export class RecipeService {
  favoriteCounter: number = 0;
  favorites: Array<any> = [];

  cartCounter: number = 0;
  cartItems: Array<any> = [];

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(recipesURL)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(recipesURL + "id/" + id)
            .map(res => res.json())
            .toPromise();
    }


    trouverCat(recipe) {
    return recipe.category === 'Healthy';
    }

    getFavorites() {
        return Promise.resolve(this.favorites);
    }

    favorite(recipe) {
        this.favoriteCounter = this.favoriteCounter + 1;
        this.favorites.push({id: this.favoriteCounter, recipe: recipe});
        return Promise.resolve();
    }

    getCart() {
        return Promise.resolve(this.cartItems);
    }

    addToCart(recipe, personCount) {
        this.cartCounter = this.cartCounter + 1;
        this.cartItems.push({id: this.cartCounter, recipe: recipe, personCount: personCount});
        console.log("cart :", this.cartItems);
        return Promise.resolve();
    }

    removeFromCart(recipe) {
        let index = this.cartItems.indexOf(recipe);
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }
        return Promise.resolve();
    }

    unfavorite(favorite) {
        let index = this.favorites.indexOf(favorite);
        if (index > -1) {
          this.favorites.splice(index, 1);
        }
        return Promise.resolve();
    }
}