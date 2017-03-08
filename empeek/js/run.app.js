app.run(function () {
    if (localStorage.getItem('items') == undefined) {
        var str = JSON.stringify(dataFactory());
        localStorage.setItem('items', str);
    }
});