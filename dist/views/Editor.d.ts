import { SelectedRange } from '../store/types';
import { FieldInputProps, InputTypes, ProcessedEvent } from '../types';
export type StateItem = {
    value: any;
    validity: boolean;
    type: InputTypes;
    config?: FieldInputProps;
};
export type StateEvent = (ProcessedEvent & SelectedRange) | Record<string, any>;
declare const Editor: () => import("react/jsx-runtime").JSX.Element;
export default Editor;
