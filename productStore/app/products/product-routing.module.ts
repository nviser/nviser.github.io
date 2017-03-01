import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProductListComponent} from './product.list.component';
import {ProductDetailsComponent} from './product.details.component';

const productsRoutes: Routes = [
    {path: 'products', component: ProductListComponent},
    {path: 'product/:id', component: ProductDetailsComponent}
]

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ProductRoutingModule {

}