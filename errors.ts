export class NotSignedInError extends Error {
    public constructor() {
        super("User not signed in");
    }
}