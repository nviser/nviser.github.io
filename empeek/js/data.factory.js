app.factory('dataFactory', dataFactory);
function dataFactory() {
    var factory = [
        {
            name: "First item with custom name",
            id: 1,
            quantity: 2,
            comments: [
                {
                    comment: "Totally agreed with owner, it's cool"
                },
                {
                    comment: "Yeah, but not cheap.."
                }
            ]
        },
        {
            name: "Second item is active",
            id: 2,
            quantity: 3,
            comments: [
                {
                    comment: "I'm not shure"
                },
                {
                    comment: "+1"
                },
                {
                    comment: "Ok"
                }
            ]
        },
        {
            name: "Third item",
            id: 3,
            quantity: 2,
            comments: [
                {
                    comment: "Ask my partner asap"
                },
                {
                    comment: "I'll be waiting"
                }
            ]
        }
    ]
    return factory;
}