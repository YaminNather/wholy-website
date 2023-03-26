export class Env {
    public static get environment(): string {
        return process.env["NEXT_PUBLIC_ENVIRONMENT"]!;
    }

    public static get url(): string {
        return process.env["NEXT_PUBLIC_URL"]!;
    }

    public static get razorpayApiKey(): string {
        return process.env["NEXT_PUBLIC_RAZORPAY_API_KEY"]!;    
    }

    public static get razorpaySecret(): string {
        return process.env["RAZORPAY_SECRET"]!;
    }

    public static get shiprocketEmail(): string {
        return process.env["SHIPROCKET_EMAIL"]!;
    }

    public static get shiprocketPassword(): string {
        return process.env["SHIPROCKET_PASSWORD"]!;
    }

    public static get ccAvenueWorkingKey(): string {
        return process.env["CCAVENUE_WORKING_KEY"]!;
    }

    public static get ccAvenueAccessCode(): string {
        return process.env["NEXT_PUBLIC_CCAVENUE_ACCESS_CODE"]!;
    }
    
    public static get stripeSecretKey(): string {
        return process.env["STRIPE_SECRET_KEY"]!;
    }

    public static get stripePublishableKey(): string {
        return process.env["NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"]!;
    }
}