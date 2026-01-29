import { View } from '../components/nav/Navigation';
import { DefaultResource, FieldProps, ProcessedEvent, ResourceFields, SchedulerProps } from '../types';
import { StateEvent } from '../views/Editor';
export declare const getOneView: (state: Partial<SchedulerProps>) => View;
export declare const getAvailableViews: (state: SchedulerProps) => View[];
export declare const arraytizeFieldVal: (field: FieldProps, val: any, event?: StateEvent) => {
    value: any;
    validity: any;
};
export declare const getResourcedEvents: (events: ProcessedEvent[], resource: DefaultResource, resourceFields: ResourceFields, fields: FieldProps[]) => ProcessedEvent[];
export declare const traversCrossingEvents: (todayEvents: ProcessedEvent[], event: ProcessedEvent) => ProcessedEvent[];
export declare const calcMinuteHeight: (cellHeight: number, step: number) => number;
export declare const calcCellHeight: (tableHeight: number, hoursLength: number) => number;
export declare const differenceInDaysOmitTime: (start: Date, end: Date) => number;
export declare const convertRRuleDateToDate: (rruleDate: Date) => Date;
export declare const getRecurrencesForDate: (event: ProcessedEvent, today: Date, timeZone?: string) => {
    start: Date;
    end: Date;
    convertedTz: boolean;
    event_id: number | string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    recurring?: import('rrule').RRule;
    disabled?: boolean;
    color?: string;
    textColor?: string;
    editable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    allDay?: boolean;
    agendaAvatar?: React.ReactElement | string;
}[];
export declare const filterTodayEvents: (events: ProcessedEvent[], today: Date, timeZone?: string) => ProcessedEvent[];
export declare const filterTodayAgendaEvents: (events: ProcessedEvent[], today: Date) => ProcessedEvent[];
export declare const sortEventsByTheLengthest: (events: ProcessedEvent[]) => ProcessedEvent[];
export declare const sortEventsByTheEarliest: (events: ProcessedEvent[]) => ProcessedEvent[];
export declare const filterMultiDaySlot: (events: ProcessedEvent[], date: Date | Date[], timeZone?: string, lengthOnly?: boolean) => ProcessedEvent[];
export declare const convertEventTimeZone: (event: ProcessedEvent, timeZone?: string) => {
    start: Date;
    end: Date;
    convertedTz: boolean;
    event_id: number | string;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    recurring?: import('rrule').RRule;
    disabled?: boolean;
    color?: string;
    textColor?: string;
    editable?: boolean;
    deletable?: boolean;
    draggable?: boolean;
    allDay?: boolean;
    agendaAvatar?: React.ReactElement | string;
};
export declare const getTimeZonedDate: (date: Date, timeZone?: string) => Date;
/**
 * Performs the reverse of getTimeZonedDate, IE: the given date is assumed
 * to already be in the provided timeZone and is reverted to the local
 * browser's timeZone.
 * @param date The date to convert.
 * @param timeZone The timeZone to convert from.
 * @returns A new date reverted from the given timeZone to local time.
 */
export declare const revertTimeZonedDate: (date: Date, timeZone?: string) => Date;
export declare const isTimeZonedToday: ({ dateLeft, dateRight, timeZone, }: {
    dateLeft: Date;
    dateRight?: Date;
    timeZone?: string;
}) => boolean;
export declare const getHourFormat: (hourFormat: "12" | "24") => "hh:mm a" | "HH:mm";
