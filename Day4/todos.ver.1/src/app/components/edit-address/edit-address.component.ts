import { Component, inject } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Address } from '../../models/person.model';
import { filter } from 'rxjs';

@Component({
    selector: 'app-edit-address',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './edit-address.component.html',
    styleUrl: './edit-address.component.scss',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: EditAddressComponent, multi: true },
        { provide: NG_VALIDATORS, useExisting: EditAddressComponent, multi: true }
    ]
})
export class EditAddressComponent implements ControlValueAccessor, Validator {

    private fnOnChange: (address: Address | null) => void = (x => { });
    private fnOnValidationChange: (_: any) => void = (x => { });
    private fnOnTuched: () => void = (() => { });

    addressForm = inject(FormBuilder).group({
        street: new FormControl<string>(''),
        city: new FormControl<string>('', [Validators.required]),
        homeNumber: new FormControl<number>(0)
    }, []);

    constructor() {
        this.addressForm.valueChanges
            .subscribe(values => {
                this.fnOnChange(values as Address);
                this.fnOnValidationChange(null);
            });
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        if (this.addressForm.valid) {
            return null;
        } else {
            return { 'AddressNotValid': true };
        }
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.fnOnValidationChange = fn;
    }

    writeValue(obj: Address | null): void {
        if (obj) {
            this.addressForm.patchValue(obj, { emitEvent: false });
        }
    }
    registerOnChange(fn: any): void {
        this.fnOnChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.fnOnTuched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.addressForm.disable();
        } else {
            this.addressForm.enable();
        }
    }




}
