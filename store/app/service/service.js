angular.module('store').factory('storeFactory', storeFactory);
    function storeFactory () {
        factory = [
            {
                id: 1,
                name: "Trainers",
                description: "Light and cosy",
                price: 100,
                img: "trainers.jpg"
            },
            {
                id: 2,
                name: "Jeans",
                description: "Comfortable to wear",
                price: 120,
                img: "jeans.jpg"
            },
            {
                id: 3,
                name: "Trousers",
                description: "Good fashioned",
                price: 95,
                img: "trousers.jpg"
            },
            {
                id: 4,
                name: "Pyjama",
                description: "For comfortable sleeping",
                price: 200,
                img: "pyjama.jpg"
            },
            {
                id: 5,
                name: "Shirt",
                description: "For business and meetings",
                price: 80,
                img: "shirt.jpg"
            },
            {
                id: 6,
                name: "Snickers",
                description: "Fast, rapid and good",
                price: 105,
                img: "snickers.jpg"
            }
        ]
        return factory;
    };
