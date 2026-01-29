interface CurrentTimeBarProps {
    startHour: number;
    step: number;
    minuteHeight: number;
    timeZone?: string;
    zIndex?: number;
}
declare const CurrentTimeBar: (props: CurrentTimeBarProps) => import("react/jsx-runtime").JSX.Element | null;
export default CurrentTimeBar;
