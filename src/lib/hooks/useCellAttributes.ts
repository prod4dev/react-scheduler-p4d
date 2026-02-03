import { DragEvent, useMemo } from "react";
import { alpha, useTheme } from "@mui/material";
import useStore from "./useStore";
import { revertTimeZonedDate } from "../helpers/generals";

interface Props {
  start: Date;
  end: Date;
  resourceKey: string;
  resourceVal: string | number;
}
export const useCellAttributes = ({ start, end, resourceKey, resourceVal }: Props) => {
  const {
    triggerDialog,
    onCellClick,
    onDrop,
    currentDragged,
    setCurrentDragged,
    editable,
    timeZone,
    isCellDisabled,
    disabledCellLabel,
    availableCellLabel,
  } = useStore();
  const theme = useTheme();

  const isDisabled = useMemo(() => {
    if (isCellDisabled && typeof isCellDisabled === "function") {
      return isCellDisabled(start, end, resourceKey, resourceVal);
    }
    return false;
  }, [isCellDisabled, start, end, resourceKey, resourceVal]);

  const cellEditable = editable && !isDisabled;

  return {
    tabIndex: cellEditable ? 0 : -1,
    disableRipple: !cellEditable,
    disabled: isDisabled,
    title: isDisabled ? disabledCellLabel : availableCellLabel,
    sx: isDisabled
      ? {
          backgroundColor: alpha(theme.palette.grey[400], 0.3),
          cursor: "not-allowed",
          "&:hover": {
            backgroundColor: alpha(theme.palette.grey[400], 0.4),
          },
        }
      : {},
    onClick: () => {
      if (isDisabled) return;

      if (editable) {
        triggerDialog(true, {
          start,
          end,
          [resourceKey]: resourceVal,
        });
      }

      if (onCellClick && typeof onCellClick === "function") {
        onCellClick(start, end, resourceKey, resourceVal);
      }
    },
    onDragOver: (e: DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isDisabled) return;
      if (currentDragged) {
        e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
      }
    },
    onDragEnter: (e: DragEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (currentDragged) {
        e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
      }
    },
    onDragLeave: (e: DragEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (currentDragged) {
        e.currentTarget.style.backgroundColor = "";
      }
    },
    onDrop: (e: DragEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      if (currentDragged && currentDragged.event_id) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "";
        const zonedStart = revertTimeZonedDate(start, timeZone);
        onDrop(e, currentDragged.event_id.toString(), zonedStart, resourceKey, resourceVal);
        setCurrentDragged();
      }
    },
    [resourceKey]: resourceVal,
  };
};
