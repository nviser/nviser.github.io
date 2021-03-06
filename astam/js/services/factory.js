angular.module('BeautySalon')
    .factory('getData', ['$resource', 'api', function ($resource, api) { 
        return {
            userOrders: function () {
               return $resource(api + 'v1/userorders', {}, {query:{method:'GET', params: { access_token : '@access_token' }, isArray: true}});
            },
            cancelOrders: function () {
               return $resource(api + 'v1/userorders/cancel', {}, {query:{method:'GET', params: { access_token : '@access_token', id : '@id' }}});
            },
            branches: function () {
                return $resource(api + 'v1/process', {}, {query:{method:'GET', isArray: true}});
            },
            services: function () {
                return $resource(api + 'v1/process', {}, {query:{method:'GET', params: { item_id : '@item_id' }, isArray: true}});
            },
            specialists: function () {
                return $resource(api + 'v1/process', {}, {query:{method:'GET', params: { item_id : '@item_id', service_id : '@service_id' }, isArray: true}});
            },
            availableDates: function() {
                return $resource(api + 'v1/process', {}, {query:{method:'GET', params: { item_id : '@item_id', service_id : '@service_id', person_id : '@person_id' }, isArray: true}});                
            }
        }
    }]);
            /*specialists: function () {
                return [
                        {
                            person_id: '1',
                            name: 'Рита Чобанян',
                            job: 'Парикмахер'
                        },
                        {
                            person_id: '2',
                            name: 'Мальвина Узунян',
                            job: 'Парикмахер'
                        },
                        {
                            person_id: '3',
                            name: 'Андрей Ермаков',
                            job: 'Парикмахер'
                        },
                        {
                            person_id: '4',
                            name: 'Иван Петров',
                            job: 'Парикмахер'
                        },
                        {
                            person_id: '5',
                            name: 'Мария Климова',
                            job: 'Парикмахер'
                        }
                ]
            },*/
            /*salons: function () {
                return [
                        {
                            id: '1',
                            name: 'Белиссимо на Зелёном проспекте',
                            address: 'ул. 1-я Владимирская д.14'
                        },
                        {
                            id: '2',
                            name: 'Белиссимо на Зелёном проспекте',
                            address: 'ул. 1-я Владимирская д.14'
                        },
                        {
                            id: '3',
                            name: 'Белиссимо на Зелёном проспекте',
                            address: 'ул. 1-я Владимирская д.14'
                        },
                        {
                            id: '4',
                            name: 'Белиссимо на Зелёном проспекте',
                            address: 'ул. 1-я Владимирская д.14'
                        },
                        {
                            id: '5',
                            name: 'Белиссимо м. Перово',
                            address: 'ул. 1-я Владимирская д.14'
                        },
                        {
                            id: '6',
                            name: 'Белиссимо м. Авиамоторная',
                            address: 'ул. Солдатская д.10'
                        },
                        {
                            id: '7',
                            name: 'Белиссимо м. Авиамоторная',
                            address: 'ул. Авиамоторная д.51'
                        },
                        {
                            id: '8',
                            name: 'Белиссимо на Зелёном проспекте',
                            address: 'Зелёный пр-т, д.42'
                        },
                        {
                            id: '9',
                            name: 'Белиссимо на Братиславской',
                            address: 'ул. Новомарьинская, д.14/15'
                        },
                        {
                            id: '10',
                            name: 'Белиссимо на Лермонтовском Проспекте',
                            address: 'Лермонтовский пр-т, д.2, к'
                        },
                        {
                            id: '11',
                            name: 'Белиссимо на Лермонтовском Проспекте',
                            address: 'Лермонтовский пр-т, д.2, к'
                        }
                    ]
            },*/
            /*services: function () {
                return [
                            {
                                id: '1',
                                name: 'Ведущий VIP педикюр.маникюр',
                                services: [
                                            {
                                                service_id: '1',
                                                name: 'Простой',
                                                price: '150',
                                            },
                                            {
                                                service_id: '2',
                                                name: 'С бальзамами',
                                                price: '300'
                                            },
                                            {
                                                service_id: '3',
                                                name: 'Freestyle neet',
                                                price: '500'
                                            },
                                            {
                                                service_id: '4',
                                                name: 'Праздничный',
                                                price: '220'
                                            },
                                            {
                                                service_id: '5',
                                                name: 'VIP педикюр',
                                                price: '200'
                                            }
                                ]
                            },
                            {
                                id: '2',
                                name: 'Ведущий VIP гель-лак',
                                services: [
                                            {
                                                service_id: '6',
                                                name: 'Fairytale-gel',
                                                price: '110'
                                            }
                                ]
                            },
                            {
                                id: '3',
                                name: 'VIP Шелак',
                                services: [
                                            {
                                                service_id: '7',
                                                name: 'Шелак-мусс',
                                                price: '150'
                                            },
                                            {
                                                service_id: '8',
                                                name: 'Шелак-гель',
                                                price: '250'
                                            }
                                ]
                            },
                            {
                                id: '4',
                                name: 'Детские стрижки',
                                services: [
                                            {
                                                service_id: '9',
                                                name: 'Стрижка челки',
                                                price: '50'
                                            },
                                            {
                                                service_id: '10',
                                                name: 'Стрижки детская до 6 лет',
                                                price: '70'
                                            },
                                            {
                                                service_id: '11',
                                                name: 'Стрижки детская с 6 до 10 лет',
                                                price: '100'
                                            },
                                            {
                                                service_id: '12',
                                                name: 'Детская стрижка под машинку',
                                                price: '120'
                                            },
                                            {
                                                service_id: '13',
                                                name: 'Стрижка для девочек (до 10 лет)',
                                                price: '200'
                                            }
                                        ]
                            },
                            {
                                id: '5',
                                name: 'Ведущий VIP гостевой сервис',
                                services: [
                                            {
                                                service_id: '14',
                                                name: 'Простой',
                                                price: '150'
                                            },
                                            {
                                                service_id: '15',
                                                name: 'С бальзамами',
                                                price: '300'
                                            },
                                            {
                                                service_id: '16',
                                                name: 'Freestyle neet',
                                                price: '500'
                                            }
                                ]
                            },
                            {
                                id: '6',
                                name: 'Стрижка челки',
                                services: []
                            },
                            {
                                id: '7',
                                name: 'Стрижки детская до 6 лет',
                                services: []
                            },
                            {
                                id: '8',
                                name: 'Стрижки детская с 6 до 10 лет',
                                services: []
                            },
                            {
                                id: '9',
                                name: 'Детская стрижка под машинку',
                                services: []
                            },
                            {
                                id: '10',
                                name: 'Стрижка для девочек (до 10 лет)',
                                services: []
                            }
                        ]
            },*/
            /*branches: function () {
                return [
                            {
                                id: '6',
                                name: 'Белиссимо на Братиславской',
                                address: 'ул. Новомарьинская, д.14/15',
                                lat: 55.654228,
                                long: 37.758500
                            },
                            {
                                id: '7',
                                name: 'Белиссимо м. Авиамоторная',
                                address: 'ул. Авиамоторная д.51',
                                lat: 55.74,
                                long: 37.72
                            },
                            {
                                id: '8',
                                name: 'Белиссимо на Зелёном проспекте',
                                address: 'Зелёный пр-т, д.42',
                                lat: 55.75283,
                                long: 37.805581
                            },
                            {
                                id: '9',
                                name: 'Белиссимо м. Семеновская',
                                address: 'ул. Ухтомская улица, 13',
                                lat: 55.769575,
                                long: 37.713935
                            },
                            {
                                id: '10',
                                name: 'Белиссимо на Тверской',
                                address: 'ул. Большая Бронная улица, 5',
                                lat: 55.760844,
                                long: 37.598070
                            }
                        ]
            },*/
            /*availableDates: function() {
                return [
                            {
                                id: '1',
                                date: 1492030800000, //13 Apr 2017
                                avalTime: [
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    }
                                ]
                            },
                            {
                                id: '2',
                                date: 1498078800000, //22 Jun 2017
                                avalTime: [
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    }
                                ]
                            },
                            {
                                id: '8',
                                date: 1493758800000,
                                avalTime:  [
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1493208000000, //15.00
                                        end: 1493209800000 //15.30
                                    },
                                    {
                                        start: 1493217000000, //17.30
                                        end: 1493218800000 //18.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    },
                                    {
                                        start: 1492072200000, //11.30
                                        end: 1492074000000 //12.00
                                    },
                                    {
                                        start: 1492081200000, //14.00
                                        end: 1492083000000 //14.30
                                    },
                                    {
                                        start: 1492063200000, //9.00
                                        end: 1492065000000
                                    }
                                ]
                            },
                            {
                                id: '9',
                                name: 'Белиссимо м. Семеновская',
                                address: 'ул. Ухтомская улица, 13',
                                lat: 55.769575,
                                long: 37.713935
                            },
                            {
                                id: '10',
                                name: 'Белиссимо на Тверской',
                                address: 'ул. Большая Бронная улица, 5',
                                lat: 55.760844,
                                long: 37.598070
                            }
                        ]
            }
        } */ //return ends
    