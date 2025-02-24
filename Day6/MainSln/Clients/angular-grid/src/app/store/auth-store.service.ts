import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { AuthApiService } from "../services/apis/auth-api.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { LoginRequest } from "../models/auth.model";
import { catchError, map, switchMap, tap } from "rxjs";

export interface AuthState {
    isAuth: boolean;
    userName: string | null;
    token: string | null;
}

const initState: AuthState =
{
    isAuth: false,
    token: null,
    userName: null
}


export const AuthStore = signalStore({
    providedIn: 'root'
},
    withState(initState),
    withMethods((state, apiService = inject(AuthApiService)) => ({
        login: rxMethod<LoginRequest>(ud$ => ud$.pipe(
            switchMap(loginDetails => apiService.login(loginDetails).pipe(
                map(resultFromServer => ({ ...loginDetails, ...resultFromServer })))),
            tap(x => {
                patchState(state, { token: x.token, isAuth: true, userName: x.userName });
            })
        ))
    })));
