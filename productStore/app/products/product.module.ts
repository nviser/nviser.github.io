import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductDetailsComponent} from './product.details.component';
import {ProductDetailsComponent2} from './product.details.component2';
import {ProductListComponent} from './product.list.component';
import {ProductsService} from './products.service';
import {ProductRoutingModule} from './product-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductDetailsComponent,
        ProductDetailsComponent2,
        ProductListComponent
    ],
    providers: [ProductsService]
})

export class ProductModule {}