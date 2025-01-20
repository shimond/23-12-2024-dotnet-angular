import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoutnerComponent } from "./components/coutner/coutner.component";
import { StamComponent } from "./stam/stam.component";
import { ProductSearchComponent } from './pages/product-serach/product-search.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { HttpClient } from '@angular/common/http';
import { UserTasksComponent } from "./pages/users-and-tasks/user-tasks/user-tasks.component";
import { UsersAndTasksComponent } from "./pages/users-and-tasks/users-and-tasks.component";


@Component({
    selector: 'app-root',
    imports: [UserTasksComponent, UsersAndTasksComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
