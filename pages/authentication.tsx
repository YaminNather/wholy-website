import { NextPage } from "next";
import Image from "next/image";
import styles from "../styles/authentication_page_styles.module.scss";
import classNames from "classnames";
import { useCallback, useContext, useMemo, useState } from "react";
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { NextRouter, useRouter } from "next/router";
import { LoadingIndicatorModalWrapperData, loadingIndicatorModalWrapperDataContext } from "../components/loading_indicator_modal_wrapper/loading_indicator_modal_wrapper_data";

import GoogleLogoImage from "../public/social-media-logos/google.svg"; 
import { greenPlant1Image, yellowPlant0Image } from "../common_imported_images/plants";
import haloImage from "../public/authentication/halo.png";
import dotsSet1Image from "../public/authentication/dots-set-1.png";
import dotsSet2Image from "../public/authentication/dots-set-2.png";
import { AuthenticationService } from "../models/authentication_service";

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
            if(router.query["from"] === "shop" && router.query["action"] !== undefined) {
                const query: any = {
                    "from": "authentication",
                    "action": router.query["action"],
                    "product": router.query["product"]
                };

                router.push({pathname: "/shop", query: query});
            }
            else if (router.query["from"] === "product" && router.query["action"] !== undefined) {
                const product: string = router.query["product"] as string;
                const query: any = {
                    "from": "authenticaton",
                    "action": router.query["action"],
                    "product": product,
                    "quantity": router.query["quantity"]
                };
                
                router.push({ pathname: `/product/${product}`, query: query });
            }
            else {
                router.push("/");
            }
        },
        []
    );

    const onClickLoginButton = useCallback(
        async (): Promise<void> => {
            try {
                loadingIndicatorData.setIsLoading(true);
                
                await signInWithEmailAndPassword(getAuth(), email, password);
                alert("Signed in");
                
                loadingIndicatorData.setIsLoading(false);
                
                redirectOnAuthentication();
            }
            catch(error) {
                const authError: AuthError = error as AuthError;

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
                alert("Signed up");
                
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
            const authenticationService: AuthenticationService = new AuthenticationService();
            
            loadingIndicatorData.setIsLoading(true);
            try {
                await authenticationService.signInWithGoogle();
            }
            catch(error) {
                const authError: AuthError = error as AuthError;                
                alert("Error while signing up, please try again");
                loadingIndicatorData.setIsLoading(false);
                return;
            }

            loadingIndicatorData.setIsLoading(false);
            redirectOnAuthentication();
        },
        []
    );    

    return (
        <div className={classNames("light_theme", styles.authentication_page)}>
            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.yellow_plant0)} />
            
            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.yellow_plant1)} />
            
            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.green_plant0)} />
            
            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.green_plant1)} />

            <Image src={dotsSet1Image} alt="" className={classNames("background_prop", styles.dots_set_1)} />
            
            <Image src={dotsSet2Image} alt="" className={classNames("background_prop", styles.dots_set_2)} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.form}>
                    <Image src={haloImage} alt="" className={styles.halo} />

                    <div className={styles.input_with_label_container}>
                        <label>Email</label>
                        
                        <input placeholder="johndoe@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    
                    <div className={styles.input_with_label_container}>
                        <label>Password</label>
                        
                        <input type="password" placeholder="Password Here" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>

                    <div className={styles.buttons_area}>
                        <button onClick={(event) => onClickSignUpButton()}>SIGN UP</button>
                        
                        <button onClick={(event) => onClickLoginButton()} className={styles.login_button}>LOGIN</button>
                    </div>

                    <button 
                        onClick={(event) => onClickGoogleSignInButton()} 
                        className={classNames(styles.social_login_button, styles.google_login_button)}
                    >
                        <Image src={GoogleLogoImage} alt="" /> <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;