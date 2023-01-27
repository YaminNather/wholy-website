export interface Address {
    streetAddress0: string;
    streetAddress1: string;
    city: string;
    state: string;
    pinCode: string;
}

export function createEmptyAddress(): Address {
    return {
        streetAddress0: "",
        streetAddress1: "",
        city: "",
        pinCode: "",
        state: "Tamil Nadu"
    };
}