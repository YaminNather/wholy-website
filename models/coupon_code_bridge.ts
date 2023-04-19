export abstract class CouponCodeBridge {
    public constructor(name: string) {
        this.name = name;
    }

    public abstract pullFromDatabase(): Promise<void>;

    public abstract updateDatabase(): Promise<void>;

    public isAvailable(): boolean {
        return this._remaining! > 0;
    }

    public get discount(): number {
        return this._discount!;
    }

    public async use(): Promise<void> {
        await this.pullFromDatabase();

        if (this._remaining! < 1) throw new CouponWithCodeNotAvailableException(this.name);
        --this._remaining!;

        await this.updateDatabase();
    }



    protected readonly name: string;
    
    protected pulledFromDatabase: boolean = false;
    
    protected _remaining?: number;
    protected _discount?: number;

}

export class CouponWithCodeNotAvailableException extends Error {
    public constructor(code: string) {
        super(`Coupon with code ${code} not available`);
    }
}