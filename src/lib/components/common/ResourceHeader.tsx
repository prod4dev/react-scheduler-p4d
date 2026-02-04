import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { DefaultResource } from "../../types";
import useStore from "../../hooks/useStore";

interface ResourceHeaderProps {
  resource: DefaultResource;
}
const ResourceHeader = ({ resource }: ResourceHeaderProps) => {
  const { resourceHeaderComponent, resourceFields, direction, resourceViewMode } = useStore();
  const theme = useTheme();

  const text = resource[resourceFields.textField];
  const subtext = resource[resourceFields.subTextField || ""];
  const avatar = resource[resourceFields.avatarField || ""];
  const color = resource[resourceFields.colorField || ""];

  if (resourceHeaderComponent instanceof Function) {
    return resourceHeaderComponent(resource);
  }

  return (
    <ListItem
      sx={{
        padding: resourceViewMode === "tabs" ? "0 8px" : "2px 10px",
        textAlign: direction === "rtl" ? "right" : "left",
        minWidth: "auto",
        ...(resourceViewMode === "tabs"
          ? { gap: 1 }
          : resourceViewMode === "vertical"
            ? {
                display: "block",
                textAlign: "center",
                position: "sticky",
                top: 4,
              }
            : {
                borderColor: theme.palette.grey[300],
                borderStyle: "solid",
                borderWidth: 1,
              }),
      }}
      component="div"
    >
      <ListItemAvatar sx={{ minWidth: resourceViewMode === "tabs" ? 32 : 56 }}>
        <Avatar
          sx={{
            background: color,
            margin: "auto",
            width: resourceViewMode === "tabs" ? 28 : 40,
            height: resourceViewMode === "tabs" ? 28 : 40,
            fontSize: resourceViewMode === "tabs" ? 12 : 16,
          }}
          alt={text}
          src={avatar}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{ margin: 0 }}
        primary={
          <Typography
            variant="body2"
            noWrap={resourceViewMode !== "vertical"}
            sx={{ fontSize: resourceViewMode === "tabs" ? 13 : 14, fontWeight: 500 }}
          >
            {text}
          </Typography>
        }
        secondary={
          resourceViewMode !== "tabs" && (
            <Typography
              variant="caption"
              color="textSecondary"
              noWrap={resourceViewMode !== "vertical"}
            >
              {subtext}
            </Typography>
          )
        }
      />
    </ListItem>
  );
};

export { ResourceHeader };
