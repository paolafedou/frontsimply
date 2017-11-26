
import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipeService} from '../../providers/recipe-service-rest';
import {FavoriteListPage} from '../favorite-list/favorite-list';
import {RecipeDetailPage} from '../recipe-detail/recipe-detail';


@Component({
    selector: 'page-cart-detail',
    templateUrl: 'cart-detail.html'
})
export class CartDetailPage {

    cartItem: any;
    personCount: number = 0;
    recipe: any;
    Ingredients: Array<any>;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RecipeService: RecipeService, public toastCtrl: ToastController) {
        this.cartItem = this.navParams.data;
        this.recipe = this.cartItem.recipe;
        this.personCount = this.cartItem.personCount;

        RecipeService.findById(this.recipe.id).then(
            recipe => this.recipe = recipe
        );
        this.Ingredients = this.recipe.ingredients;
    }

    openCart() {
    this.navCtrl.push(FavoriteListPage);
    }

    add1Person() {
        this.personCount = this.personCount + 1;
    }

    remove1Person() {
        this.personCount = this.personCount - 1;
    }


    favorite(recipe) {
        this.RecipeService.favorite(recipe)
            .then(recipe => {
                let toast = this.toastCtrl.create({
                    message: 'Recipe added to your favorites',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    update() {
        // this.FavoriteList.deleteItem(this.recipe);
        this.navCtrl.push(RecipeDetailPage, this.recipe);
    }

    share(recipe) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('share via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('share via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('share via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('cancel share')
                }
            ]
        });

        actionSheet.present();
    }

}
