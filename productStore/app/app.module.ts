import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
// import {ProductRoutingModule} from './products/product-routing.module';
import {ProductModule} from './products/product.module';
import {PageNotFoundComponent} from './page.not.found.component';
// import {ProductListComponent} from './products/product.list.component';

@NgModule({
    imports: [BrowserModule, ProductModule, AppRoutingModule],
    declarations: [
        AppComponent, 
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}