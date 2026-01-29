import { CellRenderedProps } from '../../types';
interface CellProps {
    day: Date;
    start: Date;
    height: number;
    end: Date;
    resourceKey: string;
    resourceVal: string | number;
    cellRenderer?(props: CellRenderedProps): React.ReactNode;
    children?: React.ReactNode;
}
declare const Cell: ({ day, start, end, resourceKey, resourceVal, cellRenderer, height, children, }: CellProps) => string | number | bigint | boolean | Iterable<import('react').ReactNode> | Promise<string | number | bigint | boolean | import('react').ReactPortal | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>> | Iterable<import('react').ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
export default Cell;
