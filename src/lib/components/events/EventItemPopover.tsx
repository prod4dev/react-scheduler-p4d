import { MouseEvent } from "react";
import { Box, IconButton, Popover, Typography, useTheme } from "@mui/material";
import useStore from "../../hooks/useStore";
import { ProcessedEvent } from "../../types";
import { PopperInner } from "../../styles/styles";
import EventActions from "./Actions";
import { differenceInDaysOmitTime, getHourFormat } from "../../helpers/generals";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import { format } from "date-fns";

type Props = {
  event: ProcessedEvent;
  anchorEl: Element | null;
  onTriggerViewer: (el?: MouseEvent<Element>) => void;
};

const EventItemPopover = ({ anchorEl, event, onTriggerViewer }: Props) => {
  const {
    triggerDialog,
    onDelete,
    events,
    handleState,
    triggerLoading,
    customViewer,
    viewerExtraComponent,
    fields,
    resources,
    resourceFields,
    locale,
    viewerTitleComponent,
    hourFormat,
    translations,
    onEventEdit,
  } = useStore();
  const theme = useTheme();
  const hideDates = differenceInDaysOmitTime(event.start, event.end) <= 0 && event.allDay;
  const hFormat = getHourFormat(hourFormat);
  const idKey = resourceFields.idField;
  const hasResource = resources.filter((res) =>
    Array.isArray(event[idKey]) ? event[idKey].includes(res[idKey]) : res[idKey] === event[idKey]
  );

  const handleDelete = async () => {
    try {
      triggerLoading(true);
      let deletedId = event.event_id;
      // Trigger custom/remote when provided
      if (onDelete) {
        const remoteId = await onDelete(deletedId);
        if (remoteId) {
          deletedId = remoteId;
        } else {
          deletedId = "";
        }
      }
      if (deletedId) {
        onTriggerViewer();
        const updatedEvents = events.filter((e) => e.event_id !== deletedId);
        handleState(updatedEvents, "events");
      }
    } catch (error) {
      console.error(error);
    } finally {
      triggerLoading(false);
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => {
        onTriggerViewer();
      }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {typeof customViewer === "function" ? (
        customViewer(event, () => onTriggerViewer())
      ) : (
        <PopperInner>
          <Box
            sx={{
              bgcolor: event.color || theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <div className="rs__popper_actions">
              <div>
                <IconButton
                  size="small"
                  onClick={() => {
                    onTriggerViewer();
                  }}
                >
                  <ClearRoundedIcon color="disabled" />
                </IconButton>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {(event as any).customerPhone && (
                  <IconButton
                    size="small"
                    component="a"
                    href={`https://wa.me/${String((event as any).customerPhone).replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hola! Cómo estás?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    sx={{ color: "#25D366" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </IconButton>
                )}
                <EventActions
                  event={event}
                  onDelete={handleDelete}
                  onEdit={() => {
                    onTriggerViewer();
                    triggerDialog(true, event);

                    if (onEventEdit && typeof onEventEdit === "function") {
                      onEventEdit(event);
                    }
                  }}
                />
              </div>
            </div>
            {viewerTitleComponent instanceof Function ? (
              viewerTitleComponent(event)
            ) : (
              <Typography style={{ padding: "5px 0" }} noWrap>
                {event.title}
              </Typography>
            )}
          </Box>
          <div style={{ padding: "5px 10px" }}>
            <Typography
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              color="textSecondary"
              variant="caption"
              noWrap
            >
              <EventNoteRoundedIcon />
              {hideDates
                ? translations.event.allDay
                : `${format(event.start, `dd MMMM yyyy ${hFormat}`, {
                    locale: locale,
                  })} - ${format(event.end, `dd MMMM yyyy ${hFormat}`, {
                    locale: locale,
                  })}`}
            </Typography>
            {hasResource.length > 0 && (
              <Typography
                style={{ display: "flex", alignItems: "center", gap: 8 }}
                color="textSecondary"
                variant="caption"
                noWrap
              >
                <SupervisorAccountRoundedIcon />
                {hasResource.map((res) => res[resourceFields.textField]).join(", ")}
              </Typography>
            )}
            {viewerExtraComponent instanceof Function
              ? viewerExtraComponent(fields, event)
              : viewerExtraComponent}
          </div>
        </PopperInner>
      )}
    </Popover>
  );
};

export default EventItemPopover;
