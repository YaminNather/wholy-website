import { NextPage } from "next";
import { useEffectClientSide } from "../hooks/common/use_effect_client_side";
import { useEffect } from "react";

const SessionStorageTestPage: NextPage = (props) => {
    useEffect(
        () => {
            const listener = (event: StorageEvent) => {
                console.log(`Session Storage updated`);
            };
            
            window.addEventListener("storage", listener);

            return () => window.removeEventListener("storage", listener);
        }        
    );

    return (
        <>
            <button
                onClick={(event) => {
                    window.sessionStorage.setItem("order_id", "order_id_0");
                }}
            >
                UPDATE SESSION STORAGE
            </button>
        </>
    );
};

export default SessionStorageTestPage;