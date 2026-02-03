import { jsxs as M, jsx as r, Fragment as Z } from "react/jsx-runtime";
import { createContext as dt, useContext as ct, useMemo as j, useState as P, Fragment as K, useRef as Ye, useEffect as ee, useCallback as U, forwardRef as ut } from "react";
import { isWithinInterval as oe, endOfDay as Q, startOfDay as J, format as N, isSameDay as ue, differenceInDays as ht, addSeconds as Lt, subMinutes as Vt, addMinutes as ae, differenceInMilliseconds as Bt, addDays as q, addMilliseconds as Gt, isToday as he, differenceInMinutes as ke, set as ve, isBefore as De, isAfter as ft, startOfWeek as Ee, eachMinuteOfInterval as gt, endOfMonth as pt, endOfWeek as mt, startOfMonth as Le, getMonth as jt, setMonth as Qe, getDaysInMonth as Ut, isSameMonth as yt, differenceInCalendarWeeks as Zt, closestTo as qt, setHours as Je, eachWeekOfInterval as Xt, eachDayOfInterval as Yt, isEqual as Ke } from "date-fns";
import { useTheme as Y, ListItem as Qt, ListItemAvatar as vt, Avatar as Ve, ListItemText as _t, Typography as A, Tabs as Jt, Tab as Kt, Box as we, styled as ie, alpha as de, Paper as bt, Grow as en, IconButton as fe, Slide as tn, Button as X, Popover as _e, List as nn, ListItemButton as rn, ButtonBase as on, useMediaQuery as wt, MenuList as an, MenuItem as Oe, TextField as ln, FormControl as sn, InputLabel as dn, Select as cn, Checkbox as un, Chip as hn, CircularProgress as Dt, FormHelperText as fn, Dialog as gn, DialogTitle as pn, DialogContent as mn, Grid as et, DialogActions as yn } from "@mui/material";
import { enUS as vn } from "date-fns/locale";
import { styled as _n } from "@mui/material/styles";
import bn from "@mui/icons-material/DeleteRounded";
import wn from "@mui/icons-material/EditRounded";
import Dn from "@mui/icons-material/EventNoteRounded";
import xn from "@mui/icons-material/ClearRounded";
import Tn from "@mui/icons-material/SupervisorAccountRounded";
import tt from "@mui/icons-material/ArrowRightRounded";
import nt from "@mui/icons-material/ArrowLeftRounded";
import { LocalizationProvider as Cn } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns as kn } from "@mui/x-date-pickers/AdapterDateFnsV3";
import rt from "@mui/icons-material/NavigateBeforeRounded";
import Ae from "@mui/icons-material/NavigateNextRounded";
import { DateCalendar as Be } from "@mui/x-date-pickers";
import En from "@mui/icons-material/MoreVert";
import Mn from "@mui/icons-material/ViewAgenda";
import { DatePicker as Sn } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker as In } from "@mui/x-date-pickers/DateTimePicker";
import Fn from "@mui/icons-material/ExpandMore";
const Nn = (e) => {
  if (e.month)
    return "month";
  if (e.week)
    return "week";
  if (e.day)
    return "day";
  throw new Error("No views were selected");
}, $n = (e) => {
  const t = [];
  return e.month && t.push("month"), e.week && t.push("week"), e.day && t.push("day"), t;
}, We = (e, t, n) => {
  var s;
  const i = ((s = e.config) == null ? void 0 : s.multiple) && !Array.isArray((n == null ? void 0 : n[e.name]) || e.default), o = i ? t ? [t] : [] : t, a = i ? o.length : o;
  return { value: o, validity: a };
}, be = (e, t, n, i) => {
  var f;
  const o = n.idField, a = i.find((d) => d.name === o), s = !!((f = a == null ? void 0 : a.config) != null && f.multiple), u = [];
  for (const d of e) {
    const y = s && !Array.isArray(d[o]) ? [d[o]] : d[o];
    (s || Array.isArray(y) ? y.includes(t[o]) : y === t[o]) && u.push({
      ...d,
      color: d.color || t[n.colorField || ""]
    });
  }
  return u;
}, An = (e, t) => e.filter(
  (n) => n.event_id !== t.event_id && (oe(ae(t.start, 1), {
    start: n.start,
    end: n.end
  }) || oe(ae(t.end, -1), {
    start: n.start,
    end: n.end
  }) || oe(ae(n.start, 1), {
    start: t.start,
    end: t.end
  }) || oe(ae(n.end, -1), {
    start: t.start,
    end: t.end
  }))
), xt = (e, t) => Math.ceil(e) / t, Tt = (e, t) => Math.max(e / t, 60), le = (e, t) => ht(Q(Lt(t, -1)), J(e)), Rn = (e) => new Date(
  e.getUTCFullYear(),
  e.getUTCMonth(),
  e.getUTCDate(),
  e.getUTCHours(),
  e.getUTCMinutes()
), Ct = (e, t, n) => {
  var o;
  const i = Bt(e.end, e.start);
  return e.recurring ? (o = e.recurring) == null ? void 0 : o.between(q(t, -1), q(t, 1), !0).map((a, s) => {
    const u = Rn(a);
    return {
      ...e,
      recurrenceId: s,
      start: u,
      end: Gt(u, i)
    };
  }).map((a) => Ce(a, n)) : [Ce(e, n)];
}, kt = (e, t, n) => {
  const i = [];
  for (let o = 0; o < e.length; o++)
    for (const a of Ct(e[o], t, n))
      !a.allDay && ue(t, a.start) && !le(a.start, a.end) && i.push(a);
  return Et(i);
}, xe = (e, t) => {
  const n = e.filter(
    (i) => oe(t, {
      start: J(i.start),
      end: Q(Vt(i.end, 1))
    })
  );
  return Me(n);
}, Et = (e) => e.sort((t, n) => {
  const i = t.end.getTime() - t.start.getTime();
  return n.end.getTime() - n.start.getTime() - i;
}), Me = (e) => e.sort((t, n) => t.allDay || le(t.start, t.end) > 0 ? -1 : t.start.getTime() - n.start.getTime()), Te = (e, t, n, i) => {
  var u;
  const o = Array.isArray(t), a = [], s = {};
  for (let f = 0; f < e.length; f++) {
    const d = Ce(e[f], n);
    let g = d.allDay || le(d.start, d.end) > 0;
    if (g && (o ? g = t.some(
      (y) => oe(y, {
        start: J(d.start),
        end: Q(d.end)
      })
    ) : g = oe(t, {
      start: J(d.start),
      end: Q(d.end)
    }), g))
      if (a.push(d), o)
        for (const y of t) {
          const m = N(y, "yyyy-MM-dd");
          oe(y, { start: J(d.start), end: Q(d.end) }) && (s[m] = (s[m] || []).concat(d));
        }
      else {
        const y = N(d.start, "yyyy-MM-dd");
        s[y] = (s[y] || []).concat(d);
      }
  }
  return o && i ? ((u = Object.values(s).sort((f, d) => d.length - f.length)) == null ? void 0 : u[0]) || [] : a;
}, Ce = (e, t) => ({
  ...e,
  start: ge(e.start, t),
  end: ge(e.end, t),
  convertedTz: !0
}), ge = (e, t) => new Date(
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: t
  }).format(e)
), Pe = (e, t) => {
  if (!t)
    return e;
  const n = -e.getTimezoneOffset(), i = On(t), o = n - i;
  return new Date(e.getTime() + o * 60 * 1e3);
}, se = ({
  dateLeft: e,
  dateRight: t,
  timeZone: n
}) => ue(e, ge(t || /* @__PURE__ */ new Date(), n)), ye = (e) => e === "12" ? "hh:mm a" : "HH:mm";
function On(e) {
  const t = /* @__PURE__ */ new Date(), n = new Date(t.toLocaleString("en-US", { timeZone: e })), i = new Date(t.toLocaleString("en-US", { timeZone: "UTC" }));
  return Math.round((n.getTime() - i.getTime()) / (60 * 1e3));
}
const Wn = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 6,
  startHour: 9,
  endHour: 17,
  navigation: !0,
  disableGoToDay: !1
}, Pn = {
  weekDays: [0, 1, 2, 3, 4, 5, 6],
  weekStartOn: 6,
  startHour: 9,
  endHour: 17,
  step: 60,
  navigation: !0,
  disableGoToDay: !1
}, Hn = {
  startHour: 9,
  endHour: 17,
  step: 60,
  navigation: !0
}, zn = {
  idField: "assignee",
  textField: "text",
  subTextField: "subtext",
  avatarField: "avatar",
  colorField: "color"
}, Ln = (e = {}) => {
  const { navigation: t, form: n, event: i, ...o } = e;
  return {
    navigation: Object.assign(
      {
        month: "Month",
        week: "Week",
        day: "Day",
        agenda: "Agenda",
        today: "Today"
      },
      t
    ),
    form: Object.assign(
      {
        addTitle: "Add Event",
        editTitle: "Edit Event",
        confirm: "Confirm",
        delete: "Delete",
        cancel: "Cancel"
      },
      n
    ),
    event: Object.assign(
      {
        title: "Title",
        start: "Start",
        end: "End",
        allDay: "All Day"
      },
      i
    ),
    ...Object.assign(
      { moreEvents: "More...", loading: "Loading...", noDataToDisplay: "No data to display" },
      o
    )
  };
}, Vn = (e) => {
  const { month: t, week: n, day: i } = e;
  return {
    month: t !== null ? Object.assign(Wn, t) : null,
    week: n !== null ? Object.assign(Pn, n) : null,
    day: i !== null ? Object.assign(Hn, i) : null
  };
}, Mt = (e) => {
  const {
    translations: t,
    resourceFields: n,
    view: i,
    agenda: o,
    selectedDate: a,
    resourceViewMode: s,
    direction: u,
    dialogMaxWidth: f,
    hourFormat: d,
    ...g
  } = e, y = Vn(e), m = i || "week", p = y[m] ? m : Nn(y);
  return {
    ...y,
    translations: Ln(t),
    resourceFields: Object.assign(zn, n),
    view: p,
    selectedDate: ge(a || /* @__PURE__ */ new Date(), e.timeZone),
    height: 600,
    navigation: !0,
    disableViewNavigator: !1,
    events: [],
    fields: [],
    loading: void 0,
    customEditor: void 0,
    onConfirm: void 0,
    onDelete: void 0,
    viewerExtraComponent: void 0,
    resources: [],
    resourceHeaderComponent: void 0,
    resourceViewMode: s || "default",
    direction: u || "ltr",
    dialogMaxWidth: f || "md",
    locale: vn,
    deletable: !0,
    editable: !0,
    hourFormat: d || "12",
    draggable: !0,
    agenda: o,
    enableAgenda: typeof o > "u" || o,
    isCellDisabled: void 0,
    disabledCellLabel: "Not available",
    availableCellLabel: "Available",
    ...g
  };
}, St = {
  ...Mt({}),
  setProps: () => {
  },
  dialog: !1,
  selectedRange: void 0,
  selectedEvent: void 0,
  selectedResource: void 0,
  handleState: () => {
  },
  getViews: () => [],
  toggleAgenda: () => {
  },
  triggerDialog: () => {
  },
  triggerLoading: () => {
  },
  handleGotoDay: () => {
  },
  confirmEvent: () => {
  },
  setCurrentDragged: () => {
  },
  onDrop: () => {
  }
}, It = dt(St), $ = () => ct(It), He = ({ resource: e }) => {
  const { resourceHeaderComponent: t, resourceFields: n, direction: i, resourceViewMode: o } = $(), a = Y(), s = e[n.textField], u = e[n.subTextField || ""], f = e[n.avatarField || ""], d = e[n.colorField || ""];
  return t instanceof Function ? t(e) : /* @__PURE__ */ M(
    Qt,
    {
      sx: {
        padding: "2px 10px",
        textAlign: i === "rtl" ? "right" : "left",
        ...o === "tabs" ? {} : o === "vertical" ? {
          display: "block",
          textAlign: "center",
          position: "sticky",
          top: 4
        } : {
          borderColor: a.palette.grey[300],
          borderStyle: "solid",
          borderWidth: 1
        }
      },
      component: "div",
      children: [
        /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r(Ve, { sx: { background: d, margin: "auto" }, alt: s, src: f }) }),
        /* @__PURE__ */ r(
          _t,
          {
            primary: /* @__PURE__ */ r(A, { variant: "body2", noWrap: o !== "vertical", children: s }),
            secondary: /* @__PURE__ */ r(
              A,
              {
                variant: "caption",
                color: "textSecondary",
                noWrap: o !== "vertical",
                children: u
              }
            )
          }
        )
      ]
    }
  );
};
function Bn(e) {
  const { children: t, value: n, index: i } = e;
  return n === i ? /* @__PURE__ */ r(Z, { children: t }) : /* @__PURE__ */ r(Z, {});
}
function Gn(e) {
  return {
    id: `scrollable-auto-tab-${e}`,
    "aria-controls": `scrollable-auto-tabpanel-${e}`
  };
}
const jn = _n("div")(({ theme: e }) => ({
  flexGrow: 1,
  width: "100%",
  backgroundColor: e.palette.background.paper,
  alignSelf: "center",
  "& .tabs": {
    borderColor: e.palette.grey[300],
    borderStyle: "solid",
    borderWidth: 1,
    "& button.MuiTab-root": {
      borderColor: e.palette.grey[300],
      borderRightStyle: "solid",
      borderWidth: 1
    }
  },
  "& .primary": {
    background: e.palette.primary.main
  },
  "& .secondary": {
    background: e.palette.secondary.main
  },
  "& .error": {
    background: e.palette.error.main
  },
  "& .info": {
    background: e.palette.info.dark
  },
  "& .text_primary": {
    color: e.palette.primary.main
  },
  "& .text_secondary": {
    color: e.palette.secondary.main
  },
  "& .text_error": {
    color: e.palette.error.main
  },
  "& .text_info": {
    color: e.palette.info.dark
  }
})), Un = ({
  tabs: e,
  variant: t = "scrollable",
  tab: n,
  setTab: i,
  indicator: o = "primary",
  style: a
}) => /* @__PURE__ */ M(jn, { style: a, children: [
  /* @__PURE__ */ r(
    Jt,
    {
      value: n,
      variant: t,
      scrollButtons: !0,
      className: "tabs",
      classes: { indicator: o },
      children: e.map((s, u) => /* @__PURE__ */ r(
        Kt,
        {
          label: s.label,
          sx: { flex: 1, flexBasis: 200, flexShrink: 0 },
          value: s.id,
          ...Gn(s.id),
          onClick: () => i(s.id),
          onDragEnter: () => i(s.id)
        },
        s.id || u
      ))
    }
  ),
  e.map(
    (s, u) => s.component && /* @__PURE__ */ r(Bn, { value: n, index: s.id, children: s.component }, u)
  )
] }), Ge = ({ renderChildren: e }) => {
  const { resources: t, resourceFields: n, resourceViewMode: i } = $(), o = Y();
  return i === "tabs" ? /* @__PURE__ */ r(Zn, { renderChildren: e }) : i === "vertical" ? /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ M(we, { sx: { display: "flex" }, children: [
    /* @__PURE__ */ r(
      we,
      {
        sx: {
          borderColor: o.palette.grey[300],
          borderStyle: "solid",
          borderWidth: "1px 1px 0 1px",
          paddingTop: 1,
          flexBasis: 140
        },
        children: /* @__PURE__ */ r(He, { resource: a })
      }
    ),
    /* @__PURE__ */ r(
      we,
      {
        sx: { width: "100%", overflowX: "auto" },
        children: e(a)
      }
    )
  ] }, `${a[n.idField]}_${s}`)) }) : /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ M("div", { children: [
    /* @__PURE__ */ r(He, { resource: a }),
    e(a)
  ] }, `${a[n.idField]}_${s}`)) });
}, Zn = ({ renderChildren: e }) => {
  const { resources: t, resourceFields: n, selectedTab: i, handleState: o, onResourceChange: a } = $(), s = t.map((d) => ({
    id: d[n.idField],
    label: /* @__PURE__ */ r(He, { resource: d }),
    component: /* @__PURE__ */ r(Z, { children: e(d) })
  })), u = (d) => {
    if (o(d, "selectedTab"), typeof a == "function") {
      const g = t.find((y) => y[n.idField] === d);
      g && a(g);
    }
  }, f = j(() => {
    const d = t[0][n.idField];
    return !i || t.findIndex((y) => y[n.idField] === i) < 0 ? d : i;
  }, [t, n.idField, i]);
  return /* @__PURE__ */ r(Un, { tabs: s, tab: f, setTab: u, style: { display: "grid" } });
}, qn = ie("div")(({ theme: e, dialog: t }) => ({
  position: "relative",
  "& .rs__table_loading": {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999999,
    "& .rs__table_loading_internal": {
      background: t ? "" : de(e.palette.background.paper, 0.4),
      height: "100%",
      "& > span": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "column",
        "& >span": {
          marginBottom: 15
        }
      }
    }
  }
})), Xn = ie("div")(({ resource_count: e }) => ({
  position: "relative",
  display: "flex",
  flexDirection: e > 1 ? "row" : "column",
  width: "100%",
  boxSizing: "content-box",
  "& > div": {
    flexShrink: 0,
    flexGrow: 1
  }
})), Yn = ie(bt)(({ sticky: e = "0" }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: e === "1" ? "sticky" : "relative",
  top: e === "1" ? 0 : void 0,
  zIndex: e === "1" ? 999 : void 0,
  boxShadow: "none",
  padding: "2px 0",
  "& > .rs__view_navigator": {
    display: "flex",
    alignItems: "center"
  }
})), Se = ie("div")(({ theme: e }) => ({
  borderStyle: "solid",
  borderColor: e.palette.grey[300],
  borderWidth: "1px 1px 0 0",
  "& > .rs__agenda_row": {
    display: "flex",
    "& >.rs__agenda__cell": {
      padding: 4,
      width: "100%",
      maxWidth: 60,
      "& > .MuiTypography-root": {
        position: "sticky",
        top: 0,
        "&.rs__hover__op": {
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7,
            textDecoration: "underline"
          }
        }
      }
    },
    "& .rs__cell": {
      borderStyle: "solid",
      borderColor: e.palette.grey[300],
      borderWidth: "0 0 1px 1px"
    },
    "& > .rs__agenda_items": {
      flexGrow: 1
    }
  }
})), pe = ie("div")(({ days: e, sticky: t = "0", stickyNavigation: n, indent: i = "1", theme: o }) => ({
  display: "grid",
  gridTemplateColumns: +i > 0 ? `10% repeat(${e}, 1fr)` : `repeat(${e}, 1fr)`,
  overflowX: "auto",
  overflowY: "hidden",
  position: t === "1" ? "sticky" : "relative",
  top: t === "1" ? n ? 36 : 0 : void 0,
  zIndex: t === "1" ? 99 : void 0,
  [o.breakpoints.down("sm")]: {
    gridTemplateColumns: +i > 0 ? `30px repeat(${e}, 1fr)` : ""
  },
  borderStyle: "solid",
  borderColor: o.palette.grey[300],
  borderWidth: "0 0 0 1px",
  "&:first-of-type": {
    borderWidth: "1px 0 0 1px"
  },
  "&:last-of-type": {
    borderWidth: "0 0 1px 1px"
  },
  "& .rs__cell": {
    background: o.palette.background.paper,
    position: "relative",
    borderStyle: "solid",
    borderColor: o.palette.grey[300],
    borderWidth: "0 1px 1px 0",
    "&.rs__header": {
      "& > :first-of-type": {
        padding: "2px 5px"
      }
    },
    "&.rs__header__center": {
      padding: "6px 0px"
    },
    "&.rs__time": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "sticky",
      left: 0,
      zIndex: 99,
      [o.breakpoints.down("sm")]: {
        writingMode: "vertical-rl"
      }
    },
    "& > button": {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      cursor: "pointer",
      "&:hover": {
        background: de(o.palette.primary.main, 0.1)
      }
    },
    "& .rs__event__item": {
      position: "absolute",
      zIndex: 1
    },
    "& .rs__multi_day": {
      position: "absolute",
      zIndex: 1,
      textOverflow: "ellipsis"
    },
    "& .rs__block_col": {
      display: "block",
      position: "relative"
    },
    "& .rs__hover__op": {
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7,
        textDecoration: "underline"
      }
    },
    "&:not(.rs__time)": {
      minWidth: 65
    }
  }
})), ot = ie(bt)(({ disabled: e }) => ({
  width: "99.5%",
  height: "100%",
  display: "block",
  cursor: e ? "not-allowed" : "pointer",
  overflow: "hidden",
  "& .MuiButtonBase-root": {
    width: "100%",
    height: "100%",
    display: "block",
    textAlign: "left",
    "& > div": {
      height: "100%"
      // padding: "2px 4px",
    }
  }
})), Qn = ie("div")(({ theme: e }) => ({
  maxWidth: "100%",
  width: 400,
  "& > div": {
    padding: "5px 10px",
    "& .rs__popper_actions": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& .MuiIconButton-root": {
        color: e.palette.primary.contrastText
      }
    }
  }
})), Jn = ie("div")(({ theme: e }) => ({
  display: "inherit",
  "& .MuiIconButton-root": {
    color: e.palette.primary.contrastText
  },
  "& .MuiButton-root": {
    "&.delete": {
      color: e.palette.error.main
    },
    "&.cancel": {
      color: e.palette.action.disabled
    }
  }
})), Kn = ie("div")(({ theme: e }) => ({
  position: "absolute",
  zIndex: 9,
  width: "100%",
  display: "flex",
  "& > div:first-of-type": {
    height: 12,
    width: 12,
    borderRadius: "50%",
    background: e.palette.error.light,
    marginLeft: -6,
    marginTop: -5
  },
  "& > div:last-of-type": {
    borderTop: `solid 2px ${e.palette.error.light}`,
    width: "100%"
  }
})), Ft = (e) => {
  const { editable: t, deletable: n, draggable: i } = $(), o = j(() => typeof e.editable < "u" ? e.editable : t, [t, e.editable]), a = j(() => typeof e.deletable < "u" ? e.deletable : n, [n, e.deletable]), s = j(() => {
    if (o)
      return typeof e.draggable < "u" ? e.draggable : i;
  }, [i, e.draggable, o]);
  return {
    canEdit: o,
    canDelete: a,
    canDrag: s
  };
}, er = ({ event: e, onDelete: t, onEdit: n }) => {
  const { translations: i, direction: o } = $(), [a, s] = P(!1), u = () => {
    if (!a)
      return s(!0);
    t();
  }, { canEdit: f, canDelete: d } = Ft(e);
  return /* @__PURE__ */ M(Jn, { children: [
    /* @__PURE__ */ r(en, { in: !a, exit: !1, timeout: 400, unmountOnExit: !0, children: /* @__PURE__ */ M("div", { children: [
      f && /* @__PURE__ */ r(fe, { size: "small", onClick: n, children: /* @__PURE__ */ r(wn, {}) }),
      d && /* @__PURE__ */ r(fe, { size: "small", onClick: u, children: /* @__PURE__ */ r(bn, {}) })
    ] }) }),
    /* @__PURE__ */ r(
      tn,
      {
        in: a,
        direction: o === "rtl" ? "right" : "left",
        unmountOnExit: !0,
        timeout: 400,
        exit: !1,
        children: /* @__PURE__ */ M("div", { children: [
          /* @__PURE__ */ r(X, { className: "delete", size: "small", onClick: u, children: i.form.delete.toUpperCase() }),
          /* @__PURE__ */ r(X, { className: "cancel", size: "small", onClick: () => s(!1), children: i.form.cancel.toUpperCase() })
        ] })
      }
    )
  ] });
}, Nt = ({ anchorEl: e, event: t, onTriggerViewer: n }) => {
  const {
    triggerDialog: i,
    onDelete: o,
    events: a,
    handleState: s,
    triggerLoading: u,
    customViewer: f,
    viewerExtraComponent: d,
    fields: g,
    resources: y,
    resourceFields: m,
    locale: p,
    viewerTitleComponent: h,
    hourFormat: c,
    translations: w,
    onEventEdit: l
  } = $(), b = Y(), E = le(t.start, t.end) <= 0 && t.allDay, k = ye(c), D = m.idField, C = y.filter(
    (T) => Array.isArray(t[D]) ? t[D].includes(T[D]) : T[D] === t[D]
  ), x = async () => {
    try {
      u(!0);
      let T = t.event_id;
      if (o) {
        const v = await o(T);
        v ? T = v : T = "";
      }
      if (T) {
        n();
        const v = a.filter((_) => _.event_id !== T);
        s(v, "events");
      }
    } catch (T) {
      console.error(T);
    } finally {
      u(!1);
    }
  };
  return /* @__PURE__ */ r(
    _e,
    {
      open: !!e,
      anchorEl: e,
      onClose: () => {
        n();
      },
      anchorOrigin: {
        vertical: "center",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      },
      onClick: (T) => {
        T.stopPropagation();
      },
      children: typeof f == "function" ? f(t, () => n()) : /* @__PURE__ */ M(Qn, { children: [
        /* @__PURE__ */ M(
          we,
          {
            sx: {
              bgcolor: t.color || b.palette.primary.main,
              color: b.palette.primary.contrastText
            },
            children: [
              /* @__PURE__ */ M("div", { className: "rs__popper_actions", children: [
                /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                  fe,
                  {
                    size: "small",
                    onClick: () => {
                      n();
                    },
                    children: /* @__PURE__ */ r(xn, { color: "disabled" })
                  }
                ) }),
                /* @__PURE__ */ r(
                  er,
                  {
                    event: t,
                    onDelete: x,
                    onEdit: () => {
                      n(), i(!0, t), l && typeof l == "function" && l(t);
                    }
                  }
                )
              ] }),
              h instanceof Function ? h(t) : /* @__PURE__ */ r(A, { style: { padding: "5px 0" }, noWrap: !0, children: t.title })
            ]
          }
        ),
        /* @__PURE__ */ M("div", { style: { padding: "5px 10px" }, children: [
          /* @__PURE__ */ M(
            A,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(Dn, {}),
                E ? w.event.allDay : `${N(t.start, `dd MMMM yyyy ${k}`, {
                  locale: p
                })} - ${N(t.end, `dd MMMM yyyy ${k}`, {
                  locale: p
                })}`
              ]
            }
          ),
          C.length > 0 && /* @__PURE__ */ M(
            A,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(Tn, {}),
                C.map((T) => T[m.textField]).join(", ")
              ]
            }
          ),
          d instanceof Function ? d(g, t) : d
        ] })
      ] })
    }
  );
}, je = ({ day: e, events: t }) => {
  const [n, i] = P(null), [o, a] = P(), [s, u] = P(!1), { locale: f, hourFormat: d, eventRenderer: g, onEventClick: y, timeZone: m, disableViewer: p } = $(), h = Y(), c = ye(d), w = (l) => {
    !(l != null && l.currentTarget) && s && u(!1), i((l == null ? void 0 : l.currentTarget) || null);
  };
  return /* @__PURE__ */ M(K, { children: [
    /* @__PURE__ */ r(nn, { children: t.map((l) => {
      const E = se({
        dateLeft: l.start,
        dateRight: e,
        timeZone: m
      }) ? c : `MMM d, ${c}`, k = N(l.start, E, {
        locale: f
      }), C = se({ dateLeft: l.end, dateRight: e, timeZone: m }) ? c : `MMM d, ${c}`, x = N(l.end, C, {
        locale: f
      });
      return typeof g == "function" ? g({
        event: l,
        onClick: (T) => {
          a(l), w(T);
        }
      }) : /* @__PURE__ */ M(
        rn,
        {
          focusRipple: !0,
          disableRipple: p,
          tabIndex: p ? -1 : 0,
          disabled: l.disabled,
          onClick: (T) => {
            T.preventDefault(), T.stopPropagation(), p || w(T), a(l), typeof y == "function" && y(l);
          },
          children: [
            /* @__PURE__ */ r(vt, { children: /* @__PURE__ */ r(
              Ve,
              {
                sx: {
                  bgcolor: l.disabled ? "#d0d0d0" : l.color || h.palette.primary.main,
                  color: l.disabled ? "#808080" : l.textColor || h.palette.primary.contrastText
                },
                children: l.agendaAvatar || " "
              }
            ) }),
            /* @__PURE__ */ r(_t, { primary: l.title, secondary: `${k} - ${x}` })
          ]
        },
        `${l.start.getTime()}_${l.end.getTime()}_${l.event_id}`
      );
    }) }),
    o && /* @__PURE__ */ r(
      Nt,
      {
        anchorEl: n,
        event: o,
        onTriggerViewer: w
      }
    )
  ] });
}, Ue = () => {
  const { height: e, translations: t } = $();
  return /* @__PURE__ */ r(
    Se,
    {
      sx: {
        borderWidth: 1,
        padding: 1,
        height: e / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: /* @__PURE__ */ r(A, { children: t.noDataToDisplay }) })
    }
  );
}, tr = ({ daysList: e, resource: t, events: n }) => {
  const { week: i, handleGotoDay: o, locale: a, timeZone: s, translations: u, alwaysShowAgendaDays: f } = $(), { disableGoToDay: d, headRenderer: g } = i, y = j(() => e.some((m) => xe(n, m).length > 0), [e, n]);
  return !f && !y ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: e.map((m, p) => {
    const h = se({ dateLeft: m, timeZone: s }), c = xe(n, m);
    return !f && !c.length ? null : /* @__PURE__ */ M("div", { className: `rs__agenda_row ${he(m) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof g == "function" ? /* @__PURE__ */ r("div", { children: g({ day: m, events: n, resource: t }) }) : /* @__PURE__ */ r(
        A,
        {
          sx: { fontWeight: h ? "bold" : "inherit" },
          color: h ? "primary" : "inherit",
          variant: "body2",
          className: d ? "" : "rs__hover__op",
          onClick: (w) => {
            w.stopPropagation(), d || o(m);
          },
          children: N(m, "dd E", { locale: a })
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: c.length > 0 ? /* @__PURE__ */ r(je, { day: m, events: c }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: u.noDataToDisplay }) })
    ] }, p);
  }) });
}, ze = 1, ce = 28, it = 27, nr = 23, $t = () => {
  const e = Ye(null), t = Ye(null);
  return ee(() => {
    const n = e.current, i = t.current, o = (a) => {
      const s = a.currentTarget;
      i == null || i.scroll({ left: s.scrollLeft }), n == null || n.scroll({ left: s.scrollLeft });
    };
    return n == null || n.addEventListener("scroll", o), i == null || i.addEventListener("scroll", o), () => {
      n == null || n.removeEventListener("scroll", o), i == null || i.removeEventListener("scroll", o);
    };
  }), { headersRef: e, bodyRef: t };
}, At = ({ date: e, onClick: t, locale: n }) => {
  const { timeZone: i } = $(), o = se({ dateLeft: e, timeZone: i });
  return /* @__PURE__ */ M("div", { children: [
    /* @__PURE__ */ r(
      A,
      {
        style: {
          fontWeight: o ? "bold" : "inherit"
        },
        color: o ? "primary" : "inherit",
        className: t ? "rs__hover__op" : "",
        onClick: (a) => {
          a.stopPropagation(), t && t(e);
        },
        children: N(e, "dd", { locale: n })
      }
    ),
    /* @__PURE__ */ r(
      A,
      {
        color: o ? "primary" : "inherit",
        style: {
          fontWeight: o ? "bold" : "inherit",
          fontSize: 11
        },
        children: N(e, "eee", { locale: n })
      }
    )
  ] });
}, Rt = dt({
  renderedSlots: {},
  setRenderedSlot: () => {
  }
}), Ot = () => ct(Rt), rr = (e) => {
  const { setCurrentDragged: t } = $(), n = Y();
  return {
    draggable: !0,
    onDragStart: (i) => {
      i.stopPropagation(), t(e), i.currentTarget.style.backgroundColor = n.palette.error.main;
    },
    onDragEnd: (i) => {
      t(), i.currentTarget.style.backgroundColor = e.color || n.palette.primary.main;
    },
    onDragOver: (i) => {
      i.stopPropagation(), i.preventDefault();
    },
    onDragEnter: (i) => {
      i.stopPropagation(), i.preventDefault();
    }
  };
}, Ie = ({ event: e, multiday: t, hasPrev: n, hasNext: i, showdate: o = !0 }) => {
  const { direction: a, locale: s, hourFormat: u, eventRenderer: f, onEventClick: d, view: g, disableViewer: y } = $(), m = rr(e), [p, h] = P(null), [c, w] = P(!1), l = Y(), b = ye(u), E = a === "rtl" ? nt : tt, k = a === "rtl" ? tt : nt, D = le(e.start, e.end) <= 0 && e.allDay, { canDrag: C } = Ft(e), x = U(
    (v) => {
      !(v != null && v.currentTarget) && c && w(!1), h((v == null ? void 0 : v.currentTarget) || null);
    },
    [c]
  ), T = j(() => {
    if (typeof f == "function" && !t && g !== "month") {
      const _ = f({ event: e, onClick: x, ...m });
      if (_)
        return /* @__PURE__ */ r(ot, { children: _ }, `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`);
    }
    let v = /* @__PURE__ */ M("div", { style: { padding: "2px 6px" }, children: [
      /* @__PURE__ */ r(A, { variant: "subtitle2", style: { fontSize: 12 }, noWrap: !0, children: e.title }),
      e.subtitle && /* @__PURE__ */ r(A, { variant: "body2", style: { fontSize: 11 }, noWrap: !0, children: e.subtitle }),
      o && /* @__PURE__ */ r(A, { style: { fontSize: 11 }, noWrap: !0, children: `${N(e.start, b, {
        locale: s
      })} - ${N(e.end, b, { locale: s })}` })
    ] });
    return t && (v = /* @__PURE__ */ M(
      "div",
      {
        style: {
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ r(A, { sx: { fontSize: 11 }, noWrap: !0, children: n ? /* @__PURE__ */ r(k, { fontSize: "small", sx: { display: "flex" } }) : o && !D && N(e.start, b, { locale: s }) }),
          /* @__PURE__ */ r(A, { variant: "subtitle2", align: "center", sx: { fontSize: 12 }, noWrap: !0, children: e.title }),
          /* @__PURE__ */ r(A, { sx: { fontSize: 11 }, noWrap: !0, children: i ? /* @__PURE__ */ r(E, { fontSize: "small", sx: { display: "flex" } }) : o && !D && N(e.end, b, { locale: s }) })
        ]
      }
    )), /* @__PURE__ */ r(
      ot,
      {
        disabled: e.disabled,
        sx: {
          bgcolor: e.disabled ? "#d0d0d0" : e.color || l.palette.primary.main,
          color: e.disabled ? "#808080" : e.textColor || l.palette.primary.contrastText,
          ...e.sx || {}
        },
        children: /* @__PURE__ */ r(
          on,
          {
            onClick: (_) => {
              _.preventDefault(), _.stopPropagation(), y || x(_), typeof d == "function" && d(e);
            },
            focusRipple: !0,
            tabIndex: y ? -1 : 0,
            disableRipple: y,
            disabled: e.disabled,
            children: /* @__PURE__ */ r("div", { ...m, draggable: C, children: v })
          }
        )
      },
      `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`
    );
  }, [
    f,
    t,
    g,
    e,
    o,
    b,
    s,
    l.palette.primary.main,
    l.palette.primary.contrastText,
    y,
    m,
    C,
    x,
    n,
    k,
    D,
    i,
    E,
    d
  ]);
  return /* @__PURE__ */ M(K, { children: [
    T,
    /* @__PURE__ */ r(Nt, { anchorEl: p, event: e, onTriggerViewer: x })
  ] });
};
function Re({ startHour: e, step: t, minuteHeight: n, timeZone: i }) {
  const o = ge(/* @__PURE__ */ new Date(), i), a = ke(o, ve(o, { hours: e, minutes: 0 })), s = a * n, f = a / t + ze;
  return s + f;
}
const or = (e) => {
  const [t, n] = P(Re(e)), { startHour: i, step: o, minuteHeight: a, timeZone: s } = e;
  return ee(() => {
    const u = { startHour: i, step: o, minuteHeight: a, timeZone: s };
    n(Re(u));
    const f = setInterval(() => n(Re(u)), 60 * 1e3);
    return () => clearInterval(f);
  }, [i, o, a, s]), t < 0 ? null : /* @__PURE__ */ M(Kn, { style: { top: t, zIndex: e.zIndex }, children: [
    /* @__PURE__ */ r("div", {}),
    /* @__PURE__ */ r("div", {})
  ] });
}, Wt = ({
  todayEvents: e,
  today: t,
  startHour: n,
  endHour: i,
  step: o,
  minuteHeight: a,
  direction: s,
  timeZone: u
}) => {
  const f = [];
  return /* @__PURE__ */ M(K, { children: [
    se({ dateLeft: t, timeZone: u }) && /* @__PURE__ */ r(
      or,
      {
        startHour: n,
        step: o,
        minuteHeight: a,
        timeZone: u,
        zIndex: 2 * e.length + 1
      }
    ),
    e.map((d, g) => {
      const y = (i * 60 - n * 60) * a, m = ke(d.end, d.start) * a, p = Math.min(m, y) - ze, h = n * 60, c = d.start.getHours() * 60 + d.start.getMinutes(), w = Math.max(c - h, 0), l = w * a, E = p / 60 * ze, k = w / o, D = l + k, C = An(e, d), x = C.filter((T) => f.includes(T.event_id));
      return f.push(d.event_id), /* @__PURE__ */ r(
        "div",
        {
          className: "rs__event__item",
          style: {
            height: p + E,
            top: D,
            width: x.length > 0 ? `calc(100% - ${100 - 98 / (x.length + 1)}%)` : "98%",
            // Leave some space to click cell
            zIndex: e.length + g,
            [s === "rtl" ? "right" : "left"]: x.length > 0 ? `${100 / (C.length + 1) * x.length}%` : ""
          },
          children: /* @__PURE__ */ r(Ie, { event: d })
        },
        `${d.event_id}/${d.recurrenceId || ""}`
      );
    })
  ] });
}, ir = ({ start: e, end: t, resourceKey: n, resourceVal: i }) => {
  const {
    triggerDialog: o,
    onCellClick: a,
    onDrop: s,
    currentDragged: u,
    setCurrentDragged: f,
    editable: d,
    timeZone: g,
    isCellDisabled: y,
    disabledCellLabel: m,
    availableCellLabel: p
  } = $(), h = Y(), c = j(() => y && typeof y == "function" ? y(e, t, n, i) : !1, [y, e, t, n, i]), w = d && !c;
  return {
    tabIndex: w ? 0 : -1,
    disableRipple: !w,
    disabled: c,
    title: c ? m : p,
    sx: c ? {
      backgroundColor: de(h.palette.grey[400], 0.3),
      cursor: "not-allowed",
      "&:hover": {
        backgroundColor: de(h.palette.grey[400], 0.4)
      }
    } : {},
    onClick: () => {
      c || (d && o(!0, {
        start: e,
        end: t,
        [n]: i
      }), a && typeof a == "function" && a(e, t, n, i));
    },
    onDragOver: (l) => {
      l.preventDefault(), !c && u && (l.currentTarget.style.backgroundColor = de(h.palette.secondary.main, 0.3));
    },
    onDragEnter: (l) => {
      c || u && (l.currentTarget.style.backgroundColor = de(h.palette.secondary.main, 0.3));
    },
    onDragLeave: (l) => {
      c || u && (l.currentTarget.style.backgroundColor = "");
    },
    onDrop: (l) => {
      if (!c && u && u.event_id) {
        l.preventDefault(), l.currentTarget.style.backgroundColor = "";
        const b = Pe(e, g);
        s(l, u.event_id.toString(), b, n, i), f();
      }
    },
    [n]: i
  };
}, Ze = ({
  day: e,
  start: t,
  end: n,
  resourceKey: i,
  resourceVal: o,
  cellRenderer: a,
  height: s,
  children: u
}) => {
  const f = ir({ start: t, end: n, resourceKey: i, resourceVal: o });
  return a ? a({
    day: e,
    start: t,
    end: n,
    height: s,
    ...f
  }) : /* @__PURE__ */ r(
    X,
    {
      fullWidth: !0,
      "aria-label": `${t.toLocaleString("en", {
        dateStyle: "full",
        timeStyle: "long"
      })} - ${n.toLocaleString("en", { dateStyle: "full", timeStyle: "long" })}`,
      ...f,
      children: u
    }
  );
}, ar = ({
  daysList: e,
  hours: t,
  cellHeight: n,
  minutesHeight: i,
  resourcedEvents: o,
  resource: a
}) => {
  const {
    week: s,
    events: u,
    handleGotoDay: f,
    resources: d,
    resourceFields: g,
    resourceViewMode: y,
    direction: m,
    locale: p,
    hourFormat: h,
    timeZone: c,
    stickyNavigation: w
  } = $(), { startHour: l, endHour: b, step: E, cellRenderer: k, disableGoToDay: D, headRenderer: C, hourRenderer: x } = s, { renderedSlots: T } = Ot(), { headersRef: v, bodyRef: _ } = $t(), S = ce, I = J(e[0]), H = Q(e[e.length - 1]), z = ye(h), V = j(() => {
    const R = d.length && y === "default", F = Te(
      R ? u : o,
      e,
      c,
      !0
    );
    return S * F.length + 45;
  }, [
    S,
    e,
    u,
    y,
    o,
    d.length,
    c
  ]), W = (R, F, B) => {
    const te = ue(I, F);
    return Te(R, e, c).filter((O) => De(O.start, I) ? te : ue(O.start, F)).sort((O, re) => re.end.getTime() - O.end.getTime()).map((O) => {
      var Xe;
      const re = De(J(O.start), I), L = ft(Q(O.end), H), Ne = le(re ? I : O.start, L ? H : O.end) + 1, Pt = N(F, "yyyy-MM-dd"), Ht = B ? B[g.idField] : "all", $e = (Xe = T == null ? void 0 : T[Ht]) == null ? void 0 : Xe[Pt], zt = ($e == null ? void 0 : $e[O.event_id]) || 0;
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__multi_day",
          style: {
            top: zt * S + 45,
            width: `${99.9 * Ne}%`,
            overflowX: "hidden"
          },
          children: /* @__PURE__ */ r(Ie, { event: O, hasPrev: re, hasNext: L, multiday: !0 })
        },
        O.event_id
      );
    });
  };
  return /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ M(
      pe,
      {
        days: e.length,
        ref: v,
        sticky: "1",
        stickyNavigation: w,
        children: [
          /* @__PURE__ */ r("span", { className: "rs__cell rs__time" }),
          e.map((R, F) => /* @__PURE__ */ M(
            "span",
            {
              className: `rs__cell rs__header ${he(R) ? "rs__today_cell" : ""}`,
              style: { height: V },
              children: [
                typeof C == "function" ? /* @__PURE__ */ r("div", { children: C({ day: R, events: o, resource: a }) }) : /* @__PURE__ */ r(
                  At,
                  {
                    date: R,
                    onClick: D ? void 0 : f,
                    locale: p
                  }
                ),
                W(o, R, a)
              ]
            },
            F
          ))
        ]
      }
    ),
    /* @__PURE__ */ r(pe, { days: e.length, ref: _, children: t.map((R, F) => /* @__PURE__ */ M(K, { children: [
      /* @__PURE__ */ r("span", { style: { height: n }, className: "rs__cell rs__header rs__time", children: typeof x == "function" ? /* @__PURE__ */ r("div", { children: x(N(R, z, { locale: p })) }) : /* @__PURE__ */ r(A, { variant: "caption", children: N(R, z, { locale: p }) }) }),
      e.map((B, te) => {
        const G = /* @__PURE__ */ new Date(`${N(B, "yyyy/MM/dd")} ${N(R, z)}`), ne = ae(G, E), O = g.idField;
        return /* @__PURE__ */ M("span", { className: `rs__cell ${he(B) ? "rs__today_cell" : ""}`, children: [
          F === 0 && /* @__PURE__ */ r(
            Wt,
            {
              todayEvents: kt(o, B, c),
              today: B,
              minuteHeight: i,
              startHour: l,
              endHour: b,
              step: E,
              direction: m,
              timeZone: c
            }
          ),
          /* @__PURE__ */ r(
            Ze,
            {
              start: G,
              end: ne,
              day: B,
              height: n,
              resourceKey: O,
              resourceVal: a ? a[O] : null,
              cellRenderer: k
            }
          )
        ] }, te);
      })
    ] }, F)) })
  ] });
}, lr = () => {
  const {
    week: e,
    selectedDate: t,
    height: n,
    events: i,
    getRemoteEvents: o,
    triggerLoading: a,
    handleState: s,
    resources: u,
    resourceFields: f,
    fields: d,
    agenda: g
  } = $(), { weekStartOn: y, weekDays: m, startHour: p, endHour: h, step: c } = e, w = Ee(t, { weekStartsOn: y }), l = m.map((S) => q(w, S)), b = J(l[0]), E = Q(l[l.length - 1]), k = ve(t, { hours: p, minutes: 0, seconds: 0 }), D = ve(t, { hours: h, minutes: -c, seconds: 0 }), C = gt(
    {
      start: k,
      end: D
    },
    { step: c }
  ), x = Tt(n, C.length), T = xt(x, c), v = U(async () => {
    try {
      a(!0);
      const S = await o({
        start: b,
        end: E,
        view: "week"
      });
      Array.isArray(S) && s(S, "events");
    } catch (S) {
      throw S;
    } finally {
      a(!1);
    }
  }, [o]);
  ee(() => {
    o instanceof Function && v();
  }, [v, o]);
  const _ = (S) => {
    let I = i;
    return S && (I = be(i, S, f, d)), g ? /* @__PURE__ */ r(tr, { daysList: l, resource: S, events: I }) : /* @__PURE__ */ r(
      ar,
      {
        resourcedEvents: I,
        resource: S,
        hours: C,
        cellHeight: x,
        minutesHeight: T,
        daysList: l
      }
    );
  };
  return u.length ? /* @__PURE__ */ r(Ge, { renderChildren: _ }) : _();
}, Fe = ({ children: e }) => {
  const { locale: t } = $();
  return /* @__PURE__ */ r(Cn, { dateAdapter: kn, adapterLocale: t, children: e });
}, me = ({ type: e, onClick: t, ...n }) => {
  const { direction: i } = $();
  let o = Ae;
  return e === "prev" ? o = i === "rtl" ? Ae : rt : e === "next" && (o = i === "rtl" ? rt : Ae), /* @__PURE__ */ r(
    fe,
    {
      style: { padding: 2 },
      onClick: t,
      onDragOver: (a) => {
        a.preventDefault(), t && t();
      },
      ...n,
      children: /* @__PURE__ */ r(o, {})
    }
  );
}, qe = () => {
  const { selectedDate: e, week: t, navigationPickerProps: n, view: i } = $(), o = n == null ? void 0 : n.minDate, a = n == null ? void 0 : n.maxDate, s = i === "month" ? pt(e) : i === "week" ? mt(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, u = i === "month" ? Le(e) : i === "week" ? Ee(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, f = o ? u <= o : !1, d = a ? s >= a : !1;
  return { prevDisabled: f, nextDisabled: d };
}, sr = ({ selectedDate: e, onChange: t, weekProps: n }) => {
  const { locale: i, navigationPickerProps: o } = $(), [a, s] = P(null), { weekStartOn: u } = n, f = Ee(e, { weekStartsOn: u }), d = mt(e, { weekStartsOn: u }), { prevDisabled: g, nextDisabled: y } = qe(), m = (l) => {
    s(l.currentTarget);
  }, p = () => {
    s(null);
  }, h = (l) => {
    t(l || /* @__PURE__ */ new Date()), p();
  }, c = () => {
    const l = q(f, -1);
    t(l);
  }, w = () => {
    const l = q(d, 1);
    t(l);
  };
  return /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: c,
        disabled: g,
        "aria-label": "previous week"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: m, "aria-label": "selected week", children: `${N(f, "dd", { locale: i })} - ${N(d, "dd MMM yyyy", {
      locale: i
    })}` }),
    /* @__PURE__ */ r(
      _e,
      {
        open: !!a,
        anchorEl: a,
        onClose: p,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        children: /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
          Be,
          {
            ...o,
            openTo: "day",
            views: ["month", "day"],
            value: e,
            onChange: h
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(
      me,
      {
        type: "next",
        onClick: w,
        disabled: y,
        "aria-label": "next week"
      }
    )
  ] });
}, dr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = $(), [o, a] = P(null), { prevDisabled: s, nextDisabled: u } = qe(), f = (p) => {
    a(p.currentTarget);
  }, d = () => {
    a(null);
  }, g = (p) => {
    t(p || /* @__PURE__ */ new Date()), d();
  }, y = () => {
    const p = q(e, -1);
    t(p);
  }, m = () => {
    const p = q(e, 1);
    t(p);
  };
  return /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: y,
        disabled: s,
        "aria-label": "previous day"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: f, "aria-label": "selected date", children: N(e, "dd MMMM yyyy", { locale: n }) }),
    /* @__PURE__ */ r(
      _e,
      {
        open: !!o,
        anchorEl: o,
        onClose: d,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        children: /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
          Be,
          {
            ...i,
            openTo: "day",
            views: ["month", "day"],
            value: e,
            onChange: g
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(me, { type: "next", onClick: m, disabled: u, "aria-label": "next day" })
  ] });
}, cr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = $(), o = jt(e), [a, s] = P(null), { prevDisabled: u, nextDisabled: f } = qe(), d = (h) => {
    s(h.currentTarget);
  }, g = () => {
    s(null);
  }, y = (h) => {
    t(h || /* @__PURE__ */ new Date()), g();
  }, m = () => {
    const h = o - 1;
    t(Qe(e, h));
  }, p = () => {
    const h = o + 1;
    t(Qe(e, h));
  };
  return /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: m,
        disabled: u,
        "aria-label": "previous month"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: d, "aria-label": "selected month", children: N(e, "MMMM yyyy", { locale: n }) }),
    /* @__PURE__ */ r(
      _e,
      {
        open: !!a,
        anchorEl: a,
        onClose: g,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        children: /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
          Be,
          {
            ...i,
            openTo: "month",
            views: ["year", "month"],
            value: e,
            onChange: y
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(
      me,
      {
        type: "next",
        onClick: p,
        disabled: f,
        "aria-label": "next month"
      }
    )
  ] });
}, ur = () => {
  const {
    selectedDate: e,
    view: t,
    week: n,
    handleState: i,
    getViews: o,
    translations: a,
    navigation: s,
    day: u,
    month: f,
    disableViewNavigator: d,
    onSelectedDateChange: g,
    onViewChange: y,
    stickyNavigation: m,
    timeZone: p,
    agenda: h,
    toggleAgenda: c,
    enableAgenda: w
  } = $(), [l, b] = P(null), E = Y(), k = wt(E.breakpoints.up("sm")), D = o(), C = (_) => {
    b(_ || null);
  }, x = (_) => {
    i(_, "selectedDate"), g && typeof g == "function" && g(_);
  }, T = (_) => {
    i(_, "view"), y && typeof y == "function" && y(_, h);
  }, v = () => {
    switch (t) {
      case "month":
        return (f == null ? void 0 : f.navigation) && /* @__PURE__ */ r(cr, { selectedDate: e, onChange: x });
      case "week":
        return (n == null ? void 0 : n.navigation) && /* @__PURE__ */ r(
          sr,
          {
            selectedDate: e,
            onChange: x,
            weekProps: n
          }
        );
      case "day":
        return (u == null ? void 0 : u.navigation) && /* @__PURE__ */ r(dr, { selectedDate: e, onChange: x });
      default:
        return "";
    }
  };
  return !s && d ? null : /* @__PURE__ */ M(Yn, { sticky: m ? "1" : "0", children: [
    /* @__PURE__ */ r("div", { "data-testid": "date-navigator", children: s && v() }),
    /* @__PURE__ */ M(
      "div",
      {
        className: "rs__view_navigator",
        "data-testid": "view-navigator",
        style: {
          visibility: d ? "hidden" : "visible"
        },
        children: [
          /* @__PURE__ */ r(
            X,
            {
              onClick: () => x(ge(/* @__PURE__ */ new Date(), p)),
              "aria-label": a.navigation.today,
              children: a.navigation.today
            }
          ),
          w && (k ? /* @__PURE__ */ r(
            X,
            {
              color: h ? "primary" : "inherit",
              onClick: c,
              "aria-label": a.navigation.agenda,
              children: a.navigation.agenda
            }
          ) : /* @__PURE__ */ r(
            fe,
            {
              color: h ? "primary" : "default",
              style: { padding: 5 },
              onClick: c,
              children: /* @__PURE__ */ r(Mn, {})
            }
          )),
          D.length > 1 && (k ? D.map((_) => /* @__PURE__ */ r(
            X,
            {
              color: _ === t ? "primary" : "inherit",
              onClick: () => T(_),
              onDragOver: (S) => {
                S.preventDefault(), T(_);
              },
              children: a.navigation[_]
            },
            _
          )) : /* @__PURE__ */ M(K, { children: [
            /* @__PURE__ */ r(
              fe,
              {
                style: { padding: 5 },
                onClick: (_) => {
                  C(_.currentTarget);
                },
                children: /* @__PURE__ */ r(En, {})
              }
            ),
            /* @__PURE__ */ r(
              _e,
              {
                open: !!l,
                anchorEl: l,
                onClose: () => {
                  C();
                },
                anchorOrigin: {
                  vertical: "center",
                  horizontal: "center"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center"
                },
                children: /* @__PURE__ */ r(an, { autoFocusItem: !!l, disablePadding: !0, children: D.map((_) => /* @__PURE__ */ r(
                  Oe,
                  {
                    selected: _ === t,
                    onClick: () => {
                      C(), T(_);
                    },
                    children: a.navigation[_]
                  },
                  _
                )) })
              }
            )
          ] }))
        ]
      }
    )
  ] });
}, hr = ({
  type: e = "datetime",
  value: t,
  label: n,
  name: i,
  onChange: o,
  variant: a = "outlined",
  error: s,
  errMsg: u,
  touched: f,
  required: d
}) => {
  var w, l;
  const { translations: g } = $(), [y, m] = P({
    touched: !1,
    valid: !!t,
    errorMsg: u || (d ? ((w = g == null ? void 0 : g.validation) == null ? void 0 : w.required) || "Required" : void 0)
  }), p = e === "date" ? Sn : In, h = y.touched && (s || !y.valid), c = U(
    (b) => {
      var x;
      const E = !isNaN(Date.parse(b)), k = typeof b == "string" && E ? new Date(b) : b;
      let D = !0, C = u;
      d && !k && (D = !1, C = u || ((x = g == null ? void 0 : g.validation) == null ? void 0 : x.required) || "Required"), m((T) => ({ ...T, touched: !0, valid: D, errorMsg: C })), o(i, k);
    },
    [u, i, o, d, (l = g == null ? void 0 : g.validation) == null ? void 0 : l.required]
  );
  return ee(() => {
    f && c(t);
  }, [c, f, t]), /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
    p,
    {
      value: t instanceof Date ? t : new Date(t),
      label: n,
      onChange: (b) => {
        c(b);
      },
      minutesStep: 5,
      slotProps: {
        textField: {
          variant: a,
          helperText: h && y.errorMsg,
          error: h,
          fullWidth: !0
        }
      }
    }
  ) });
}, fr = ({
  variant: e = "outlined",
  label: t,
  placeholder: n,
  value: i,
  name: o,
  required: a,
  min: s,
  max: u,
  email: f,
  decimal: d,
  onChange: g,
  disabled: y,
  multiline: m,
  rows: p,
  touched: h
}) => {
  const [c, w] = P({
    touched: !1,
    valid: !1,
    errorMsg: ""
  }), { translations: l } = $(), b = U(
    (E) => {
      var x, T, v, _, S, I, H, z, V;
      const k = E;
      let D = !0, C = "";
      f && (D = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(k) && D, C = ((x = l == null ? void 0 : l.validation) == null ? void 0 : x.invalidEmail) || "Invalid Email"), d && (D = /^[0-9]+(\.[0-9]*)?$/.test(k) && D, C = ((T = l == null ? void 0 : l.validation) == null ? void 0 : T.onlyNumbers) || "Only Numbers Allowed"), s && `${k}`.trim().length < s && (D = !1, C = typeof ((v = l == null ? void 0 : l.validation) == null ? void 0 : v.min) == "function" ? (_ = l == null ? void 0 : l.validation) == null ? void 0 : _.min(s) : ((S = l == null ? void 0 : l.validation) == null ? void 0 : S.min) || `Minimum ${s} letters`), u && `${k}`.trim().length > u && (D = !1, C = typeof ((I = l == null ? void 0 : l.validation) == null ? void 0 : I.max) == "function" ? (H = l == null ? void 0 : l.validation) == null ? void 0 : H.max(u) : ((z = l == null ? void 0 : l.validation) == null ? void 0 : z.max) || `Maximum ${u} letters`), a && `${k}`.trim().length <= 0 && (D = !1, C = ((V = l == null ? void 0 : l.validation) == null ? void 0 : V.required) || "Required"), w({ touched: !0, valid: D, errorMsg: C }), g(o, k, D);
    },
    [d, f, u, s, o, g, a, l == null ? void 0 : l.validation]
  );
  return ee(() => {
    h && b(i);
  }, [b, h, i]), /* @__PURE__ */ r(
    ln,
    {
      variant: e,
      label: t && /* @__PURE__ */ r(A, { variant: "body2", children: `${t} ${a ? "*" : ""}` }),
      value: i,
      name: o,
      onChange: (E) => b(E.target.value),
      disabled: y,
      error: c.touched && !c.valid,
      helperText: c.touched && !c.valid && c.errorMsg,
      multiline: m,
      rows: p,
      style: { width: "100%" },
      InputProps: {
        placeholder: n || ""
      }
    }
  );
}, gr = ({
  options: e,
  value: t,
  name: n,
  required: i,
  onChange: o,
  label: a,
  disabled: s,
  touched: u,
  variant: f = "outlined",
  loading: d,
  multiple: g,
  placeholder: y,
  errMsg: m
}) => {
  var E, k;
  const p = Y(), { translations: h } = $(), [c, w] = P({
    touched: !1,
    valid: !!t,
    errorMsg: m || (i ? ((E = h == null ? void 0 : h.validation) == null ? void 0 : E.required) || "Required" : void 0)
  }), l = U(() => {
    c.touched || w((D) => ({ ...D, touched: !0, errorMsg: m || D.errorMsg }));
  }, [m, c.touched]), b = U(
    (D) => {
      var v;
      const C = D;
      let x = !0, T = m;
      i && (g ? !C.length : !C) && (x = !1, T = m || ((v = h == null ? void 0 : h.validation) == null ? void 0 : v.required) || "Required"), w((_) => ({ ..._, touched: !0, valid: x, errorMsg: T })), o(n, C, x);
    },
    [m, g, n, o, i, (k = h == null ? void 0 : h.validation) == null ? void 0 : k.required]
  );
  return ee(() => {
    u && b(t);
  }, [b, u, t]), /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ M(
      sn,
      {
        variant: f || "outlined",
        fullWidth: !0,
        error: i && c.touched && !c.valid,
        disabled: s,
        children: [
          a && /* @__PURE__ */ r(dn, { id: `input_${n}`, children: /* @__PURE__ */ r(A, { variant: "body2", children: `${a} ${i ? "*" : ""}` }) }),
          /* @__PURE__ */ M(
            cn,
            {
              label: a,
              labelId: `input_${n}`,
              value: t,
              onBlur: l,
              onChange: (D) => b(D.target.value),
              IconComponent: d ? () => /* @__PURE__ */ r(Dt, { size: 5 }) : Fn,
              multiple: !!g,
              classes: {
                select: g === "chips" ? "flex__wrap" : void 0
              },
              renderValue: (D) => {
                if (!D || D.length === 0)
                  return /* @__PURE__ */ r("em", { children: a });
                const C = [];
                if (g) {
                  for (const x of e)
                    D.includes(x.value) && C.push([x.text]);
                  return g === "chips" ? C.map((x, T) => /* @__PURE__ */ r(hn, { label: x, style: { margin: "0 2px" }, color: "primary" }, `${x}_${T}`)) : C.join(",");
                } else {
                  for (const x of e)
                    D === x.value && C.push([x.text]);
                  return C.join(",");
                }
              },
              children: [
                y && /* @__PURE__ */ r(Oe, { value: "", children: /* @__PURE__ */ r("em", { children: y }) }),
                e.map((D) => /* @__PURE__ */ M(Oe, { value: D.value, children: [
                  g && /* @__PURE__ */ r(un, { checked: t.indexOf(D.value) > -1, color: "primary" }),
                  D.text
                ] }, D.id || D.value))
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ r(fn, { style: { color: p.palette.error.main }, children: c.touched && !c.valid && c.errorMsg })
  ] });
}, at = (e, t) => {
  var i;
  const n = {};
  for (const o of e) {
    const a = We(o, o.default, t), s = We(o, t == null ? void 0 : t[o.name], t);
    n[o.name] = {
      value: s.value || a.value || "",
      validity: (i = o.config) != null && i.required ? !!s.validity || !!a.validity : !0,
      type: o.type,
      config: o.config
    };
  }
  return {
    event_id: {
      value: (t == null ? void 0 : t.event_id) || null,
      validity: !0,
      type: "hidden"
    },
    title: {
      value: (t == null ? void 0 : t.title) || "",
      validity: !!(t != null && t.title),
      type: "input",
      config: { label: "Title", required: !0, min: 3 }
    },
    subtitle: {
      value: (t == null ? void 0 : t.subtitle) || "",
      validity: !0,
      type: "input",
      config: { label: "Subtitle", required: !1 }
    },
    start: {
      value: (t == null ? void 0 : t.start) || /* @__PURE__ */ new Date(),
      validity: !0,
      type: "date",
      config: { label: "Start", sm: 6 }
    },
    end: {
      value: (t == null ? void 0 : t.end) || /* @__PURE__ */ new Date(),
      validity: !0,
      type: "date",
      config: { label: "End", sm: 6 }
    },
    ...n
  };
}, pr = () => {
  const {
    fields: e,
    dialog: t,
    triggerDialog: n,
    selectedRange: i,
    selectedEvent: o,
    resourceFields: a,
    selectedResource: s,
    triggerLoading: u,
    onConfirm: f,
    customEditor: d,
    confirmEvent: g,
    dialogMaxWidth: y,
    translations: m,
    timeZone: p
  } = $(), [h, c] = P(at(e, o || i)), [w, l] = P(!1), b = Y(), E = wt(b.breakpoints.down("sm")), k = (v, _, S) => {
    c((I) => ({
      ...I,
      [v]: { ...I[v], value: _, validity: S }
    }));
  }, D = (v) => {
    v && c(at(e)), n(!1);
  }, C = async () => {
    let v = {};
    for (const _ in h)
      if (v[_] = h[_].value, !d && !h[_].validity)
        return l(!0);
    try {
      u(!0), v.end = v.start >= v.end ? ae(v.start, ke(i == null ? void 0 : i.end, i == null ? void 0 : i.start)) : v.end;
      const _ = o != null && o.event_id ? "edit" : "create";
      f ? v = await f(v, _) : v.event_id = (o == null ? void 0 : o.event_id) || Date.now().toString(36) + Math.random().toString(36).slice(2), v.start = Pe(v.start, p), v.end = Pe(v.end, p), g(v, _), D(!0);
    } catch (_) {
      console.error(_);
    } finally {
      u(!1);
    }
  }, x = (v) => {
    var S, I, H;
    const _ = h[v];
    switch (_.type) {
      case "input":
        return /* @__PURE__ */ r(
          fr,
          {
            value: _.value,
            name: v,
            onChange: k,
            touched: w,
            ..._.config,
            label: m.event[v] || ((S = _.config) == null ? void 0 : S.label)
          }
        );
      case "date":
        return /* @__PURE__ */ r(
          hr,
          {
            value: _.value,
            name: v,
            onChange: (...V) => k(...V, !0),
            touched: w,
            ..._.config,
            label: m.event[v] || ((I = _.config) == null ? void 0 : I.label)
          }
        );
      case "select":
        const z = e.find((V) => V.name === v);
        return /* @__PURE__ */ r(
          gr,
          {
            value: _.value,
            name: v,
            options: (z == null ? void 0 : z.options) || [],
            onChange: k,
            touched: w,
            ..._.config,
            label: m.event[v] || ((H = _.config) == null ? void 0 : H.label)
          }
        );
      default:
        return "";
    }
  };
  return /* @__PURE__ */ r(
    gn,
    {
      open: t,
      fullScreen: E,
      maxWidth: y,
      onClose: () => {
        n(!1);
      },
      children: (() => {
        if (d) {
          const v = {
            state: h,
            close: () => n(!1),
            loading: (_) => u(_),
            edited: o,
            onConfirm: g,
            [a.idField]: s
          };
          return d(v);
        }
        return /* @__PURE__ */ M(K, { children: [
          /* @__PURE__ */ r(pn, { children: o ? m.form.editTitle : m.form.addTitle }),
          /* @__PURE__ */ r(mn, { style: { overflowX: "hidden" }, children: /* @__PURE__ */ r(et, { container: !0, spacing: 2, children: Object.keys(h).map((v) => {
            var S;
            const _ = h[v];
            return /* @__PURE__ */ r(et, { size: { sm: (S = _.config) == null ? void 0 : S.sm, xs: 12 }, children: x(v) }, v);
          }) }) }),
          /* @__PURE__ */ M(yn, { children: [
            /* @__PURE__ */ r(X, { color: "inherit", fullWidth: !0, onClick: () => D(), children: m.form.cancel }),
            /* @__PURE__ */ r(X, { color: "primary", fullWidth: !0, onClick: C, children: m.form.confirm })
          ] })
        ] });
      })()
    }
  );
}, mr = ({ events: e, resource: t }) => {
  const {
    month: n,
    handleGotoDay: i,
    locale: o,
    timeZone: a,
    selectedDate: s,
    translations: u,
    alwaysShowAgendaDays: f
  } = $(), { disableGoToDay: d, headRenderer: g } = n, y = Ut(s), m = Array.from({ length: y }, (h, c) => c + 1), p = j(() => e.filter((h) => yt(h.start, s)), [e, s]);
  return !f && !p.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: m.map((h) => {
    const c = new Date(s.getFullYear(), s.getMonth(), h), w = se({ dateLeft: c, timeZone: a }), l = xe(e, c);
    return !f && !l.length ? null : /* @__PURE__ */ M("div", { className: `rs__agenda_row ${he(c) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof g == "function" ? /* @__PURE__ */ r("div", { children: g({ day: c, events: e, resource: t }) }) : /* @__PURE__ */ r(
        A,
        {
          sx: { fontWeight: w ? "bold" : "inherit" },
          color: w ? "primary" : "inherit",
          variant: "body2",
          className: d ? "" : "rs__hover__op",
          onClick: (b) => {
            b.stopPropagation(), d || i(c);
          },
          children: N(c, "dd E", { locale: o })
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: l.length > 0 ? /* @__PURE__ */ r(je, { day: c, events: l }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: u.noDataToDisplay }) })
    ] }, h);
  }) });
}, yr = ({
  events: e,
  resourceId: t,
  today: n,
  eachWeekStart: i,
  eachFirstDayInCalcRow: o,
  daysList: a,
  onViewMore: s,
  cellHeight: u
}) => {
  const f = Math.round((u - it) / ce - 1), { translations: d, month: g, locale: y, timeZone: m } = $(), { renderedSlots: p } = Ot(), h = j(() => {
    var w;
    const c = [];
    for (let l = 0; l < Math.min(e.length, f + 1); l++) {
      const b = Ce(e[l], m), E = !!o && De(b.start, o), k = E && o ? o : b.start;
      let D = le(k, b.end) + 1;
      const C = Zt(b.end, k, {
        weekStartsOn: g == null ? void 0 : g.weekStartOn,
        locale: y
      }) > 0;
      if (C) {
        const S = Ee(b.start, {
          weekStartsOn: g == null ? void 0 : g.weekStartOn,
          locale: y
        }), I = qt(S, i);
        I && (D = a.length - (o ? 0 : ht(b.start, I)));
      }
      const x = N(n, "yyyy-MM-dd"), T = (w = p == null ? void 0 : p[t || "all"]) == null ? void 0 : w[x], v = (T == null ? void 0 : T[b.event_id]) || 0, _ = Math.min(v, f) * ce + it;
      if (v >= f) {
        c.push(
          /* @__PURE__ */ r(
            A,
            {
              width: "100%",
              className: "rs__multi_day rs__hover__op",
              style: { top: _, fontSize: 11 },
              onClick: (S) => {
                S.stopPropagation(), s(n);
              },
              children: `${Math.abs(e.length - l)} ${d.moreEvents}`
            },
            l
          )
        );
        break;
      }
      c.push(
        /* @__PURE__ */ r(
          "div",
          {
            className: "rs__multi_day",
            style: {
              top: _,
              width: `${100 * D}%`,
              height: nr
            },
            children: /* @__PURE__ */ r(
              Ie,
              {
                event: b,
                showdate: !1,
                multiday: le(b.start, b.end) > 0,
                hasPrev: E,
                hasNext: C
              }
            )
          },
          `${b.event_id}_${l}`
        )
      );
    }
    return c;
  }, [
    t,
    p,
    e,
    f,
    o,
    g == null ? void 0 : g.weekStartOn,
    y,
    n,
    i,
    a.length,
    d.moreEvents,
    s,
    m
  ]);
  return /* @__PURE__ */ r(K, { children: h });
}, vr = ({ daysList: e, resource: t, eachWeekStart: n }) => {
  const {
    height: i,
    month: o,
    selectedDate: a,
    events: s,
    handleGotoDay: u,
    resourceFields: f,
    fields: d,
    locale: g,
    hourFormat: y,
    stickyNavigation: m,
    timeZone: p,
    onClickMore: h
  } = $(), { weekDays: c, startHour: w, endHour: l, cellRenderer: b, headRenderer: E, disableGoToDay: k } = o, { headersRef: D, bodyRef: C } = $t(), x = Y(), T = Le(a), v = ye(y), _ = i / n.length, S = U(
    (I) => {
      let H = Me(s);
      I && (H = be(s, I, f, d));
      const z = [];
      for (const V of n) {
        const W = c.map((R) => {
          const F = q(V, R), B = /* @__PURE__ */ new Date(`${N(Je(F, w), `yyyy/MM/dd ${v}`)}`), te = /* @__PURE__ */ new Date(`${N(Je(F, l), `yyyy/MM/dd ${v}`)}`), G = f.idField, ne = ue(V, F) ? F : null, O = H.flatMap((L) => Ct(L, F)).filter((L) => {
            if (ue(L.start, F)) return !0;
            const Ne = { start: J(L.start), end: Q(L.end) };
            return !!(ne && oe(ne, Ne));
          }), re = se({ dateLeft: F, timeZone: p });
          return /* @__PURE__ */ M("span", { style: { height: _ }, className: "rs__cell", children: [
            /* @__PURE__ */ r(
              Ze,
              {
                start: B,
                end: te,
                day: a,
                height: _,
                resourceKey: G,
                resourceVal: I ? I[G] : null,
                cellRenderer: b
              }
            ),
            /* @__PURE__ */ M(K, { children: [
              typeof E == "function" ? /* @__PURE__ */ r("div", { style: { position: "absolute", top: 0 }, children: E({ day: F, events: H, resource: I }) }) : /* @__PURE__ */ r(
                Ve,
                {
                  style: {
                    width: 27,
                    height: 27,
                    position: "absolute",
                    top: 0,
                    background: re ? x.palette.secondary.main : "transparent",
                    color: re ? x.palette.secondary.contrastText : "",
                    marginBottom: 2
                  },
                  children: /* @__PURE__ */ r(
                    A,
                    {
                      color: yt(F, T) ? "textPrimary" : "#ccc",
                      className: k ? "" : "rs__hover__op",
                      onClick: (L) => {
                        L.stopPropagation(), k || u(F);
                      },
                      children: N(F, "dd")
                    }
                  )
                }
              ),
              /* @__PURE__ */ r(
                yr,
                {
                  events: O,
                  resourceId: I == null ? void 0 : I[G],
                  today: F,
                  eachWeekStart: n,
                  eachFirstDayInCalcRow: ne,
                  daysList: e,
                  onViewMore: (L) => {
                    h && typeof h == "function" ? h(L, u) : u(L);
                  },
                  cellHeight: _
                }
              )
            ] })
          ] }, R.toString());
        });
        z.push(/* @__PURE__ */ r(K, { children: W }, V.toString()));
      }
      return z;
    },
    [
      _,
      b,
      e,
      k,
      n,
      l,
      s,
      d,
      v,
      u,
      E,
      T,
      h,
      f,
      a,
      w,
      x.palette.secondary.contrastText,
      x.palette.secondary.main,
      p,
      c
    ]
  );
  return /* @__PURE__ */ M(Z, { children: [
    /* @__PURE__ */ r(
      pe,
      {
        days: e.length,
        ref: D,
        indent: "0",
        sticky: "1",
        stickyNavigation: m,
        children: e.map((I, H) => /* @__PURE__ */ r(
          A,
          {
            className: "rs__cell rs__header rs__header__center",
            align: "center",
            variant: "body2",
            children: N(I, "EE", { locale: g })
          },
          H
        ))
      }
    ),
    /* @__PURE__ */ r(pe, { days: e.length, ref: C, indent: "0", children: S(t) })
  ] });
}, _r = () => {
  const {
    month: e,
    selectedDate: t,
    events: n,
    getRemoteEvents: i,
    triggerLoading: o,
    handleState: a,
    resources: s,
    resourceFields: u,
    fields: f,
    agenda: d
  } = $(), { weekStartOn: g, weekDays: y } = e, m = Le(t), p = pt(t), h = Xt(
    {
      start: m,
      end: p
    },
    { weekStartsOn: g }
  ), c = y.map((b) => q(h[0], b)), w = U(async () => {
    try {
      o(!0);
      const b = h[0], E = q(h[h.length - 1], c.length), k = await i({
        start: b,
        end: E,
        view: "month"
      });
      k && (k != null && k.length) && a(k, "events");
    } catch (b) {
      throw b;
    } finally {
      o(!1);
    }
  }, [c.length, i]);
  ee(() => {
    i instanceof Function && w();
  }, [w, i]);
  const l = U(
    (b) => {
      if (d) {
        let E = Me(n);
        return b && (E = be(n, b, u, f)), /* @__PURE__ */ r(mr, { resource: b, events: E });
      }
      return /* @__PURE__ */ r(vr, { daysList: c, eachWeekStart: h, resource: b });
    },
    [d, c, h, n, f, u]
  );
  return s.length ? /* @__PURE__ */ r(Ge, { renderChildren: l }) : l();
}, br = ({ events: e, resource: t }) => {
  const { day: n, locale: i, selectedDate: o, translations: a, alwaysShowAgendaDays: s } = $(), { headRenderer: u } = n, f = j(() => xe(e, o), [e, o]);
  return !s && !f.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: /* @__PURE__ */ M("div", { className: "rs__agenda_row rs__today_cell", children: [
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof u == "function" ? /* @__PURE__ */ r("div", { children: u({ day: o, events: e, resource: t }) }) : /* @__PURE__ */ r(A, { variant: "body2", children: N(o, "dd E", { locale: i }) }) }),
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: f.length > 0 ? /* @__PURE__ */ r(je, { day: o, events: f }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: a.noDataToDisplay }) })
  ] }) });
}, wr = () => {
  const {
    day: e,
    selectedDate: t,
    events: n,
    height: i,
    getRemoteEvents: o,
    triggerLoading: a,
    handleState: s,
    resources: u,
    resourceFields: f,
    resourceViewMode: d,
    fields: g,
    direction: y,
    locale: m,
    hourFormat: p,
    timeZone: h,
    stickyNavigation: c,
    agenda: w
  } = $(), { startHour: l, endHour: b, step: E, cellRenderer: k, headRenderer: D, hourRenderer: C } = e, x = ve(t, { hours: l, minutes: 0, seconds: 0 }), T = ve(t, { hours: b, minutes: -E, seconds: 0 }), v = gt(
    {
      start: x,
      end: T
    },
    { step: E }
  ), _ = Tt(i, v.length), S = xt(_, E), I = ye(p), H = U(async () => {
    try {
      a(!0);
      const W = q(x, -1), R = q(T, 1), F = await o({
        start: W,
        end: R,
        view: "day"
      });
      F && (F != null && F.length) && s(F, "events");
    } catch (W) {
      throw W;
    } finally {
      a(!1);
    }
  }, [o]);
  ee(() => {
    o instanceof Function && H();
  }, [H, o]);
  const z = U(
    (W) => {
      const R = Te(W, t, h);
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__block_col",
          style: { height: ce * R.length },
          children: R.map((F, B) => {
            const te = De(F.start, J(t)), G = ft(F.end, Q(t));
            return /* @__PURE__ */ r(
              "div",
              {
                className: "rs__multi_day",
                style: {
                  top: B * ce,
                  width: "99.9%",
                  overflowX: "hidden"
                },
                children: /* @__PURE__ */ r(Ie, { event: F, multiday: !0, hasPrev: te, hasNext: G })
              },
              F.event_id
            );
          })
        }
      );
    },
    [t, h]
  ), V = U(
    (W) => {
      let R = n;
      if (W && (R = be(n, W, f, g)), w)
        return /* @__PURE__ */ r(br, { resource: W, events: R });
      const F = u.length && d === "default", B = Te(
        F ? n : R,
        t,
        h
      ), te = ce * B.length + 45;
      return /* @__PURE__ */ M(Z, { children: [
        /* @__PURE__ */ M(pe, { days: 1, sticky: "1", stickyNavigation: c, children: [
          /* @__PURE__ */ r("span", { className: "rs__cell" }),
          /* @__PURE__ */ M(
            "span",
            {
              className: `rs__cell rs__header ${he(t) ? "rs__today_cell" : ""}`,
              style: { height: te },
              children: [
                typeof D == "function" ? /* @__PURE__ */ r("div", { children: D({ day: t, events: R, resource: W }) }) : /* @__PURE__ */ r(At, { date: t, locale: m }),
                z(R)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r(pe, { days: 1, children: v.map((G, ne) => {
          const O = /* @__PURE__ */ new Date(`${N(t, "yyyy/MM/dd")} ${N(G, I)}`), re = ae(O, E), L = f.idField;
          return /* @__PURE__ */ M(K, { children: [
            /* @__PURE__ */ r("span", { className: "rs__cell rs__header rs__time", style: { height: _ }, children: typeof C == "function" ? /* @__PURE__ */ r("div", { children: C(N(G, I, { locale: m })) }) : /* @__PURE__ */ r(A, { variant: "caption", children: N(G, I, { locale: m }) }) }),
            /* @__PURE__ */ M("span", { className: `rs__cell ${he(t) ? "rs__today_cell" : ""}`, children: [
              ne === 0 && /* @__PURE__ */ r(
                Wt,
                {
                  todayEvents: kt(R, t, h),
                  today: x,
                  minuteHeight: S,
                  startHour: l,
                  endHour: b,
                  step: E,
                  direction: y,
                  timeZone: h
                }
              ),
              /* @__PURE__ */ r(
                Ze,
                {
                  start: O,
                  end: re,
                  day: t,
                  height: _,
                  resourceKey: L,
                  resourceVal: W ? W[L] : null,
                  cellRenderer: k
                }
              )
            ] })
          ] }, ne);
        }) })
      ] });
    },
    [
      _,
      S,
      x,
      w,
      k,
      y,
      b,
      n,
      g,
      I,
      D,
      C,
      v,
      m,
      z,
      f,
      d,
      u.length,
      t,
      l,
      E,
      c,
      h
    ]
  );
  return u.length ? /* @__PURE__ */ r(Ge, { renderChildren: V }) : V();
}, lt = (e) => {
  const t = {};
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i], a = Yt({ start: o.start, end: o.end });
    for (let s = 0; s < a.length; s++) {
      const u = N(a[s], "yyyy-MM-dd");
      if (t[u]) {
        const f = Object.values(t[u]);
        for (; f.includes(n); )
          n += 1;
        t[u][o.event_id] = n;
      } else
        t[u] = { [o.event_id]: n };
    }
    n = 0;
  }
  return t;
}, st = (e, t, n, i, o) => {
  const a = o === "month" ? Et(e) : Me(e), s = {};
  if (t.length)
    for (const u of t) {
      const f = be(a, u, n, i), d = lt(f);
      s[u[n.idField]] = d;
    }
  else
    s.all = lt(a);
  return s;
}, Dr = ({ children: e }) => {
  const { events: t, resources: n, resourceFields: i, fields: o, view: a } = $(), [s, u] = P({
    renderedSlots: st(t, n, i, o, a)
  });
  ee(() => {
    u((d) => ({
      ...d,
      renderedSlots: st(
        t,
        n,
        i,
        o,
        a
      )
    }));
  }, [t, o, i, n, a]);
  const f = (d, g, y, m) => {
    u((p) => {
      var h, c, w, l, b;
      return {
        ...p,
        renderedSlots: {
          ...p.renderedSlots,
          [m || "all"]: {
            ...(h = p.renderedSlots) == null ? void 0 : h[m || "all"],
            [d]: (w = (c = p.renderedSlots) == null ? void 0 : c[m || "all"]) != null && w[d] ? {
              ...(b = (l = p.renderedSlots) == null ? void 0 : l[m || "all"]) == null ? void 0 : b[d],
              [g]: y
            } : { [g]: y }
          }
        }
      };
    });
  };
  return /* @__PURE__ */ r(
    Rt.Provider,
    {
      value: {
        ...s,
        setRenderedSlot: f
      },
      children: e
    }
  );
}, xr = ut(function(t, n) {
  const i = $(), { view: o, dialog: a, loading: s, loadingComponent: u, resourceViewMode: f, resources: d, translations: g } = i, y = j(() => {
    switch (o) {
      case "month":
        return /* @__PURE__ */ r(_r, {});
      case "week":
        return /* @__PURE__ */ r(lr, {});
      case "day":
        return /* @__PURE__ */ r(wr, {});
      default:
        return "";
    }
  }, [o]), m = j(() => /* @__PURE__ */ r("div", { className: "rs__table_loading", children: u || /* @__PURE__ */ r("div", { className: "rs__table_loading_internal", children: /* @__PURE__ */ M("span", { children: [
    /* @__PURE__ */ r(Dt, { size: 50 }),
    /* @__PURE__ */ r(A, { align: "center", children: g.loading })
  ] }) }) }), [u, g.loading]);
  return /* @__PURE__ */ M(
    qn,
    {
      dialog: a ? 1 : 0,
      "data-testid": "rs-wrapper",
      ref: (p) => {
        const h = n;
        h && (h.current = {
          el: p,
          scheduler: i
        });
      },
      children: [
        s ? m : null,
        /* @__PURE__ */ r(ur, {}),
        /* @__PURE__ */ r(
          Xn,
          {
            resource_count: f === "default" ? d.length : 1,
            sx: {
              overflowX: f === "default" && d.length > 1 ? "auto" : void 0,
              flexDirection: f === "vertical" ? "column" : void 0
            },
            "data-testid": "grid",
            children: /* @__PURE__ */ r(Dr, { children: y })
          }
        ),
        a && /* @__PURE__ */ r(pr, {})
      ]
    }
  );
}), Tr = ({ children: e, initial: t }) => {
  const [n, i] = P({ ...St, ...Mt(t) });
  ee(() => {
    i((p) => ({
      ...p,
      onEventDrop: t.onEventDrop,
      customEditor: t.customEditor,
      events: t.events || []
    }));
  }, [t.onEventDrop, t.customEditor, t.events]);
  const o = (p, h) => {
    i((c) => ({ ...c, [h]: p }));
  }, a = () => $n(n), s = () => {
    i((p) => {
      const h = !p.agenda;
      return n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(n.view, h), { ...p, agenda: h };
    });
  }, u = (p, h) => {
    const c = h;
    i((w) => {
      var l;
      return {
        ...w,
        dialog: p,
        selectedRange: c != null && c.event_id ? void 0 : c || {
          start: /* @__PURE__ */ new Date(),
          end: new Date(Date.now() + 3600 * 1e3)
        },
        selectedEvent: c != null && c.event_id ? c : void 0,
        selectedResource: c == null ? void 0 : c[(l = n.resourceFields) == null ? void 0 : l.idField]
      };
    });
  }, f = (p) => {
    typeof t.loading > "u" && i((h) => ({ ...h, loading: p }));
  }, d = (p) => {
    const h = a();
    let c;
    h.includes("day") ? (c = "day", i((w) => ({ ...w, view: "day", selectedDate: p }))) : h.includes("week") ? (c = "week", i((w) => ({ ...w, view: "week", selectedDate: p }))) : console.warn("No Day/Week views available"), c && n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(c, n.agenda), c && n.onSelectedDateChange && typeof n.onSelectedDateChange == "function" && n.onSelectedDateChange(p);
  }, g = (p, h) => {
    let c;
    h === "edit" ? Array.isArray(p) ? c = n.events.map((w) => {
      const l = p.find((b) => b.event_id === w.event_id);
      return l ? { ...w, ...l } : w;
    }) : c = n.events.map(
      (w) => w.event_id === p.event_id ? { ...w, ...p } : w
    ) : c = n.events.concat(p), i((w) => ({ ...w, events: c }));
  }, y = (p) => {
    i((h) => ({ ...h, currentDragged: p }));
  }, m = async (p, h, c, w, l) => {
    var T;
    const b = n.events.find((v) => typeof v.event_id == "number" ? v.event_id === +h : v.event_id === h), E = n.fields.find((v) => v.name === w), k = !!((T = E == null ? void 0 : E.config) != null && T.multiple);
    let D = l;
    if (E) {
      const v = b[w], _ = We(E, v, b).value;
      if (k)
        if (_.includes(l)) {
          if (Ke(b.start, c))
            return;
          D = _;
        } else
          D = _.length > 1 ? [..._, l] : [l];
    }
    if (Ke(b.start, c) && (!D || !k && D === b[w]))
      return;
    const C = ke(b.end, b.start), x = {
      ...b,
      start: c,
      end: ae(c, C),
      recurring: void 0,
      [w]: D || ""
    };
    if (!n.onEventDrop || typeof n.onEventDrop != "function")
      return g(x, "edit");
    try {
      f(!0);
      const v = await n.onEventDrop(p, c, x, b);
      v && g(v, "edit");
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ r(
    It.Provider,
    {
      value: {
        ...n,
        handleState: o,
        getViews: a,
        toggleAgenda: s,
        triggerDialog: u,
        triggerLoading: f,
        handleGotoDay: d,
        confirmEvent: g,
        setCurrentDragged: y,
        onDrop: m
      },
      children: e
    }
  );
}, qr = ut(function(t, n) {
  return /* @__PURE__ */ r(Tr, { initial: t, children: /* @__PURE__ */ r(xr, { ref: n }) });
});
export {
  qr as Scheduler
};
