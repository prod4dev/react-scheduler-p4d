import { WeekProps } from '../../types';
interface WeekDateBtnProps {
    selectedDate: Date;
    onChange(value: Date): void;
    weekProps: WeekProps;
}
declare const WeekDateBtn: ({ selectedDate, onChange, weekProps }: WeekDateBtnProps) => import("react/jsx-runtime").JSX.Element;
export { WeekDateBtn };
