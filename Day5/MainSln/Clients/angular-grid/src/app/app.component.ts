import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import CoutnerComponent from "./components/coutner/coutner.component";
import { StamComponent } from "./stam/stam.component";
import ProductSearchComponent from './pages/product-serach/product-search.component';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    value = signal(10);
    valueMul10 = computed(() => this.value() * 10);
    title = 'angular-19-ex';
    constructor() {
        //subscribe
        // effect(() => console.log(this.value() + " Changed"));
    }

    flag = false;
    changeVis() {
        this.flag = !this.flag;
    }

    logIt() {
        console.log('log from app.component');
    }

    changeTheSignal() {
        this.value.set(5555);
    }
}
