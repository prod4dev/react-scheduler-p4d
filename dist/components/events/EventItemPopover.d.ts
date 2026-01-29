import { MouseEvent } from 'react';
import { ProcessedEvent } from '../../types';
type Props = {
    event: ProcessedEvent;
    anchorEl: Element | null;
    onTriggerViewer: (el?: MouseEvent<Element>) => void;
};
declare const EventItemPopover: ({ anchorEl, event, onTriggerViewer }: Props) => import("react/jsx-runtime").JSX.Element;
export default EventItemPopover;
