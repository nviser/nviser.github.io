"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/add/operator/switchMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var products_service_1 = require('./products.service');
// import { Product } from './product';
var ProductListComponent = (function () {
    function ProductListComponent(
        // private _getProducts: ProductsService
        route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getProducts();
        this.products = this.route.params
            .switchMap(function (params) {
            _this.selectedId = +params['id'];
            return _this.service.getProducts();
        });
    };
    /*getProducts() {
        this._getProducts.getProducts().then(products => this.products = products);
    }*/
    ProductListComponent.prototype.isSelected = function (product) { return product.id === this.selectedId; };
    ProductListComponent.prototype.moveTo = function (product) {
        // console.log(product.id);
        this.router.navigate(['/product', product.id]);
    };
    ;
    ProductListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'product.list.component.html',
            providers: [products_service_1.ProductsService]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, products_service_1.ProductsService])
    ], ProductListComponent);
    return ProductListComponent;
}());
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=product.list.component.js.map