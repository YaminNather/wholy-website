import { Auth, GoogleAuthProvider, User, UserCredential, browserPopupRedirectResolver, getAuth, signInWithPopup } from "firebase/auth";
import { FirebaseCustomAuth } from "../firebase_custom_auth/firebase_custom_auth";

export class AuthenticationService {
    public async signInWithGoogle(): Promise<User> {
        const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
            const parameters: { [key: string]: string } = {
                "prompt": "select_account"
            };
            googleAuthProvider.setCustomParameters(parameters);
        const userCredential: UserCredential = await signInWithPopup(
            getAuth(),
            googleAuthProvider,
            browserPopupRedirectResolver
        );

        return userCredential.user;
    }


    private auth: Auth = FirebaseCustomAuth.getAuth();
}