import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStore } from "../store/auth-store.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authStore = inject(AuthStore);
    if (authStore.isAuth() && authStore.token()) {
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${authStore.token()}`
            }
        })
    }
    return next(req);

};
