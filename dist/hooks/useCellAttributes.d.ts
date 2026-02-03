import { DragEvent } from 'react';
interface Props {
    start: Date;
    end: Date;
    resourceKey: string;
    resourceVal: string | number;
}
export declare const useCellAttributes: ({ start, end, resourceKey, resourceVal }: Props) => {
    [x: string]: string | number | boolean | ((e: DragEvent<HTMLButtonElement>) => void) | {
        backgroundColor: string;
        cursor: string;
        "&:hover": {
            backgroundColor: string;
        };
    } | {
        backgroundColor?: undefined;
        cursor?: undefined;
        "&:hover"?: undefined;
    } | undefined;
    tabIndex: number;
    disableRipple: boolean;
    disabled: boolean;
    title: string | undefined;
    sx: {
        backgroundColor: string;
        cursor: string;
        "&:hover": {
            backgroundColor: string;
        };
    } | {
        backgroundColor?: undefined;
        cursor?: undefined;
        "&:hover"?: undefined;
    };
    onClick: () => void;
    onDragOver: (e: DragEvent<HTMLButtonElement>) => void;
    onDragEnter: (e: DragEvent<HTMLButtonElement>) => void;
    onDragLeave: (e: DragEvent<HTMLButtonElement>) => void;
    onDrop: (e: DragEvent<HTMLButtonElement>) => void;
};
export {};
