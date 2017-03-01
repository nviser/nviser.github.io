import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product, ProductsService } from './products.service';
// import { Product } from './product';

@Component({
    moduleId: module.id,
    templateUrl: 'product.list.component.html',
    providers: [ProductsService]
})

export class ProductListComponent implements OnInit {
    products: Observable<Product[]>;
    private selectedId: number;
    constructor(
        // private _getProducts: ProductsService
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductsService
    ) { }
    ngOnInit() {
        // this.getProducts();
        this.products = this.route.params
        .switchMap((params: Params) => {
        this.selectedId = +params['id'];
        return this.service.getProducts();
      });
    }
    /*getProducts() {
        this._getProducts.getProducts().then(products => this.products = products);
    }*/

    isSelected(product: Product) { return product.id === this.selectedId; }

    moveTo(product: Product) {
        // console.log(product.id);
        this.router.navigate(['/product', product.id]);
    };
}