import { Component } from '@angular/core';

@Component({
    selector: 'app-stam',
    imports: [],
    templateUrl: './stam.component.html',
    styleUrl: './stam.component.scss'
})
export class StamComponent {

    logitStam() {
        console.log('stam');
    }
}
