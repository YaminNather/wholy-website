import { useEffect, useMemo, useState } from "react";
import { Breakpoint, sizeToBreakpointMap } from "./breakpoint";

export function useBreakpoint(): Breakpoint {        
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(calculateBreakpoint(window.innerWidth));

    useEffect(
        () => {
            const onWindowResize = (event: UIEvent) => {
                const windowInnerWidth: number = window.innerWidth;
                setBreakpoint(calculateBreakpoint(windowInnerWidth));
            };

            window.addEventListener("resize", onWindowResize);

            return () => window.removeEventListener("resize", onWindowResize);
        }
    );

    return breakpoint;
}

function calculateBreakpoint(windowInnerWidth: number): Breakpoint {
    const breakpoints: Breakpoint[] = Array.from(sizeToBreakpointMap.keys());
    const breakpointWidths: number[] = Array.from(sizeToBreakpointMap.values());

    for (let i: number = 0; i < breakpoints.length; i++) {
        if (windowInnerWidth <= breakpointWidths[i]) return breakpoints[i];        
    }    
    
    return breakpoints[breakpoints.length - 1];
}