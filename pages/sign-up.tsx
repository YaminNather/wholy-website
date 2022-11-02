import { NextPage } from "next";
import { useState } from "react";
import { createUserWithEmailAndPassword, AuthError, AuthErrorCodes, getAuth } from "firebase/auth";
import styles from "../styles/sign_up_page_styles.module.scss";

const SignUpPage: NextPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const resetFields = () => {
        setEmail("");
        setPassword("");
    };

    return (
        <div className={styles.form_container}>
            <div className={styles.form}>
                <input id="email_field" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

                <input 
                    className={styles.password_field} id="password_field" placeholder="Password" 
                    value={password} onChange={(event) => setPassword(event.target.value)} 
                />

                <button 
                    onClick={async () => {
                        try {
                            await createUserWithEmailAndPassword(getAuth(), email, password);
                            window.location.href = "/";
                        }
                        catch(error) {
                            const authError: AuthError = error as AuthError;
                            console.error(`CustomLog: ${authError}`);
                            
                            let alertMessage: string = "";
                            if(authError.code === AuthErrorCodes.EMAIL_EXISTS) alertMessage = "Account already exists!!";
                            else alertMessage = "Error while signing in, please try again";

                            alert(alertMessage);
                            resetFields();
                        }
                    }}
                >
                    Sign up
                </button>
            </div>
        </div>
    );
};

export default SignUpPage;