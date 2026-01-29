import { Locale } from 'date-fns';
interface TodayTypoProps {
    date: Date;
    onClick?(day: Date): void;
    locale: Locale;
}
declare const TodayTypo: ({ date, onClick, locale }: TodayTypoProps) => import("react/jsx-runtime").JSX.Element;
export default TodayTypo;
