import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {RecipeService} from '../../providers/recipe-service-rest';

@Component({
    selector: 'page-recipe-detail',
    templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {

    recipe: any;

    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public RecipeService: RecipeService, public toastCtrl: ToastController) {
        this.recipe = this.navParams.data;
        RecipeService.findById(this.recipe.id).then(
            recipe => this.recipe = recipe
        );
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
