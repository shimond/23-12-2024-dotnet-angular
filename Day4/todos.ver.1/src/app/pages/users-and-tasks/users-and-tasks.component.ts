import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserStore } from './users-list.store';
import { UserTasksComponent } from "./user-tasks/user-tasks.component";

@Component({
    selector: 'app-users-and-tasks',
    imports: [
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        UserTasksComponent],
    templateUrl: './users-and-tasks.component.html',
    styleUrl: './users-and-tasks.component.scss'
})
export class UsersAndTasksComponent {
    store = inject(UserStore);
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'gender', 'email', 'phone', 'actions'];

}
