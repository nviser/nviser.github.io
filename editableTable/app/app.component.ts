import { Component, OnInit } from '@angular/core';
import { Service } from './service';

class Todo {

    constructor(public header: string,
        public dataIndex: any,
        public editable: boolean) { }

}

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    providers: [Service]
})

export class AppComponent implements OnInit {

    title: string = 'Angular2. Editable table';
    todos: Todo[];
    curCell: any;

    constructor ( private _dataService: Service) {}

    ngOnInit() {
        this.getData();
    }
    getData() {
        this._dataService.getTodos().then(todos => this.todos = todos);
    }

    edit(todo: Todo, event: any) {
        let target = event.target || event.srcElement;
        if (event.type == "click") {
            (target.tagName == 'TD') ? this.curCell = target : this.curCell = target.closest('td');
            target.focus();
            todo.editable = false;
        }
        else if (target.innerText == todo.dataIndex && (event.which == 13 || event.type == "dblclick")) {
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
    }
    switchOn() {
        let that = this;
        setTimeout(function () {
            that.curCell.getElementsByTagName('input')[0].focus();
        }, 0)
    }
    action(todo: Todo, event: any) {
        let target = event.target || event.srcElement;
        if (event.keyCode == 27) {
            todo.editable = !todo.editable;
            this.curCell.focus();
        } else if (event.keyCode == 13 && target.value.trim()) {
            todo.dataIndex = target.value;
            todo.editable = !todo.editable;
            this.curCell.focus();
        } else if (event.type == 'focusout') {
            todo.editable = false;
        }
    }

}