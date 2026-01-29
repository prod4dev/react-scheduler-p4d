declare const usePosition: () => import('./context').PositionManagerState & {
    setRenderedSlot(day: string, eventId: string, position: number, resourceId?: string): void;
};
export default usePosition;
