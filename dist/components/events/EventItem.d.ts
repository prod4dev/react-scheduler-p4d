import { ProcessedEvent } from '../../types';
interface EventItemProps {
    event: ProcessedEvent;
    multiday?: boolean;
    hasPrev?: boolean;
    hasNext?: boolean;
    showdate?: boolean;
}
declare const EventItem: ({ event, multiday, hasPrev, hasNext, showdate }: EventItemProps) => import("react/jsx-runtime").JSX.Element;
export default EventItem;
