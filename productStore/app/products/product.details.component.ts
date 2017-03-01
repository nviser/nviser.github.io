import 'rxjs/add/operator/switchMap';
import {Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Product, ProductsService} from './products.service';
// import {Product} from './product';

@Component({
    moduleId: module.id,
    // selector: 'prod-det',
    templateUrl: 'product.details.component.html'
})

export class ProductDetailsComponent implements OnInit {
    product: Product;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductsService
) {}

    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.service.getProduct(+params['id']))
        .subscribe((product: Product) => this.product = product);
    }

    gotoProducts() {
        this.router.navigate(['/products']);
    }
}