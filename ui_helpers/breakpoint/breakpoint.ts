export enum Breakpoint {
    extraSmall,
    small,
    medium,
    large,
    extraLarge
}

export const sizeToBreakpointMap: Map<number, Breakpoint> = new Map<Breakpoint, number>(
    [
        [Breakpoint.extraSmall, 576],
        [Breakpoint.small, 768],
        [Breakpoint.medium, 992],
        [Breakpoint.large, 1200],
        [Breakpoint.extraLarge, 1400]
    ]
);