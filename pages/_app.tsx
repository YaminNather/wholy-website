import '../styles/globals.scss'
import type { AppProps } from 'next/app';
import { FirebaseApp, FirebaseOptions, initializeApp } from '@firebase/app';
import { useEffect, useState } from 'react';
import "../styles/home_page_styles.scss";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoadingIndicatorModalWrapper } from '../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper';

export default function App({ Component, pageProps }: AppProps) {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isauthStateKnown, setIsAuthStateKnown] = useState<boolean>(false);

  useEffect(
    () => {
      initializeFirebaseApp();    
      console.log(`CustomLog: Initialized Firebase App`);

      const authStateListenerUnsubscriber = onAuthStateChanged(
        getAuth(),
        (user) => {
          console.log(`CustomLog: Auth state changed, login status = ${user !== null}`);
          setIsAuthStateKnown(true);
        }
    );      

      return () => authStateListenerUnsubscriber();
    },
    []
  );

  if(!isauthStateKnown) return <></>;

  return (
    <LoadingIndicatorModalWrapper>
      <Component {...pageProps} />
    </LoadingIndicatorModalWrapper>
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