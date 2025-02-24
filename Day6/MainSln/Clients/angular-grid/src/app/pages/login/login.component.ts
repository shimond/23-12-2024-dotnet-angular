import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthApiService } from '../../services/apis/auth-api.service';
import { AuthStore } from '../../store/auth-store.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
    selector: 'app-login',
    imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export default class LoginComponent {

    store = inject(AuthStore);
    loginForm = inject(FormBuilder).group({
        userName: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required])
    });


    login() {
            this.store.login(this.loginForm.value as LoginRequest);
    }


}
