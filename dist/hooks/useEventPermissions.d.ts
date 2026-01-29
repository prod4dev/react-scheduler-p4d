import { ProcessedEvent } from '../types';
declare const useEventPermissions: (event: ProcessedEvent) => {
    canEdit: boolean | undefined;
    canDelete: boolean | undefined;
    canDrag: boolean | undefined;
};
export default useEventPermissions;
