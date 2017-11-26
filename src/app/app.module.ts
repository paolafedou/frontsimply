import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {WelcomePage} from '../pages/welcome/welcome';
import {RecipeListPage} from '../pages/recipe-list/recipe-list';
import {RecipeDetailPage} from '../pages/recipe-detail/recipe-detail';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {CartDetailPage} from '../pages/cart-detail/cart-detail';
import {AboutPage} from '../pages/about/about';

import {RecipeService} from "../providers/recipe-service-rest";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    RecipeListPage,
    RecipeDetailPage,
    FavoriteListPage,
    CartDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    AboutPage,
    RecipeListPage,
    RecipeDetailPage,
    FavoriteListPage,
    CartDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RecipeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
