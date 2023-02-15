export class Address {
    public constructor(streetAddress0: string, streetAddress1: string, city: string, state: string, pinCode: number) {        
        this.streetAddress0 = streetAddress0;
        this.streetAddress1 = streetAddress1;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
    }
    
    
    public readonly streetAddress0: string;
    public readonly streetAddress1: string;
    public readonly city: string;
    public readonly state: string;
    public readonly pinCode: number;
}