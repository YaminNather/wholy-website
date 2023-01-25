import { useEffect, useState } from "react";

export function useIsFirstRender() {
    const [version, setVersion] = useState<number>(0);

    useEffect(() => setVersion(1), []);

    return version == 0;
};