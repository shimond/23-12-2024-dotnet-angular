import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CoutnerService } from '../../services/coutner.service';
import { delay, tap } from 'rxjs';

@Component({
    selector: 'app-coutner',
    imports: [CommonModule],
    templateUrl: './coutner.component.html',
    styleUrl: './coutner.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoutnerComponent {

    y = signal(0);
    coutnerService = inject(CoutnerService);
    refChange = inject(ChangeDetectorRef);
    value = this.coutnerService.value;
    // value$ = this.coutnerService.value$.pipe(tap(x => console.log("Changed"), delay(50)));
    constructor() {
        setInterval(() => {
            this.y.update(o=> o + 1);
         }, 1000);
    }

    testChanged() {
        console.log('testChanged');
    }

    increment() {
        this.coutnerService.increment();

    }

    decrement() {
        this.coutnerService.decrement();
    }
}

