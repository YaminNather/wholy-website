import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";

const BroadcastEmitterPage: FC = (props) => {
    const broadcastChannelRef = useRef<BroadcastChannel>(new BroadcastChannel("test_channel"));

    const onEmitBroadcastButtonClicked = useCallback<MouseEventHandler>(
        (event) => {
            const channel: BroadcastChannel = broadcastChannelRef.current;
            channel.postMessage("Hi");
        },
        []
    );

    return (
        <button onClick={onEmitBroadcastButtonClicked}>EMIT BROADCAST</button>
    );
};

export default BroadcastEmitterPage;