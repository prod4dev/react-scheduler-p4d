import { ProcessedEvent } from '../../types';
interface MonthEventProps {
    events: ProcessedEvent[];
    resourceId?: string;
    today: Date;
    eachWeekStart: Date[];
    eachFirstDayInCalcRow: Date | null;
    daysList: Date[];
    onViewMore(day: Date): void;
    cellHeight: number;
}
declare const MonthEvents: ({ events, resourceId, today, eachWeekStart, eachFirstDayInCalcRow, daysList, onViewMore, cellHeight, }: MonthEventProps) => import("react/jsx-runtime").JSX.Element;
export default MonthEvents;
