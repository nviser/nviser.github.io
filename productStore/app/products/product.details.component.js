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
// import {Product} from './product';
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.service.getProduct(+params['id']); })
            .subscribe(function (product) { return _this.product = product; });
    };
    ProductDetailsComponent.prototype.gotoProducts = function () {
        this.router.navigate(['/products']);
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            // selector: 'prod-det',
            templateUrl: 'product.details.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, products_service_1.ProductsService])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product.details.component.js.map