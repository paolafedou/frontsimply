import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipeService} from '../../providers/recipe-service-rest';
import {FavoriteListPage} from '../favorite-list/favorite-list';


@Component({
    selector: 'page-recipe-detail',
    templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {

    recipe: any;
    personCount: number = 0;
    Ingredients: Array<any>;
    Names: Array<string>;


    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RecipeService: RecipeService, public toastCtrl: ToastController) {
        this.recipe = this.navParams.data;
        RecipeService.findById(this.recipe.id).then(
            recipe => this.recipe = recipe
        );
        this.Ingredients = this.recipe.ingredients;
        
    }

    openCart() {
    this.navCtrl.push(FavoriteListPage);
    }

    add1person() {
        this.personCount = this.personCount + 1;
    }

    remove1person() {
        this.personCount = this.personCount - 1;
    }

    addToCart(recipe) {
        this.RecipeService.addToCart(recipe, this.personCount)
            .then(recipe => {
                let toast = this.toastCtrl.create({
                    message: 'Recipe added to your cart for ' + this.personCount + ' people',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
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
