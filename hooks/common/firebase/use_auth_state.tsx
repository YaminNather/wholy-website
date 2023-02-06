import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAuthState(): boolean {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    
    useEffect(
        () => {
            const listenerUnsubscriber = getAuth().onAuthStateChanged(
                () => {
                    setIsLoggedIn(getAuth().currentUser !== null);
                }
            );

            return () => listenerUnsubscriber();
        }
    );

    return isLoggedIn;
}