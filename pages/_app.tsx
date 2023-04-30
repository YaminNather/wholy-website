import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { FirebaseApp, initializeApp } from '@firebase/app';
import { useEffect, useRef, useState } from 'react';
import "../styles/home_page_styles.scss";
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoadingIndicatorModalWrapper } from '../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper';
import { GlobalCartWrapper } from '../components/common/cart/global_cart_wrapper';
import { FirebaseCustomAuth } from '../firebase_custom_auth/firebase_custom_auth';

//

export default function App({ Component, pageProps }: AppProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isauthStateKnown, setIsAuthStateKnown] = useState<boolean>(false);  

  useEffect(
    () => {
      const firebaseApp: FirebaseApp = initializeFirebaseApp();
      const auth: Auth = FirebaseCustomAuth.initializeAuth(firebaseApp);

      const authStateListenerUnsubscriber = onAuthStateChanged(
        getAuth(),
        (user) => {
          setIsAuthStateKnown(true);
        }
      );

      if(typeof(window) !== "undefined") {
        localStorage.setItem("visited", "true");
      }

      return () => authStateListenerUnsubscriber();
    },
    []
  );

  if(!isauthStateKnown) return <></>;

  return (
    <LoadingIndicatorModalWrapper>
      <GlobalCartWrapper>
        <Component {...pageProps} />
      </GlobalCartWrapper>
    </LoadingIndicatorModalWrapper>
  );
}

function initializeFirebaseApp(): FirebaseApp {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
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