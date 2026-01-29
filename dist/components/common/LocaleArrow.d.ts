import { IconButtonProps } from '@mui/material';
import { MouseEvent } from 'react';
interface LocaleArrowProps extends Omit<IconButtonProps, "type"> {
    type: "prev" | "next";
    onClick?(e?: MouseEvent): void;
}
declare const LocaleArrow: ({ type, onClick, ...props }: LocaleArrowProps) => import("react/jsx-runtime").JSX.Element;
export { LocaleArrow };
