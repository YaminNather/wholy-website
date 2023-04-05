import { FirebaseApp } from "firebase/app";
import { Auth, browserLocalPersistence, browserSessionPersistence, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";

export class FirebaseCustomAuth {
    public static initializeAuth(app: FirebaseApp): Auth {
        return initializeAuth(
            app,
            {
                persistence: [
                    indexedDBLocalPersistence,
                    browserLocalPersistence,
                    browserSessionPersistence
                ]
            }
        );
    }

    public static getAuth(): Auth {
        return this._auth!;
    }

    private static _auth: Auth | null = null;
}