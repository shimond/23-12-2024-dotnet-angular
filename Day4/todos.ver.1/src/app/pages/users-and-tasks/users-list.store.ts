import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { signalStore, withState, withMethods, patchState, withHooks } from "@ngrx/signals";
import { of, delay, tap, switchMap } from "rxjs";
import { UserInfo } from "../../models/todos.model";
import { TodosApiService } from "../../services/apis/todos-api.service";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";

interface UserStoreState {
    users: UserInfo[];
    isBusy: boolean;
    selectedUser: UserInfo | null;
}

const initState: UserStoreState = {
    users: [],
    isBusy: false,
    selectedUser: null
};

export const UserStore = signalStore(
    {
        providedIn: 'root'
    },
    withDevtools('UserStore'), // Enable devtools (optional)
    withState(initState), // Set initial state
    withMethods((state, apiService = inject(TodosApiService)) => ({
        load: rxMethod<void>(p$ => p$.pipe(
            tap(x => patchState(state, { isBusy: true })),
            switchMap(() => apiService.getAllUsers()),
            tap(results => patchState(state, { users: results, isBusy: false }))
        )),
        setCurrentUser: rxMethod<number>(p$ => p$.pipe(
            tap(userId => patchState(state, { selectedUser: state.users().find(o => o.id == userId) }))
        ))
    })),
    withHooks((state) => ({
        onInit() {
            state.load();
        },
        onDestroy() {
        }
    }))

);
