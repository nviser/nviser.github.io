import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// import {ProductDetailsComponent} from './products/product.details.component';
// import {ProductDetailsComponent2} from './products/product.details.component2';
import {PageNotFoundComponent} from './page.not.found.component';
// import {ProductListComponent} from './products/product.list.component';

const appRouts: Routes = [
    /*{path: '1', component: ProductDetailsComponent},
    {path: '2', component: ProductDetailsComponent2},
    {path: 'home', component: ProductListComponent},*/
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRouts)],
    //declarations: [ProductDetailsComponent, ProductDetailsComponent2, PageNotFoundComponent, ProductListComponent],
    exports: [RouterModule]
})

export class AppRoutingModule {

}