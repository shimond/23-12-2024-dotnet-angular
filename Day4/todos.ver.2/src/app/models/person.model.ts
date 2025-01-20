export interface Person{
    readonly id:number;
    readonly name:string;
    readonly email:string;
    readonly homeAddress: Address;
    readonly workAddress: Address;
    // readonly hobbies: string[];
}

export interface Address{
    readonly city:string;
    readonly street:string;
    readonly homeNumber:number;
}