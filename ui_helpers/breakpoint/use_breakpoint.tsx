import { useEffect, useMemo, useState } from "react";
import { Breakpoint, sizeToBreakpointMap } from "./breakpoint";

export function useBreakpoint(): Breakpoint {        
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.small);
    
    useEffect(
        () => {
            const onWindowResize = (event: UIEvent) => {
                const windowInnerWidth: number = window.innerWidth;

                const breakpoints: Breakpoint[] = Array.from(sizeToBreakpointMap.keys());
                const breakpointWidths: number[] = Array.from(sizeToBreakpointMap.values());

                let foundBreakpoint: boolean = false;
                for (let i: number = 0; i < breakpoints.length; i++) {
                    if (windowInnerWidth <= breakpointWidths[i]) {
                        foundBreakpoint = true;
                        setBreakpoint(breakpoints[i]);
                        break;
                    }
                }

                if (!foundBreakpoint) {
                    setBreakpoint(breakpoints[breakpoints.length - 1]);
                }
            };

            window.addEventListener("resize", onWindowResize);

            return () => window.removeEventListener("resize", onWindowResize);
        }
    );

    return breakpoint;
}