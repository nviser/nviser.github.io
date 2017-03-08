app.service('actFactory', actFactory);
function actFactory() {
    var obj = {
        add: function (item) {
            var id = 0, items = JSON.parse(localStorage.getItem('items'));
            angular.forEach(items, function (val, key) {
                if (val.id > id) id = val.id;
            });
            items.push({ name: item, id: id + 1, quantity: 0, comments: [] });
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        delete: function (item) {
            var index, items = JSON.parse(localStorage.getItem('items'));

            angular.forEach(items, function (val, key) {
                if (val.id == item.id) {
                    index = key;
                }
            });

            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        },
        newComment: function (id, comment) {
            var items = JSON.parse(localStorage.getItem('items'));
            angular.forEach(items, function (val, key) {
                if (val.id == id) {
                    items[key].comments.push({ comment: comment });
                    items[key].quantity++;
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
            return items;
        }
    }
    return obj;
}