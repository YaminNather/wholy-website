import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const CheckCurrentUserStatusPage: NextPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getAuth().currentUser !== null);

    useEffect(
        () => {
            const authStateListenerUnsubscriber = onAuthStateChanged(
                getAuth(),
                (user) => {
                    setIsLoggedIn(getAuth().currentUser !== null);
                }
            );

            return () => authStateListenerUnsubscriber();
        },
        []
    );

    return (
        <h1>Anybody logged in? {(isLoggedIn) ? "true" : "false"}</h1>
    );
};

export default CheckCurrentUserStatusPage;