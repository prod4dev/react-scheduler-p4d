import { DefaultResource, ProcessedEvent } from '../types';
type Props = {
    daysList: Date[];
    resource?: DefaultResource;
    events: ProcessedEvent[];
};
declare const WeekAgenda: ({ daysList, resource, events }: Props) => import("react/jsx-runtime").JSX.Element;
export { WeekAgenda };
