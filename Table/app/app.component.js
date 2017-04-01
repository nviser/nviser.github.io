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
var service_1 = require('./service');
var Todo = (function () {
    function Todo(header, dataIndex, editable) {
        this.header = header;
        this.dataIndex = dataIndex;
        this.editable = editable;
    }
    return Todo;
}());
var AppComponent = (function () {
    function AppComponent(_dataService) {
        this._dataService = _dataService;
        this.title = 'Angular2. Editable table';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    AppComponent.prototype.getData = function () {
        var _this = this;
        this._dataService.getTodos().then(function (todos) { return _this.todos = todos; });
    };
    AppComponent.prototype.edit = function (todo, event) {
        if (event.type == "click") {
            (event.srcElement.tagName == 'TD') ? this.curCell = event.srcElement : this.curCell = event.srcElement.closest('td');
            event.srcElement.focus();
            todo.editable = false;
        }
        else if (event.target.innerText == todo.dataIndex && (event.which == 13 || event.type == "dblclick")) {
            todo.editable = !todo.editable;
            this.switchOn();
        }
        else if (event.which == 39 && this.curCell.nextSibling.tagName == 'TD') {
            this.curCell.nextSibling.focus();
            this.curCell = this.curCell.nextSibling;
            todo.editable = false;
        }
        else if (event.which == 37 && this.curCell.previousSibling.tagName == 'TD') {
            this.curCell.previousSibling.focus();
            this.curCell = this.curCell.previousSibling;
            todo.editable = false;
        }
    };
    AppComponent.prototype.switchOn = function () {
        var that = this;
        setTimeout(function () {
            that.curCell.getElementsByTagName('input')[0].focus();
        }, 0);
    };
    AppComponent.prototype.action = function (todo, event) {
        if (event.keyCode == 27) {
            todo.editable = !todo.editable;
            this.curCell.focus();
        }
        else if (event.keyCode == 13 && event.target.value.trim()) {
            todo.dataIndex = event.target.value;
            todo.editable = !todo.editable;
            this.curCell.focus();
        }
        else if (event.type == 'focusout') {
            todo.editable = false;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            providers: [service_1.Service]
        }), 
        __metadata('design:paramtypes', [service_1.Service])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map