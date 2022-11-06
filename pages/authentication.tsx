import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/authentication_page_styles.module.scss";
import companyLogoAsset from "../public/company-logo.png";
import backgroundImageAsset from "../public/green-textured-background.png";
import classNames from "classnames";
import { useCallback, useContext, useState } from "react";
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithCustomToken, signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import { LoadingIndicatorModalWrapper } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";
import GoogleLogoImage from "../public/social-media-logos/google.svg"; 

const AuthenticationPage: NextPage = () => {
    const router: NextRouter = useRouter();    

    const loadingIndicatorData: LoadingIndicatorModalWrapperData = useContext(loadingIndicatorModalWrapperDataContext)!;

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const resetFields = useCallback(
        (): void => {
            setEmail("");
            setPassword("");
        },
        [setEmail, setPassword]
    );

    const redirectOnAuthentication = useCallback(
        (): void => {
            if(router.query["from"] === "products" && router.query["action"] !== undefined) {
                router.push({
                    pathname: (router.query["action"] === "buy-now") ? "/checkout" : "/products",
                    query: {
                        "from": "authentication",
                        "action": router.query["action"],
                        "product": router.query["product"]
                    }
                });
            }
            else {
                router.push("/");
            }
        },
        []
    );

    const onClickLoginButton = useCallback(
        async (): Promise<void> => {
            console.log(`CustomLog: Signing up with:\nEmail: ${email}\nPassword: ${password}`);
            try {
                loadingIndicatorData.setIsLoading(true);
                await signInWithEmailAndPassword(getAuth(), email, password);
                loadingIndicatorData.setIsLoading(false);
                
                redirectOnAuthentication();
            }
            catch(error) {
                const authError: AuthError = error as AuthError;
                console.error(`CustomLog: ${authError}`);

                alert("Error while signing in, please try again");
                loadingIndicatorData.setIsLoading(false);
                resetFields();
            }
        },
        [email, password, loadingIndicatorData.setIsLoading, resetFields]
    );

    const onClickSignUpButton = useCallback(
        async (): Promise<void> => {            
            try {
                loadingIndicatorData.setIsLoading(true);
                
                await createUserWithEmailAndPassword(getAuth(), email, password);
                
                loadingIndicatorData.setIsLoading(false);
                
                redirectOnAuthentication();
            }
            catch(error) {
                const authError: AuthError = error as AuthError;
                console.error(`CustomLog: ${authError}`);
                
                let alertMessage: string = "";
                if(authError.code === AuthErrorCodes.EMAIL_EXISTS) alertMessage = "Account already exists!!";
                else alertMessage = "Error while signing up, please try again";
                
                alert(alertMessage);
                resetFields();                

                loadingIndicatorData.setIsLoading(false);
            }
        },
        [email, password, loadingIndicatorData.setIsLoading, resetFields]
    );

    const onClickGoogleSignInButton = useCallback(
        async (): Promise<void> => {
            const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();
            try {
                loadingIndicatorData.setIsLoading(true);
                await signInWithPopup(getAuth(), googleAuthProvider);
                loadingIndicatorData.setIsLoading(false);
                redirectOnAuthentication();
            }
            catch(error) {
                const authError: AuthError = error as AuthError;
                console.log(authError);
                
                alert("Error while signing up, please try again");
            }
        },
        []
    );

    return (
        <>
            <Image src={backgroundImageAsset} alt="" className="background_image" />
            
            <div className={classNames("container", styles.container)}>
                <Image src={companyLogoAsset} alt="" />

                <div className={styles.form}>
                    <label>Email</label>
                    
                    <input placeholder="johndoe@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    
                    <label>Password</label>
                    
                    <input placeholder="Password Here" value={password} onChange={(event) => setPassword(event.target.value)} />

                    <div className={styles.buttons_area}>
                        <button onClick={(event) => onClickSignUpButton()} className="button_yellow">SIGN UP</button>
                        
                        <button onClick={(event) => onClickLoginButton()} className={classNames("button_yellow", styles.login_button)}>LOGIN</button>
                    </div>

                    <button onClick={(event) => onClickGoogleSignInButton()} className={classNames(styles.social_login_button, styles.google_login_button)}>
                        <Image src={GoogleLogoImage} alt="" /> <span>Google</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AuthenticationPage;