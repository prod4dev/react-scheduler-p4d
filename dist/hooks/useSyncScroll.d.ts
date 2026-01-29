/**
 * The solution to make headers sticky with overflow
 */
declare const useSyncScroll: () => {
    headersRef: import('react').RefObject<HTMLDivElement | null>;
    bodyRef: import('react').RefObject<HTMLDivElement | null>;
};
export default useSyncScroll;
