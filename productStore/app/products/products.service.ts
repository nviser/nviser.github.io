import {Injectable} from '@angular/core';

export class Product {
  constructor(public id: number, public name: string, public description: string, public price: number, image: string) { }
}

let PRODUCTS = [
    { name: "Snickers", id: 1, description: "Light and fast", price: 100, image: "snickers.jpg" },
    { name: "Trousers", id: 2, description: "Cosy and comfortable", price: 25, image: "trousers.jpg" },
    { name: "Jeans", id: 3, description: "Good fashion", price: 120, image: "jeans.jpg" },
    { name: "Pyjama", id: 4, description: "Warm silk", price: 150, image: "pyjama.jpg" },
    { name: "Shirt", id: 5, description: "White and long sleevs", price: 99, image: "shirt.jpg" },
    { name: "Trainers", id: 6, description: "Rapid speed and control", price: 75, image: "trainers.jpg" }
];

// import {PRODUCTS} from './mock-products';
// import {Product} from './product';

let productsPromise = Promise.resolve(PRODUCTS);

@Injectable()
export class ProductsService {
    getProducts() {
        return productsPromise;
    }

    getProduct(id: number | string) {
        return productsPromise.then(products => products.find(product => product.id === +id));
    }

}