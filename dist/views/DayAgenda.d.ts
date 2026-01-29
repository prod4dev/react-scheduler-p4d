import { DefaultResource, ProcessedEvent } from '../types';
type Props = {
    events: ProcessedEvent[];
    resource?: DefaultResource;
};
declare const DayAgenda: ({ events, resource }: Props) => import("react/jsx-runtime").JSX.Element;
export { DayAgenda };
