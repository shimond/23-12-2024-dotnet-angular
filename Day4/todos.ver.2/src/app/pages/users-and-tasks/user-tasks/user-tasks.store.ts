import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../../../models/todos.model";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { inject, computed } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tap, switchMap, catchError, of } from "rxjs";
import { TodosApiService } from "../../../services/apis/todos-api.service";

export interface TodoState {
    readonly keyword: string;
    readonly completedFilter: boolean; // null for showing all todos
    readonly isBusy: boolean;
    readonly results: Todo[];
}


const initState: TodoState = {
    keyword: '',
    completedFilter: false,
    isBusy: false,
    results: []
};

export const TodoStore = signalStore(
    {
        providedIn: 'root'
    },
    withDevtools('TodoStore'),
    withState(initState),
    withMethods((state, apiService = inject(TodosApiService)) => ({
        setUserId: rxMethod<number>(userId$ => userId$.pipe(
            tap(userId => patchState(state, { isBusy: true })),
            switchMap((userId) => apiService.getTodosByUser(userId)),
            tap(results => patchState(state, { results: results, isBusy: false }))
        )),

        markAsCompleted: rxMethod<number>(taskId$ => taskId$.pipe(
            switchMap(todoId => apiService.markAsCompleted(todoId)),
            tap((todo: Todo) => {
                patchState(state, { results: updateItem(state.results(), todo) })
            })
        )),

        setKeyword: rxMethod<string>(keywordToUpdate =>
            keywordToUpdate.pipe(tap(k => patchState(state, { keyword: k })))
        ),

        setCompletedFilter: rxMethod<boolean>(completedFilterToUpdate =>
            completedFilterToUpdate.pipe(tap(c => patchState(state, { completedFilter: c })))
        )
    })),
    withComputed((state) => ({
        filteredTodos: computed(() => {
            const filtered = state.results().filter(todo =>
                todo.completed == (state.completedFilter() ? true : todo.completed) &&
                todo.todo.toLowerCase().includes(state.keyword().toLowerCase())
            );
            return filtered;
        })
    })),
    withHooks((state) => ({
        onInit() {
        },
        onDestroy() {
        }
    }))
);


function updateItem(todos: Todo[], itemToUpdate: Todo) {
    return todos.map(item => {
        if (item.id == itemToUpdate.id) {
            return { ...itemToUpdate };
            //return itemToUpdate;
        }
        return item;
    });
}
