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
var core_1 = require('@angular/core');
var Product = (function () {
    function Product(id, name, description, price, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
    return Product;
}());
exports.Product = Product;
var PRODUCTS = [
    { name: "Snickers", id: 1, description: "Light and fast", price: 100, image: "snickers.jpg" },
    { name: "Trousers", id: 2, description: "Cosy and comfortable", price: 25, image: "trousers.jpg" },
    { name: "Jeans", id: 3, description: "Good fashion", price: 120, image: "jeans.jpg" },
    { name: "Pyjama", id: 4, description: "Warm silk", price: 150, image: "pyjama.jpg" },
    { name: "Shirt", id: 5, description: "White and long sleevs", price: 99, image: "shirt.jpg" },
    { name: "Trainers", id: 6, description: "Rapid speed and control", price: 75, image: "trainers.jpg" }
];
// import {PRODUCTS} from './mock-products';
// import {Product} from './product';
var productsPromise = Promise.resolve(PRODUCTS);
var ProductsService = (function () {
    function ProductsService() {
    }
    ProductsService.prototype.getProducts = function () {
        return productsPromise;
    };
    ProductsService.prototype.getProduct = function (id) {
        return productsPromise.then(function (products) { return products.find(function (product) { return product.id === +id; }); });
    };
    ProductsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map