import { FC, useEffect, useRef } from "react";

const BroadcastReceiverPage: FC = (props) => {
    const broadcastChannel = useRef<BroadcastChannel>(new BroadcastChannel("test_channel"));
    
    useEffect(
        () => {
            broadcastChannel.current.onmessage = (event) => {
                console.log(`Received data = ${event.data}`);
            };
        },
        []
    );

    return (
        <h1>BroadcastReceiverPage</h1>
    );
};

export default BroadcastReceiverPage;