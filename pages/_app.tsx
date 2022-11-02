import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import "../styles/home_page_styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(
    () => {
      initializeFirebaseApp();

      // const authStateListenerUnsubscriber = onAuthStateChanged(
      //     getAuth(),
      //     (user) => {
      //         setIsLoggedIn(getAuth().currentUser !== null);
      //     }
      // );

      // return () => authStateListenerUnsubscriber();
    },
    []
);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

function initializeFirebaseApp(): FirebaseApp {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig: FirebaseOptions = {
      apiKey: "AIzaSyD76iHhBNeIs6-bgfv5Gg0IzaGB7rkovU0",
      authDomain: "wholy-website.firebaseapp.com",
      projectId: "wholy-website",
      storageBucket: "wholy-website.appspot.com",
      messagingSenderId: "774799882708",
      appId: "1:774799882708:web:aaf3bef72e1fb0a56ffe41",
      measurementId: "G-6DGYYHJ9L6"
  };

  return initializeApp(firebaseConfig);
}