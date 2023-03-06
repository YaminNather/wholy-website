import { NextPage } from "next";

const SessionStorageTestDispatcherPage: NextPage = (props) => {
    return (
        <>
            <button
                onClick={(event) => {
                    window.localStorage.setItem("order_id", "order_id_10");
                }}
            >
                UPDATE SESSION STORAGE
            </button>
        </>
    );
};

export default SessionStorageTestDispatcherPage;