import { DefaultResource, ProcessedEvent } from '../../types';
type Props = {
    daysList: Date[];
    hours: Date[];
    cellHeight: number;
    minutesHeight: number;
    resource?: DefaultResource;
    resourcedEvents: ProcessedEvent[];
};
declare const WeekTable: ({ daysList, hours, cellHeight, minutesHeight, resourcedEvents, resource, }: Props) => import("react/jsx-runtime").JSX.Element;
export default WeekTable;
