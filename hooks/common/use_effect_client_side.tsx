import { DependencyList, EffectCallback, useEffect } from "react";

export function useEffectClientSide(effect: EffectCallback, dependencyList?: DependencyList): void {
    useEffect(
        () => {
            if (typeof(window) === "undefined") return;

            effect();
        }, 
        dependencyList
    );
}