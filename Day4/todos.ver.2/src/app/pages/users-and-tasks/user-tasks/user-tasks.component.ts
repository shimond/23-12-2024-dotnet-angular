import { Component, effect, inject, input } from '@angular/core';
import { TodoStore } from './user-tasks.store';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-user-tasks',
    imports: [MatTableModule, MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule],
    templateUrl: './user-tasks.component.html',
    providers: [TodoStore],
    styleUrl: './user-tasks.component.scss'
})
export class UserTasksComponent {

    userId = input.required<number>();

    searchControl = new FormControl<string>('');
    onlyCompletedControl = new FormControl<boolean>(false);

    store = inject(TodoStore);
    displayedColumns = ['id', 'todo', 'completed', 'actions'];

    ngOnInit(): void {
        // effect(()=> console.log(this.userId()))
        this.store.setUserId(this.userId);
        this.store.setKeyword(this.searchControl.valueChanges.pipe(map(x => x!)))
        this.store.setCompletedFilter(this.onlyCompletedControl.valueChanges.pipe(map(x => x!)))
    }
}
