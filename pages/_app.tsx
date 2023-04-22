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
    apiKey: "AIzaSyADubrlGWbf3c8VTqQISdsvKMcsZL9IkMQ",
    authDomain: "wholy-46a83.firebaseapp.com",
    projectId: "wholy-46a83",
    storageBucket: "wholy-46a83.appspot.com",
    messagingSenderId: "354845138764",
    appId: "1:354845138764:web:f2b32d40c505c9ddaa39e9",
    measurementId: "G-5967QCBBN2"
  };

  return initializeApp(firebaseConfig);
}