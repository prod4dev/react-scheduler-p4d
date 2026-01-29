import { CSSProperties } from 'react';
export type ButtonTabProps = {
    id: string | number;
    label: string | React.ReactNode;
    component: React.ReactNode;
};
interface ButtonTabsProps {
    tabs: ButtonTabProps[];
    tab: string | number;
    setTab(tab: string | number): void;
    variant?: "scrollable" | "standard" | "fullWidth";
    indicator?: "primary" | "secondary" | "info" | "error";
    style?: CSSProperties;
}
declare const ButtonTabs: ({ tabs, variant, tab, setTab, indicator, style, }: ButtonTabsProps) => import("react/jsx-runtime").JSX.Element;
export { ButtonTabs };
