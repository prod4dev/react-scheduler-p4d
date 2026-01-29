import { ProcessedEvent } from '../../types';
interface TodayEventsProps {
    todayEvents: ProcessedEvent[];
    today: Date;
    startHour: number;
    endHour: number;
    step: number;
    minuteHeight: number;
    direction: "rtl" | "ltr";
    timeZone?: string;
}
declare const TodayEvents: ({ todayEvents, today, startHour, endHour, step, minuteHeight, direction, timeZone, }: TodayEventsProps) => import("react/jsx-runtime").JSX.Element;
export default TodayEvents;
