import { DefaultResource } from '../../types';
type Props = {
    daysList: Date[];
    resource?: DefaultResource;
    eachWeekStart: Date[];
};
declare const MonthTable: ({ daysList, resource, eachWeekStart }: Props) => import("react/jsx-runtime").JSX.Element;
export default MonthTable;
