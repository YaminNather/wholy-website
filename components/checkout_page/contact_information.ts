export interface ContactInformation {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
}

export function createEmptyContactInformation(): ContactInformation {
    return {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    };
}