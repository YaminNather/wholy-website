import { GoogleAuthProvider, User, UserCredential, getAuth, signInWithPopup } from "firebase/auth";

export class AuthenticationService {
    public async signInWithGoogle(): Promise<User> {
        const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
            const parameters: { [key: string]: string } = {
                "prompt": "select_account"
            };
            googleAuthProvider.setCustomParameters(parameters);
        const userCredential: UserCredential = await signInWithPopup(getAuth(), googleAuthProvider);

        return userCredential.user;
    }
}