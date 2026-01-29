import { ProcessedEvent } from '../../types';
interface AgendaEventsListProps {
    day: Date;
    events: ProcessedEvent[];
}
declare const AgendaEventsList: ({ day, events }: AgendaEventsListProps) => import("react/jsx-runtime").JSX.Element;
export default AgendaEventsList;
