import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Address, Person } from '../../models/person.model';
import { JsonPipe } from '@angular/common';
import { EditAddressComponent } from '../edit-address/edit-address.component';

@Component({
    selector: 'app-edit-person',
    imports: [ReactiveFormsModule, FormsModule, JsonPipe, EditAddressComponent],
    templateUrl: './edit-person.component.html',
    styleUrl: './edit-person.component.scss'
})
export class EditPersonComponent {

    personToEdit: Person = {
        id: 1, name: 'David Cohen', email: 'davidC@gmail.com', homeAddress: {
            homeNumber: 1,
            street: 'Hamoshia',
            city: 'Eilat'
        },
        workAddress: {
            homeNumber: 999,
            street: 'HaMatzbi',
            city: 'Jerusalem'
        }
    };

    personForm = inject(FormBuilder).group({
        id: new FormControl<number>(0),
        name: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>(''),
        homeAddress: new FormControl<Address | null>(null, [(e: AbstractControl)=> this.validAddress(e)]),
        workAddress: new FormControl<Address | null>(null)
});

    validAddress(f: AbstractControl): ValidationErrors | null {
        console.log('valid address', f.value);
        return null;
    }

    constructor() {
        this.personForm.patchValue(this.personToEdit);
        //  this.personForm.controls.address.valueChanges.subscribe(x=>x.)
    }






}
