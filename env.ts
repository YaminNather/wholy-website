export class Env {
    static get razorpayApiKey(): string {
        return process.env["NEXT_PUBLIC_RAZORPAY_API_KEY"]!;    
    }

    static get razorpaySecret(): string {
        return process.env["RAZORPAY_SECRET"]!;
    }

    static get shiprocketEmail(): string {
        return process.env["SHIPROCKET_EMAIL"]!;
    }

    static get shiprocketPassword(): string {
        return process.env["SHIPROCKET_PASSWORD"]!;
    }
}