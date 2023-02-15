import { Address } from "./address";

export abstract class StoredAddressBridge {
    public abstract existsInDatabase(): Promise<boolean>;

    public abstract pullFromDatabase(): Promise<void>;

    public abstract saveToDatabase(): Promise<void>;

    public get userId(): string {
        return this._userId!;
    }

    public get address(): Address | undefined {
        return this._address;
    }

    public set address(value: Address | undefined) {
        this._address = value;
    }


    protected _userId?: string;
    protected _address?: Address;
}