import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class CoutnerService {

    // private valueChanged$ = new BehaviorSubject<number>(0);
    private valueChange = signal(0);

    // readonly value$ = this.valueChanged$.asObservable();
    readonly value = this.valueChange.asReadonly();

    constructor() { }

    increment() {
        this.valueChange.update(x => x + 1);
        // this.valueChanged$.next(this.valueChanged$.value + 1);
    }

    decrement() {
        this.valueChange.update(x => x - 1);
        // this.valueChanged$.next(this.valueChanged$.value - 1);
    }
}
