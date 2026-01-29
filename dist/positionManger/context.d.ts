export type PositionManagerState = {
    renderedSlots: {
        [day: string]: {
            [resourceId: string]: {
                [eventId: string]: number;
            };
        };
    };
};
type PositionManagerProps = {
    setRenderedSlot(day: string, eventId: string, position: number, resourceId?: string): void;
};
export declare const PositionContext: import('react').Context<PositionManagerState & PositionManagerProps>;
export {};
