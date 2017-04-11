import { Injectable } from '@angular/core';
import { todos } from './mock.data';

@Injectable ()
export class Service {
    getTodos () {
        return Promise.resolve(todos);
    }
}

