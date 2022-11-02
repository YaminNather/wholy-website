import { NextPage } from "next";
import { signInWithEmailAndPassword, AuthError, AuthErrorCodes, getAuth } from "firebase/auth";
import styles from "../styles/sign_up_page_styles.module.scss";
import { useState } from "react";

const LoginPage: NextPage = () => {
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
                            await signInWithEmailAndPassword(getAuth(), email, password);
                            window.location.href = "/";
                        }
                        catch(error) {
                            const authError: AuthError = error as AuthError;
                            console.error(`CustomLog: ${authError}`);                                                                                    

                            alert("Error while logging in, please try again");
                            resetFields();
                        }
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;