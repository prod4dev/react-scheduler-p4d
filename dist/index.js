import { jsxs as E, jsx as r, Fragment as Z } from "react/jsx-runtime";
import { createContext as dt, useContext as ct, useMemo as j, useState as P, Fragment as K, useRef as Ye, useEffect as ee, useCallback as U, forwardRef as ut } from "react";
import { isWithinInterval as oe, endOfDay as Q, startOfDay as J, format as $, isSameDay as ce, differenceInDays as ht, addSeconds as Lt, subMinutes as Vt, addMinutes as ae, differenceInMilliseconds as Bt, addDays as q, addMilliseconds as Gt, isToday as ue, differenceInMinutes as ke, set as ye, isBefore as we, isAfter as ft, startOfWeek as Ee, eachMinuteOfInterval as gt, endOfMonth as pt, endOfWeek as mt, startOfMonth as Le, getMonth as jt, setMonth as Qe, getDaysInMonth as Ut, isSameMonth as yt, differenceInCalendarWeeks as Zt, closestTo as qt, setHours as Je, eachWeekOfInterval as Xt, eachDayOfInterval as Yt, isEqual as Ke } from "date-fns";
import { useTheme as Y, ListItem as Qt, ListItemAvatar as _t, Avatar as Ve, ListItemText as vt, Typography as A, Tabs as Jt, Tab as Kt, Box as be, styled as ie, alpha as De, Paper as bt, Grow as en, IconButton as he, Slide as tn, Button as X, Popover as _e, List as nn, ListItemButton as rn, ButtonBase as on, useMediaQuery as wt, MenuList as an, MenuItem as Oe, TextField as sn, FormControl as ln, InputLabel as dn, Select as cn, Checkbox as un, Chip as hn, CircularProgress as Dt, FormHelperText as fn, Dialog as gn, DialogTitle as pn, DialogContent as mn, Grid as et, DialogActions as yn } from "@mui/material";
import { enUS as _n } from "date-fns/locale";
import { styled as vn } from "@mui/material/styles";
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
const $n = (e) => {
  if (e.month)
    return "month";
  if (e.week)
    return "week";
  if (e.day)
    return "day";
  throw new Error("No views were selected");
}, Nn = (e) => {
  const t = [];
  return e.month && t.push("month"), e.week && t.push("week"), e.day && t.push("day"), t;
}, We = (e, t, n) => {
  var s;
  const i = ((s = e.config) == null ? void 0 : s.multiple) && !Array.isArray((n == null ? void 0 : n[e.name]) || e.default), o = i ? t ? [t] : [] : t, a = i ? o.length : o;
  return { value: o, validity: a };
}, ve = (e, t, n, i) => {
  var h;
  const o = n.idField, a = i.find((d) => d.name === o), s = !!((h = a == null ? void 0 : a.config) != null && h.multiple), c = [];
  for (const d of e) {
    const v = s && !Array.isArray(d[o]) ? [d[o]] : d[o];
    (s || Array.isArray(v) ? v.includes(t[o]) : v === t[o]) && c.push({
      ...d,
      color: d.color || t[n.colorField || ""]
    });
  }
  return c;
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
), xt = (e, t) => Math.ceil(e) / t, Tt = (e, t) => Math.max(e / t, 60), se = (e, t) => ht(Q(Lt(t, -1)), J(e)), Rn = (e) => new Date(
  e.getUTCFullYear(),
  e.getUTCMonth(),
  e.getUTCDate(),
  e.getUTCHours(),
  e.getUTCMinutes()
), Ct = (e, t, n) => {
  var o;
  const i = Bt(e.end, e.start);
  return e.recurring ? (o = e.recurring) == null ? void 0 : o.between(q(t, -1), q(t, 1), !0).map((a, s) => {
    const c = Rn(a);
    return {
      ...e,
      recurrenceId: s,
      start: c,
      end: Gt(c, i)
    };
  }).map((a) => Ce(a, n)) : [Ce(e, n)];
}, kt = (e, t, n) => {
  const i = [];
  for (let o = 0; o < e.length; o++)
    for (const a of Ct(e[o], t, n))
      !a.allDay && ce(t, a.start) && !se(a.start, a.end) && i.push(a);
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
}), Me = (e) => e.sort((t, n) => t.allDay || se(t.start, t.end) > 0 ? -1 : t.start.getTime() - n.start.getTime()), Te = (e, t, n, i) => {
  var c;
  const o = Array.isArray(t), a = [], s = {};
  for (let h = 0; h < e.length; h++) {
    const d = Ce(e[h], n);
    let g = d.allDay || se(d.start, d.end) > 0;
    if (g && (o ? g = t.some(
      (v) => oe(v, {
        start: J(d.start),
        end: Q(d.end)
      })
    ) : g = oe(t, {
      start: J(d.start),
      end: Q(d.end)
    }), g))
      if (a.push(d), o)
        for (const v of t) {
          const p = $(v, "yyyy-MM-dd");
          oe(v, { start: J(d.start), end: Q(d.end) }) && (s[p] = (s[p] || []).concat(d));
        }
      else {
        const v = $(d.start, "yyyy-MM-dd");
        s[v] = (s[v] || []).concat(d);
      }
  }
  return o && i ? ((c = Object.values(s).sort((h, d) => d.length - h.length)) == null ? void 0 : c[0]) || [] : a;
}, Ce = (e, t) => ({
  ...e,
  start: fe(e.start, t),
  end: fe(e.end, t),
  convertedTz: !0
}), fe = (e, t) => new Date(
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
}, le = ({
  dateLeft: e,
  dateRight: t,
  timeZone: n
}) => ce(e, fe(t || /* @__PURE__ */ new Date(), n)), me = (e) => e === "12" ? "hh:mm a" : "HH:mm";
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
    direction: c,
    dialogMaxWidth: h,
    hourFormat: d,
    ...g
  } = e, v = Vn(e), p = i || "week", m = v[p] ? p : $n(v);
  return {
    ...v,
    translations: Ln(t),
    resourceFields: Object.assign(zn, n),
    view: m,
    selectedDate: fe(a || /* @__PURE__ */ new Date(), e.timeZone),
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
    direction: c || "ltr",
    dialogMaxWidth: h || "md",
    locale: _n,
    deletable: !0,
    editable: !0,
    hourFormat: d || "12",
    draggable: !0,
    agenda: o,
    enableAgenda: typeof o > "u" || o,
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
}, It = dt(St), N = () => ct(It), He = ({ resource: e }) => {
  const { resourceHeaderComponent: t, resourceFields: n, direction: i, resourceViewMode: o } = N(), a = Y(), s = e[n.textField], c = e[n.subTextField || ""], h = e[n.avatarField || ""], d = e[n.colorField || ""];
  return t instanceof Function ? t(e) : /* @__PURE__ */ E(
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
        /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r(Ve, { sx: { background: d, margin: "auto" }, alt: s, src: h }) }),
        /* @__PURE__ */ r(
          vt,
          {
            primary: /* @__PURE__ */ r(A, { variant: "body2", noWrap: o !== "vertical", children: s }),
            secondary: /* @__PURE__ */ r(
              A,
              {
                variant: "caption",
                color: "textSecondary",
                noWrap: o !== "vertical",
                children: c
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
const jn = vn("div")(({ theme: e }) => ({
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
}) => /* @__PURE__ */ E(jn, { style: a, children: [
  /* @__PURE__ */ r(
    Jt,
    {
      value: n,
      variant: t,
      scrollButtons: !0,
      className: "tabs",
      classes: { indicator: o },
      children: e.map((s, c) => /* @__PURE__ */ r(
        Kt,
        {
          label: s.label,
          sx: { flex: 1, flexBasis: 200, flexShrink: 0 },
          value: s.id,
          ...Gn(s.id),
          onClick: () => i(s.id),
          onDragEnter: () => i(s.id)
        },
        s.id || c
      ))
    }
  ),
  e.map(
    (s, c) => s.component && /* @__PURE__ */ r(Bn, { value: n, index: s.id, children: s.component }, c)
  )
] }), Ge = ({ renderChildren: e }) => {
  const { resources: t, resourceFields: n, resourceViewMode: i } = N(), o = Y();
  return i === "tabs" ? /* @__PURE__ */ r(Zn, { renderChildren: e }) : i === "vertical" ? /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ E(be, { sx: { display: "flex" }, children: [
    /* @__PURE__ */ r(
      be,
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
      be,
      {
        sx: { width: "100%", overflowX: "auto" },
        children: e(a)
      }
    )
  ] }, `${a[n.idField]}_${s}`)) }) : /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ E("div", { children: [
    /* @__PURE__ */ r(He, { resource: a }),
    e(a)
  ] }, `${a[n.idField]}_${s}`)) });
}, Zn = ({ renderChildren: e }) => {
  const { resources: t, resourceFields: n, selectedTab: i, handleState: o, onResourceChange: a } = N(), s = t.map((d) => ({
    id: d[n.idField],
    label: /* @__PURE__ */ r(He, { resource: d }),
    component: /* @__PURE__ */ r(Z, { children: e(d) })
  })), c = (d) => {
    if (o(d, "selectedTab"), typeof a == "function") {
      const g = t.find((v) => v[n.idField] === d);
      g && a(g);
    }
  }, h = j(() => {
    const d = t[0][n.idField];
    return !i || t.findIndex((v) => v[n.idField] === i) < 0 ? d : i;
  }, [t, n.idField, i]);
  return /* @__PURE__ */ r(Un, { tabs: s, tab: h, setTab: c, style: { display: "grid" } });
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
      background: t ? "" : De(e.palette.background.paper, 0.4),
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
})), ge = ie("div")(({ days: e, sticky: t = "0", stickyNavigation: n, indent: i = "1", theme: o }) => ({
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
        background: De(o.palette.primary.main, 0.1)
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
  const { editable: t, deletable: n, draggable: i } = N(), o = j(() => typeof e.editable < "u" ? e.editable : t, [t, e.editable]), a = j(() => typeof e.deletable < "u" ? e.deletable : n, [n, e.deletable]), s = j(() => {
    if (o)
      return typeof e.draggable < "u" ? e.draggable : i;
  }, [i, e.draggable, o]);
  return {
    canEdit: o,
    canDelete: a,
    canDrag: s
  };
}, er = ({ event: e, onDelete: t, onEdit: n }) => {
  const { translations: i, direction: o } = N(), [a, s] = P(!1), c = () => {
    if (!a)
      return s(!0);
    t();
  }, { canEdit: h, canDelete: d } = Ft(e);
  return /* @__PURE__ */ E(Jn, { children: [
    /* @__PURE__ */ r(en, { in: !a, exit: !1, timeout: 400, unmountOnExit: !0, children: /* @__PURE__ */ E("div", { children: [
      h && /* @__PURE__ */ r(he, { size: "small", onClick: n, children: /* @__PURE__ */ r(wn, {}) }),
      d && /* @__PURE__ */ r(he, { size: "small", onClick: c, children: /* @__PURE__ */ r(bn, {}) })
    ] }) }),
    /* @__PURE__ */ r(
      tn,
      {
        in: a,
        direction: o === "rtl" ? "right" : "left",
        unmountOnExit: !0,
        timeout: 400,
        exit: !1,
        children: /* @__PURE__ */ E("div", { children: [
          /* @__PURE__ */ r(X, { className: "delete", size: "small", onClick: c, children: i.form.delete.toUpperCase() }),
          /* @__PURE__ */ r(X, { className: "cancel", size: "small", onClick: () => s(!1), children: i.form.cancel.toUpperCase() })
        ] })
      }
    )
  ] });
}, $t = ({ anchorEl: e, event: t, onTriggerViewer: n }) => {
  const {
    triggerDialog: i,
    onDelete: o,
    events: a,
    handleState: s,
    triggerLoading: c,
    customViewer: h,
    viewerExtraComponent: d,
    fields: g,
    resources: v,
    resourceFields: p,
    locale: m,
    viewerTitleComponent: f,
    viewerSubtitleComponent: u,
    hourFormat: w,
    translations: l,
    onEventEdit: b
  } = N(), C = Y(), k = se(t.start, t.end) <= 0 && t.allDay, D = me(w), T = p.idField, x = v.filter(
    (y) => Array.isArray(t[T]) ? t[T].includes(y[T]) : y[T] === t[T]
  ), M = async () => {
    try {
      c(!0);
      let y = t.event_id;
      if (o) {
        const _ = await o(y);
        _ ? y = _ : y = "";
      }
      if (y) {
        n();
        const _ = a.filter((S) => S.event_id !== y);
        s(_, "events");
      }
    } catch (y) {
      console.error(y);
    } finally {
      c(!1);
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
      onClick: (y) => {
        y.stopPropagation();
      },
      children: typeof h == "function" ? h(t, () => n()) : /* @__PURE__ */ E(Qn, { children: [
        /* @__PURE__ */ E(
          be,
          {
            sx: {
              bgcolor: t.color || C.palette.primary.main,
              color: C.palette.primary.contrastText
            },
            children: [
              /* @__PURE__ */ E("div", { className: "rs__popper_actions", children: [
                /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                  he,
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
                    onDelete: M,
                    onEdit: () => {
                      n(), i(!0, t), b && typeof b == "function" && b(t);
                    }
                  }
                )
              ] }),
              f instanceof Function ? f(t) : /* @__PURE__ */ r(A, { style: { padding: "5px 0" }, noWrap: !0, children: t.title })
            ]
          }
        ),
        /* @__PURE__ */ E("div", { style: { padding: "5px 10px" }, children: [
          /* @__PURE__ */ E(
            A,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(Dn, {}),
                k ? l.event.allDay : `${$(t.start, `dd MMMM yyyy ${D}`, {
                  locale: m
                })} - ${$(t.end, `dd MMMM yyyy ${D}`, {
                  locale: m
                })}`
              ]
            }
          ),
          u instanceof Function ? u(t) : /* @__PURE__ */ r(A, { variant: "body2", style: { padding: "5px 0" }, children: t.subtitle }),
          x.length > 0 && /* @__PURE__ */ E(
            A,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(Tn, {}),
                x.map((y) => y[p.textField]).join(", ")
              ]
            }
          ),
          d instanceof Function ? d(g, t) : d
        ] })
      ] })
    }
  );
}, je = ({ day: e, events: t }) => {
  const [n, i] = P(null), [o, a] = P(), [s, c] = P(!1), { locale: h, hourFormat: d, eventRenderer: g, onEventClick: v, timeZone: p, disableViewer: m } = N(), f = Y(), u = me(d), w = (l) => {
    !(l != null && l.currentTarget) && s && c(!1), i((l == null ? void 0 : l.currentTarget) || null);
  };
  return /* @__PURE__ */ E(K, { children: [
    /* @__PURE__ */ r(nn, { children: t.map((l) => {
      const C = le({
        dateLeft: l.start,
        dateRight: e,
        timeZone: p
      }) ? u : `MMM d, ${u}`, k = $(l.start, C, {
        locale: h
      }), T = le({ dateLeft: l.end, dateRight: e, timeZone: p }) ? u : `MMM d, ${u}`, x = $(l.end, T, {
        locale: h
      });
      return typeof g == "function" ? g({
        event: l,
        onClick: (M) => {
          a(l), w(M);
        }
      }) : /* @__PURE__ */ E(
        rn,
        {
          focusRipple: !0,
          disableRipple: m,
          tabIndex: m ? -1 : 0,
          disabled: l.disabled,
          onClick: (M) => {
            M.preventDefault(), M.stopPropagation(), m || w(M), a(l), typeof v == "function" && v(l);
          },
          children: [
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r(
              Ve,
              {
                sx: {
                  bgcolor: l.disabled ? "#d0d0d0" : l.color || f.palette.primary.main,
                  color: l.disabled ? "#808080" : l.textColor || f.palette.primary.contrastText
                },
                children: l.agendaAvatar || " "
              }
            ) }),
            /* @__PURE__ */ r(vt, { primary: l.title, secondary: `${k} - ${x}` })
          ]
        },
        `${l.start.getTime()}_${l.end.getTime()}_${l.event_id}`
      );
    }) }),
    o && /* @__PURE__ */ r(
      $t,
      {
        anchorEl: n,
        event: o,
        onTriggerViewer: w
      }
    )
  ] });
}, Ue = () => {
  const { height: e, translations: t } = N();
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
  const { week: i, handleGotoDay: o, locale: a, timeZone: s, translations: c, alwaysShowAgendaDays: h } = N(), { disableGoToDay: d, headRenderer: g } = i, v = j(() => e.some((p) => xe(n, p).length > 0), [e, n]);
  return !h && !v ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: e.map((p, m) => {
    const f = le({ dateLeft: p, timeZone: s }), u = xe(n, p);
    return !h && !u.length ? null : /* @__PURE__ */ E("div", { className: `rs__agenda_row ${ue(p) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof g == "function" ? /* @__PURE__ */ r("div", { children: g({ day: p, events: n, resource: t }) }) : /* @__PURE__ */ r(
        A,
        {
          sx: { fontWeight: f ? "bold" : "inherit" },
          color: f ? "primary" : "inherit",
          variant: "body2",
          className: d ? "" : "rs__hover__op",
          onClick: (w) => {
            w.stopPropagation(), d || o(p);
          },
          children: $(p, "dd E", { locale: a })
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: u.length > 0 ? /* @__PURE__ */ r(je, { day: p, events: u }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: c.noDataToDisplay }) })
    ] }, m);
  }) });
}, ze = 1, de = 28, it = 27, nr = 23, Nt = () => {
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
  const { timeZone: i } = N(), o = le({ dateLeft: e, timeZone: i });
  return /* @__PURE__ */ E("div", { children: [
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
        children: $(e, "dd", { locale: n })
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
        children: $(e, "eee", { locale: n })
      }
    )
  ] });
}, Rt = dt({
  renderedSlots: {},
  setRenderedSlot: () => {
  }
}), Ot = () => ct(Rt), rr = (e) => {
  const { setCurrentDragged: t } = N(), n = Y();
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
  const { direction: a, locale: s, hourFormat: c, eventRenderer: h, onEventClick: d, view: g, disableViewer: v } = N(), p = rr(e), [m, f] = P(null), [u, w] = P(!1), l = Y(), b = me(c), C = a === "rtl" ? nt : tt, k = a === "rtl" ? tt : nt, D = se(e.start, e.end) <= 0 && e.allDay, { canDrag: T } = Ft(e), x = U(
    (y) => {
      !(y != null && y.currentTarget) && u && w(!1), f((y == null ? void 0 : y.currentTarget) || null);
    },
    [u]
  ), M = j(() => {
    if (typeof h == "function" && !t && g !== "month") {
      const _ = h({ event: e, onClick: x, ...p });
      if (_)
        return /* @__PURE__ */ r(ot, { children: _ }, `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`);
    }
    let y = /* @__PURE__ */ E("div", { style: { padding: "2px 6px" }, children: [
      /* @__PURE__ */ r(A, { variant: "subtitle2", style: { fontSize: 12 }, noWrap: !0, children: e.title }),
      e.subtitle && /* @__PURE__ */ r(A, { variant: "body2", style: { fontSize: 11 }, noWrap: !0, children: e.subtitle }),
      o && /* @__PURE__ */ r(A, { style: { fontSize: 11 }, noWrap: !0, children: `${$(e.start, b, {
        locale: s
      })} - ${$(e.end, b, { locale: s })}` })
    ] });
    return t && (y = /* @__PURE__ */ E(
      "div",
      {
        style: {
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ r(A, { sx: { fontSize: 11 }, noWrap: !0, children: n ? /* @__PURE__ */ r(k, { fontSize: "small", sx: { display: "flex" } }) : o && !D && $(e.start, b, { locale: s }) }),
          /* @__PURE__ */ r(A, { variant: "subtitle2", align: "center", sx: { fontSize: 12 }, noWrap: !0, children: e.title }),
          /* @__PURE__ */ r(A, { sx: { fontSize: 11 }, noWrap: !0, children: i ? /* @__PURE__ */ r(C, { fontSize: "small", sx: { display: "flex" } }) : o && !D && $(e.end, b, { locale: s }) })
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
              _.preventDefault(), _.stopPropagation(), v || x(_), typeof d == "function" && d(e);
            },
            focusRipple: !0,
            tabIndex: v ? -1 : 0,
            disableRipple: v,
            disabled: e.disabled,
            children: /* @__PURE__ */ r("div", { ...p, draggable: T, children: y })
          }
        )
      },
      `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`
    );
  }, [
    h,
    t,
    g,
    e,
    o,
    b,
    s,
    l.palette.primary.main,
    l.palette.primary.contrastText,
    v,
    p,
    T,
    x,
    n,
    k,
    D,
    i,
    C,
    d
  ]);
  return /* @__PURE__ */ E(K, { children: [
    M,
    /* @__PURE__ */ r($t, { anchorEl: m, event: e, onTriggerViewer: x })
  ] });
};
function Re({ startHour: e, step: t, minuteHeight: n, timeZone: i }) {
  const o = fe(/* @__PURE__ */ new Date(), i), a = ke(o, ye(o, { hours: e, minutes: 0 })), s = a * n, h = a / t + ze;
  return s + h;
}
const or = (e) => {
  const [t, n] = P(Re(e)), { startHour: i, step: o, minuteHeight: a, timeZone: s } = e;
  return ee(() => {
    const c = { startHour: i, step: o, minuteHeight: a, timeZone: s };
    n(Re(c));
    const h = setInterval(() => n(Re(c)), 60 * 1e3);
    return () => clearInterval(h);
  }, [i, o, a, s]), t < 0 ? null : /* @__PURE__ */ E(Kn, { style: { top: t, zIndex: e.zIndex }, children: [
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
  timeZone: c
}) => {
  const h = [];
  return /* @__PURE__ */ E(K, { children: [
    le({ dateLeft: t, timeZone: c }) && /* @__PURE__ */ r(
      or,
      {
        startHour: n,
        step: o,
        minuteHeight: a,
        timeZone: c,
        zIndex: 2 * e.length + 1
      }
    ),
    e.map((d, g) => {
      const v = (i * 60 - n * 60) * a, p = ke(d.end, d.start) * a, m = Math.min(p, v) - ze, f = n * 60, u = d.start.getHours() * 60 + d.start.getMinutes(), w = Math.max(u - f, 0), l = w * a, C = m / 60 * ze, k = w / o, D = l + k, T = An(e, d), x = T.filter((M) => h.includes(M.event_id));
      return h.push(d.event_id), /* @__PURE__ */ r(
        "div",
        {
          className: "rs__event__item",
          style: {
            height: m + C,
            top: D,
            width: x.length > 0 ? `calc(100% - ${100 - 98 / (x.length + 1)}%)` : "98%",
            // Leave some space to click cell
            zIndex: e.length + g,
            [s === "rtl" ? "right" : "left"]: x.length > 0 ? `${100 / (T.length + 1) * x.length}%` : ""
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
    currentDragged: c,
    setCurrentDragged: h,
    editable: d,
    timeZone: g
  } = N(), v = Y();
  return {
    tabIndex: d ? 0 : -1,
    disableRipple: !d,
    onClick: () => {
      d && o(!0, {
        start: e,
        end: t,
        [n]: i
      }), a && typeof a == "function" && a(e, t, n, i);
    },
    onDragOver: (p) => {
      p.preventDefault(), c && (p.currentTarget.style.backgroundColor = De(v.palette.secondary.main, 0.3));
    },
    onDragEnter: (p) => {
      c && (p.currentTarget.style.backgroundColor = De(v.palette.secondary.main, 0.3));
    },
    onDragLeave: (p) => {
      c && (p.currentTarget.style.backgroundColor = "");
    },
    onDrop: (p) => {
      if (c && c.event_id) {
        p.preventDefault(), p.currentTarget.style.backgroundColor = "";
        const m = Pe(e, g);
        s(p, c.event_id.toString(), m, n, i), h();
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
  children: c
}) => {
  const h = ir({ start: t, end: n, resourceKey: i, resourceVal: o });
  return a ? a({
    day: e,
    start: t,
    end: n,
    height: s,
    ...h
  }) : /* @__PURE__ */ r(
    X,
    {
      fullWidth: !0,
      "aria-label": `${t.toLocaleString("en", {
        dateStyle: "full",
        timeStyle: "long"
      })} - ${n.toLocaleString("en", { dateStyle: "full", timeStyle: "long" })}`,
      ...h,
      children: c
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
    events: c,
    handleGotoDay: h,
    resources: d,
    resourceFields: g,
    resourceViewMode: v,
    direction: p,
    locale: m,
    hourFormat: f,
    timeZone: u,
    stickyNavigation: w
  } = N(), { startHour: l, endHour: b, step: C, cellRenderer: k, disableGoToDay: D, headRenderer: T, hourRenderer: x } = s, { renderedSlots: M } = Ot(), { headersRef: y, bodyRef: _ } = Nt(), S = de, I = J(e[0]), H = Q(e[e.length - 1]), z = me(f), V = j(() => {
    const R = d.length && v === "default", F = Te(
      R ? c : o,
      e,
      u,
      !0
    );
    return S * F.length + 45;
  }, [
    S,
    e,
    c,
    v,
    o,
    d.length,
    u
  ]), W = (R, F, B) => {
    const te = ce(I, F);
    return Te(R, e, u).filter((O) => we(O.start, I) ? te : ce(O.start, F)).sort((O, re) => re.end.getTime() - O.end.getTime()).map((O) => {
      var Xe;
      const re = we(J(O.start), I), L = ft(Q(O.end), H), $e = se(re ? I : O.start, L ? H : O.end) + 1, Pt = $(F, "yyyy-MM-dd"), Ht = B ? B[g.idField] : "all", Ne = (Xe = M == null ? void 0 : M[Ht]) == null ? void 0 : Xe[Pt], zt = (Ne == null ? void 0 : Ne[O.event_id]) || 0;
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__multi_day",
          style: {
            top: zt * S + 45,
            width: `${99.9 * $e}%`,
            overflowX: "hidden"
          },
          children: /* @__PURE__ */ r(Ie, { event: O, hasPrev: re, hasNext: L, multiday: !0 })
        },
        O.event_id
      );
    });
  };
  return /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ E(
      ge,
      {
        days: e.length,
        ref: y,
        sticky: "1",
        stickyNavigation: w,
        children: [
          /* @__PURE__ */ r("span", { className: "rs__cell rs__time" }),
          e.map((R, F) => /* @__PURE__ */ E(
            "span",
            {
              className: `rs__cell rs__header ${ue(R) ? "rs__today_cell" : ""}`,
              style: { height: V },
              children: [
                typeof T == "function" ? /* @__PURE__ */ r("div", { children: T({ day: R, events: o, resource: a }) }) : /* @__PURE__ */ r(
                  At,
                  {
                    date: R,
                    onClick: D ? void 0 : h,
                    locale: m
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
    /* @__PURE__ */ r(ge, { days: e.length, ref: _, children: t.map((R, F) => /* @__PURE__ */ E(K, { children: [
      /* @__PURE__ */ r("span", { style: { height: n }, className: "rs__cell rs__header rs__time", children: typeof x == "function" ? /* @__PURE__ */ r("div", { children: x($(R, z, { locale: m })) }) : /* @__PURE__ */ r(A, { variant: "caption", children: $(R, z, { locale: m }) }) }),
      e.map((B, te) => {
        const G = /* @__PURE__ */ new Date(`${$(B, "yyyy/MM/dd")} ${$(R, z)}`), ne = ae(G, C), O = g.idField;
        return /* @__PURE__ */ E("span", { className: `rs__cell ${ue(B) ? "rs__today_cell" : ""}`, children: [
          F === 0 && /* @__PURE__ */ r(
            Wt,
            {
              todayEvents: kt(o, B, u),
              today: B,
              minuteHeight: i,
              startHour: l,
              endHour: b,
              step: C,
              direction: p,
              timeZone: u
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
}, sr = () => {
  const {
    week: e,
    selectedDate: t,
    height: n,
    events: i,
    getRemoteEvents: o,
    triggerLoading: a,
    handleState: s,
    resources: c,
    resourceFields: h,
    fields: d,
    agenda: g
  } = N(), { weekStartOn: v, weekDays: p, startHour: m, endHour: f, step: u } = e, w = Ee(t, { weekStartsOn: v }), l = p.map((S) => q(w, S)), b = J(l[0]), C = Q(l[l.length - 1]), k = ye(t, { hours: m, minutes: 0, seconds: 0 }), D = ye(t, { hours: f, minutes: -u, seconds: 0 }), T = gt(
    {
      start: k,
      end: D
    },
    { step: u }
  ), x = Tt(n, T.length), M = xt(x, u), y = U(async () => {
    try {
      a(!0);
      const S = await o({
        start: b,
        end: C,
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
    o instanceof Function && y();
  }, [y, o]);
  const _ = (S) => {
    let I = i;
    return S && (I = ve(i, S, h, d)), g ? /* @__PURE__ */ r(tr, { daysList: l, resource: S, events: I }) : /* @__PURE__ */ r(
      ar,
      {
        resourcedEvents: I,
        resource: S,
        hours: T,
        cellHeight: x,
        minutesHeight: M,
        daysList: l
      }
    );
  };
  return c.length ? /* @__PURE__ */ r(Ge, { renderChildren: _ }) : _();
}, Fe = ({ children: e }) => {
  const { locale: t } = N();
  return /* @__PURE__ */ r(Cn, { dateAdapter: kn, adapterLocale: t, children: e });
}, pe = ({ type: e, onClick: t, ...n }) => {
  const { direction: i } = N();
  let o = Ae;
  return e === "prev" ? o = i === "rtl" ? Ae : rt : e === "next" && (o = i === "rtl" ? rt : Ae), /* @__PURE__ */ r(
    he,
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
  const { selectedDate: e, week: t, navigationPickerProps: n, view: i } = N(), o = n == null ? void 0 : n.minDate, a = n == null ? void 0 : n.maxDate, s = i === "month" ? pt(e) : i === "week" ? mt(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, c = i === "month" ? Le(e) : i === "week" ? Ee(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, h = o ? c <= o : !1, d = a ? s >= a : !1;
  return { prevDisabled: h, nextDisabled: d };
}, lr = ({ selectedDate: e, onChange: t, weekProps: n }) => {
  const { locale: i, navigationPickerProps: o } = N(), [a, s] = P(null), { weekStartOn: c } = n, h = Ee(e, { weekStartsOn: c }), d = mt(e, { weekStartsOn: c }), { prevDisabled: g, nextDisabled: v } = qe(), p = (l) => {
    s(l.currentTarget);
  }, m = () => {
    s(null);
  }, f = (l) => {
    t(l || /* @__PURE__ */ new Date()), m();
  }, u = () => {
    const l = q(h, -1);
    t(l);
  }, w = () => {
    const l = q(d, 1);
    t(l);
  };
  return /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ r(
      pe,
      {
        type: "prev",
        onClick: u,
        disabled: g,
        "aria-label": "previous week"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: p, "aria-label": "selected week", children: `${$(h, "dd", { locale: i })} - ${$(d, "dd MMM yyyy", {
      locale: i
    })}` }),
    /* @__PURE__ */ r(
      _e,
      {
        open: !!a,
        anchorEl: a,
        onClose: m,
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
            onChange: f
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(
      pe,
      {
        type: "next",
        onClick: w,
        disabled: v,
        "aria-label": "next week"
      }
    )
  ] });
}, dr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = N(), [o, a] = P(null), { prevDisabled: s, nextDisabled: c } = qe(), h = (m) => {
    a(m.currentTarget);
  }, d = () => {
    a(null);
  }, g = (m) => {
    t(m || /* @__PURE__ */ new Date()), d();
  }, v = () => {
    const m = q(e, -1);
    t(m);
  }, p = () => {
    const m = q(e, 1);
    t(m);
  };
  return /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ r(
      pe,
      {
        type: "prev",
        onClick: v,
        disabled: s,
        "aria-label": "previous day"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: h, "aria-label": "selected date", children: $(e, "dd MMMM yyyy", { locale: n }) }),
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
    /* @__PURE__ */ r(pe, { type: "next", onClick: p, disabled: c, "aria-label": "next day" })
  ] });
}, cr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = N(), o = jt(e), [a, s] = P(null), { prevDisabled: c, nextDisabled: h } = qe(), d = (f) => {
    s(f.currentTarget);
  }, g = () => {
    s(null);
  }, v = (f) => {
    t(f || /* @__PURE__ */ new Date()), g();
  }, p = () => {
    const f = o - 1;
    t(Qe(e, f));
  }, m = () => {
    const f = o + 1;
    t(Qe(e, f));
  };
  return /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ r(
      pe,
      {
        type: "prev",
        onClick: p,
        disabled: c,
        "aria-label": "previous month"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: d, "aria-label": "selected month", children: $(e, "MMMM yyyy", { locale: n }) }),
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
            onChange: v
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(
      pe,
      {
        type: "next",
        onClick: m,
        disabled: h,
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
    day: c,
    month: h,
    disableViewNavigator: d,
    onSelectedDateChange: g,
    onViewChange: v,
    stickyNavigation: p,
    timeZone: m,
    agenda: f,
    toggleAgenda: u,
    enableAgenda: w
  } = N(), [l, b] = P(null), C = Y(), k = wt(C.breakpoints.up("sm")), D = o(), T = (_) => {
    b(_ || null);
  }, x = (_) => {
    i(_, "selectedDate"), g && typeof g == "function" && g(_);
  }, M = (_) => {
    i(_, "view"), v && typeof v == "function" && v(_, f);
  }, y = () => {
    switch (t) {
      case "month":
        return (h == null ? void 0 : h.navigation) && /* @__PURE__ */ r(cr, { selectedDate: e, onChange: x });
      case "week":
        return (n == null ? void 0 : n.navigation) && /* @__PURE__ */ r(
          lr,
          {
            selectedDate: e,
            onChange: x,
            weekProps: n
          }
        );
      case "day":
        return (c == null ? void 0 : c.navigation) && /* @__PURE__ */ r(dr, { selectedDate: e, onChange: x });
      default:
        return "";
    }
  };
  return !s && d ? null : /* @__PURE__ */ E(Yn, { sticky: p ? "1" : "0", children: [
    /* @__PURE__ */ r("div", { "data-testid": "date-navigator", children: s && y() }),
    /* @__PURE__ */ E(
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
              onClick: () => x(fe(/* @__PURE__ */ new Date(), m)),
              "aria-label": a.navigation.today,
              children: a.navigation.today
            }
          ),
          w && (k ? /* @__PURE__ */ r(
            X,
            {
              color: f ? "primary" : "inherit",
              onClick: u,
              "aria-label": a.navigation.agenda,
              children: a.navigation.agenda
            }
          ) : /* @__PURE__ */ r(
            he,
            {
              color: f ? "primary" : "default",
              style: { padding: 5 },
              onClick: u,
              children: /* @__PURE__ */ r(Mn, {})
            }
          )),
          D.length > 1 && (k ? D.map((_) => /* @__PURE__ */ r(
            X,
            {
              color: _ === t ? "primary" : "inherit",
              onClick: () => M(_),
              onDragOver: (S) => {
                S.preventDefault(), M(_);
              },
              children: a.navigation[_]
            },
            _
          )) : /* @__PURE__ */ E(K, { children: [
            /* @__PURE__ */ r(
              he,
              {
                style: { padding: 5 },
                onClick: (_) => {
                  T(_.currentTarget);
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
                  T();
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
                      T(), M(_);
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
  errMsg: c,
  touched: h,
  required: d
}) => {
  var w, l;
  const { translations: g } = N(), [v, p] = P({
    touched: !1,
    valid: !!t,
    errorMsg: c || (d ? ((w = g == null ? void 0 : g.validation) == null ? void 0 : w.required) || "Required" : void 0)
  }), m = e === "date" ? Sn : In, f = v.touched && (s || !v.valid), u = U(
    (b) => {
      var x;
      const C = !isNaN(Date.parse(b)), k = typeof b == "string" && C ? new Date(b) : b;
      let D = !0, T = c;
      d && !k && (D = !1, T = c || ((x = g == null ? void 0 : g.validation) == null ? void 0 : x.required) || "Required"), p((M) => ({ ...M, touched: !0, valid: D, errorMsg: T })), o(i, k);
    },
    [c, i, o, d, (l = g == null ? void 0 : g.validation) == null ? void 0 : l.required]
  );
  return ee(() => {
    h && u(t);
  }, [u, h, t]), /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
    m,
    {
      value: t instanceof Date ? t : new Date(t),
      label: n,
      onChange: (b) => {
        u(b);
      },
      minutesStep: 5,
      slotProps: {
        textField: {
          variant: a,
          helperText: f && v.errorMsg,
          error: f,
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
  max: c,
  email: h,
  decimal: d,
  onChange: g,
  disabled: v,
  multiline: p,
  rows: m,
  touched: f
}) => {
  const [u, w] = P({
    touched: !1,
    valid: !1,
    errorMsg: ""
  }), { translations: l } = N(), b = U(
    (C) => {
      var x, M, y, _, S, I, H, z, V;
      const k = C;
      let D = !0, T = "";
      h && (D = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(k) && D, T = ((x = l == null ? void 0 : l.validation) == null ? void 0 : x.invalidEmail) || "Invalid Email"), d && (D = /^[0-9]+(\.[0-9]*)?$/.test(k) && D, T = ((M = l == null ? void 0 : l.validation) == null ? void 0 : M.onlyNumbers) || "Only Numbers Allowed"), s && `${k}`.trim().length < s && (D = !1, T = typeof ((y = l == null ? void 0 : l.validation) == null ? void 0 : y.min) == "function" ? (_ = l == null ? void 0 : l.validation) == null ? void 0 : _.min(s) : ((S = l == null ? void 0 : l.validation) == null ? void 0 : S.min) || `Minimum ${s} letters`), c && `${k}`.trim().length > c && (D = !1, T = typeof ((I = l == null ? void 0 : l.validation) == null ? void 0 : I.max) == "function" ? (H = l == null ? void 0 : l.validation) == null ? void 0 : H.max(c) : ((z = l == null ? void 0 : l.validation) == null ? void 0 : z.max) || `Maximum ${c} letters`), a && `${k}`.trim().length <= 0 && (D = !1, T = ((V = l == null ? void 0 : l.validation) == null ? void 0 : V.required) || "Required"), w({ touched: !0, valid: D, errorMsg: T }), g(o, k, D);
    },
    [d, h, c, s, o, g, a, l == null ? void 0 : l.validation]
  );
  return ee(() => {
    f && b(i);
  }, [b, f, i]), /* @__PURE__ */ r(
    sn,
    {
      variant: e,
      label: t && /* @__PURE__ */ r(A, { variant: "body2", children: `${t} ${a ? "*" : ""}` }),
      value: i,
      name: o,
      onChange: (C) => b(C.target.value),
      disabled: v,
      error: u.touched && !u.valid,
      helperText: u.touched && !u.valid && u.errorMsg,
      multiline: p,
      rows: m,
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
  touched: c,
  variant: h = "outlined",
  loading: d,
  multiple: g,
  placeholder: v,
  errMsg: p
}) => {
  var C, k;
  const m = Y(), { translations: f } = N(), [u, w] = P({
    touched: !1,
    valid: !!t,
    errorMsg: p || (i ? ((C = f == null ? void 0 : f.validation) == null ? void 0 : C.required) || "Required" : void 0)
  }), l = U(() => {
    u.touched || w((D) => ({ ...D, touched: !0, errorMsg: p || D.errorMsg }));
  }, [p, u.touched]), b = U(
    (D) => {
      var y;
      const T = D;
      let x = !0, M = p;
      i && (g ? !T.length : !T) && (x = !1, M = p || ((y = f == null ? void 0 : f.validation) == null ? void 0 : y.required) || "Required"), w((_) => ({ ..._, touched: !0, valid: x, errorMsg: M })), o(n, T, x);
    },
    [p, g, n, o, i, (k = f == null ? void 0 : f.validation) == null ? void 0 : k.required]
  );
  return ee(() => {
    c && b(t);
  }, [b, c, t]), /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ E(
      ln,
      {
        variant: h || "outlined",
        fullWidth: !0,
        error: i && u.touched && !u.valid,
        disabled: s,
        children: [
          a && /* @__PURE__ */ r(dn, { id: `input_${n}`, children: /* @__PURE__ */ r(A, { variant: "body2", children: `${a} ${i ? "*" : ""}` }) }),
          /* @__PURE__ */ E(
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
                const T = [];
                if (g) {
                  for (const x of e)
                    D.includes(x.value) && T.push([x.text]);
                  return g === "chips" ? T.map((x, M) => /* @__PURE__ */ r(hn, { label: x, style: { margin: "0 2px" }, color: "primary" }, `${x}_${M}`)) : T.join(",");
                } else {
                  for (const x of e)
                    D === x.value && T.push([x.text]);
                  return T.join(",");
                }
              },
              children: [
                v && /* @__PURE__ */ r(Oe, { value: "", children: /* @__PURE__ */ r("em", { children: v }) }),
                e.map((D) => /* @__PURE__ */ E(Oe, { value: D.value, children: [
                  g && /* @__PURE__ */ r(un, { checked: t.indexOf(D.value) > -1, color: "primary" }),
                  D.text
                ] }, D.id || D.value))
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ r(fn, { style: { color: m.palette.error.main }, children: u.touched && !u.valid && u.errorMsg })
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
    triggerLoading: c,
    onConfirm: h,
    customEditor: d,
    confirmEvent: g,
    dialogMaxWidth: v,
    translations: p,
    timeZone: m
  } = N(), [f, u] = P(at(e, o || i)), [w, l] = P(!1), b = Y(), C = wt(b.breakpoints.down("sm")), k = (y, _, S) => {
    u((I) => ({
      ...I,
      [y]: { ...I[y], value: _, validity: S }
    }));
  }, D = (y) => {
    y && u(at(e)), n(!1);
  }, T = async () => {
    let y = {};
    for (const _ in f)
      if (y[_] = f[_].value, !d && !f[_].validity)
        return l(!0);
    try {
      c(!0), y.end = y.start >= y.end ? ae(y.start, ke(i == null ? void 0 : i.end, i == null ? void 0 : i.start)) : y.end;
      const _ = o != null && o.event_id ? "edit" : "create";
      h ? y = await h(y, _) : y.event_id = (o == null ? void 0 : o.event_id) || Date.now().toString(36) + Math.random().toString(36).slice(2), y.start = Pe(y.start, m), y.end = Pe(y.end, m), g(y, _), D(!0);
    } catch (_) {
      console.error(_);
    } finally {
      c(!1);
    }
  }, x = (y) => {
    var S, I, H;
    const _ = f[y];
    switch (_.type) {
      case "input":
        return /* @__PURE__ */ r(
          fr,
          {
            value: _.value,
            name: y,
            onChange: k,
            touched: w,
            ..._.config,
            label: p.event[y] || ((S = _.config) == null ? void 0 : S.label)
          }
        );
      case "date":
        return /* @__PURE__ */ r(
          hr,
          {
            value: _.value,
            name: y,
            onChange: (...V) => k(...V, !0),
            touched: w,
            ..._.config,
            label: p.event[y] || ((I = _.config) == null ? void 0 : I.label)
          }
        );
      case "select":
        const z = e.find((V) => V.name === y);
        return /* @__PURE__ */ r(
          gr,
          {
            value: _.value,
            name: y,
            options: (z == null ? void 0 : z.options) || [],
            onChange: k,
            touched: w,
            ..._.config,
            label: p.event[y] || ((H = _.config) == null ? void 0 : H.label)
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
      fullScreen: C,
      maxWidth: v,
      onClose: () => {
        n(!1);
      },
      children: (() => {
        if (d) {
          const y = {
            state: f,
            close: () => n(!1),
            loading: (_) => c(_),
            edited: o,
            onConfirm: g,
            [a.idField]: s
          };
          return d(y);
        }
        return /* @__PURE__ */ E(K, { children: [
          /* @__PURE__ */ r(pn, { children: o ? p.form.editTitle : p.form.addTitle }),
          /* @__PURE__ */ r(mn, { style: { overflowX: "hidden" }, children: /* @__PURE__ */ r(et, { container: !0, spacing: 2, children: Object.keys(f).map((y) => {
            var S;
            const _ = f[y];
            return /* @__PURE__ */ r(et, { size: { sm: (S = _.config) == null ? void 0 : S.sm, xs: 12 }, children: x(y) }, y);
          }) }) }),
          /* @__PURE__ */ E(yn, { children: [
            /* @__PURE__ */ r(X, { color: "inherit", fullWidth: !0, onClick: () => D(), children: p.form.cancel }),
            /* @__PURE__ */ r(X, { color: "primary", fullWidth: !0, onClick: T, children: p.form.confirm })
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
    translations: c,
    alwaysShowAgendaDays: h
  } = N(), { disableGoToDay: d, headRenderer: g } = n, v = Ut(s), p = Array.from({ length: v }, (f, u) => u + 1), m = j(() => e.filter((f) => yt(f.start, s)), [e, s]);
  return !h && !m.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: p.map((f) => {
    const u = new Date(s.getFullYear(), s.getMonth(), f), w = le({ dateLeft: u, timeZone: a }), l = xe(e, u);
    return !h && !l.length ? null : /* @__PURE__ */ E("div", { className: `rs__agenda_row ${ue(u) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof g == "function" ? /* @__PURE__ */ r("div", { children: g({ day: u, events: e, resource: t }) }) : /* @__PURE__ */ r(
        A,
        {
          sx: { fontWeight: w ? "bold" : "inherit" },
          color: w ? "primary" : "inherit",
          variant: "body2",
          className: d ? "" : "rs__hover__op",
          onClick: (b) => {
            b.stopPropagation(), d || i(u);
          },
          children: $(u, "dd E", { locale: o })
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: l.length > 0 ? /* @__PURE__ */ r(je, { day: u, events: l }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: c.noDataToDisplay }) })
    ] }, f);
  }) });
}, yr = ({
  events: e,
  resourceId: t,
  today: n,
  eachWeekStart: i,
  eachFirstDayInCalcRow: o,
  daysList: a,
  onViewMore: s,
  cellHeight: c
}) => {
  const h = Math.round((c - it) / de - 1), { translations: d, month: g, locale: v, timeZone: p } = N(), { renderedSlots: m } = Ot(), f = j(() => {
    var w;
    const u = [];
    for (let l = 0; l < Math.min(e.length, h + 1); l++) {
      const b = Ce(e[l], p), C = !!o && we(b.start, o), k = C && o ? o : b.start;
      let D = se(k, b.end) + 1;
      const T = Zt(b.end, k, {
        weekStartsOn: g == null ? void 0 : g.weekStartOn,
        locale: v
      }) > 0;
      if (T) {
        const S = Ee(b.start, {
          weekStartsOn: g == null ? void 0 : g.weekStartOn,
          locale: v
        }), I = qt(S, i);
        I && (D = a.length - (o ? 0 : ht(b.start, I)));
      }
      const x = $(n, "yyyy-MM-dd"), M = (w = m == null ? void 0 : m[t || "all"]) == null ? void 0 : w[x], y = (M == null ? void 0 : M[b.event_id]) || 0, _ = Math.min(y, h) * de + it;
      if (y >= h) {
        u.push(
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
      u.push(
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
                multiday: se(b.start, b.end) > 0,
                hasPrev: C,
                hasNext: T
              }
            )
          },
          `${b.event_id}_${l}`
        )
      );
    }
    return u;
  }, [
    t,
    m,
    e,
    h,
    o,
    g == null ? void 0 : g.weekStartOn,
    v,
    n,
    i,
    a.length,
    d.moreEvents,
    s,
    p
  ]);
  return /* @__PURE__ */ r(K, { children: f });
}, _r = ({ daysList: e, resource: t, eachWeekStart: n }) => {
  const {
    height: i,
    month: o,
    selectedDate: a,
    events: s,
    handleGotoDay: c,
    resourceFields: h,
    fields: d,
    locale: g,
    hourFormat: v,
    stickyNavigation: p,
    timeZone: m,
    onClickMore: f
  } = N(), { weekDays: u, startHour: w, endHour: l, cellRenderer: b, headRenderer: C, disableGoToDay: k } = o, { headersRef: D, bodyRef: T } = Nt(), x = Y(), M = Le(a), y = me(v), _ = i / n.length, S = U(
    (I) => {
      let H = Me(s);
      I && (H = ve(s, I, h, d));
      const z = [];
      for (const V of n) {
        const W = u.map((R) => {
          const F = q(V, R), B = /* @__PURE__ */ new Date(`${$(Je(F, w), `yyyy/MM/dd ${y}`)}`), te = /* @__PURE__ */ new Date(`${$(Je(F, l), `yyyy/MM/dd ${y}`)}`), G = h.idField, ne = ce(V, F) ? F : null, O = H.flatMap((L) => Ct(L, F)).filter((L) => {
            if (ce(L.start, F)) return !0;
            const $e = { start: J(L.start), end: Q(L.end) };
            return !!(ne && oe(ne, $e));
          }), re = le({ dateLeft: F, timeZone: m });
          return /* @__PURE__ */ E("span", { style: { height: _ }, className: "rs__cell", children: [
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
            /* @__PURE__ */ E(K, { children: [
              typeof C == "function" ? /* @__PURE__ */ r("div", { style: { position: "absolute", top: 0 }, children: C({ day: F, events: H, resource: I }) }) : /* @__PURE__ */ r(
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
                      color: yt(F, M) ? "textPrimary" : "#ccc",
                      className: k ? "" : "rs__hover__op",
                      onClick: (L) => {
                        L.stopPropagation(), k || c(F);
                      },
                      children: $(F, "dd")
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
                    f && typeof f == "function" ? f(L, c) : c(L);
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
      y,
      c,
      C,
      M,
      f,
      h,
      a,
      w,
      x.palette.secondary.contrastText,
      x.palette.secondary.main,
      m,
      u
    ]
  );
  return /* @__PURE__ */ E(Z, { children: [
    /* @__PURE__ */ r(
      ge,
      {
        days: e.length,
        ref: D,
        indent: "0",
        sticky: "1",
        stickyNavigation: p,
        children: e.map((I, H) => /* @__PURE__ */ r(
          A,
          {
            className: "rs__cell rs__header rs__header__center",
            align: "center",
            variant: "body2",
            children: $(I, "EE", { locale: g })
          },
          H
        ))
      }
    ),
    /* @__PURE__ */ r(ge, { days: e.length, ref: T, indent: "0", children: S(t) })
  ] });
}, vr = () => {
  const {
    month: e,
    selectedDate: t,
    events: n,
    getRemoteEvents: i,
    triggerLoading: o,
    handleState: a,
    resources: s,
    resourceFields: c,
    fields: h,
    agenda: d
  } = N(), { weekStartOn: g, weekDays: v } = e, p = Le(t), m = pt(t), f = Xt(
    {
      start: p,
      end: m
    },
    { weekStartsOn: g }
  ), u = v.map((b) => q(f[0], b)), w = U(async () => {
    try {
      o(!0);
      const b = f[0], C = q(f[f.length - 1], u.length), k = await i({
        start: b,
        end: C,
        view: "month"
      });
      k && (k != null && k.length) && a(k, "events");
    } catch (b) {
      throw b;
    } finally {
      o(!1);
    }
  }, [u.length, i]);
  ee(() => {
    i instanceof Function && w();
  }, [w, i]);
  const l = U(
    (b) => {
      if (d) {
        let C = Me(n);
        return b && (C = ve(n, b, c, h)), /* @__PURE__ */ r(mr, { resource: b, events: C });
      }
      return /* @__PURE__ */ r(_r, { daysList: u, eachWeekStart: f, resource: b });
    },
    [d, u, f, n, h, c]
  );
  return s.length ? /* @__PURE__ */ r(Ge, { renderChildren: l }) : l();
}, br = ({ events: e, resource: t }) => {
  const { day: n, locale: i, selectedDate: o, translations: a, alwaysShowAgendaDays: s } = N(), { headRenderer: c } = n, h = j(() => xe(e, o), [e, o]);
  return !s && !h.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Se, { children: /* @__PURE__ */ E("div", { className: "rs__agenda_row rs__today_cell", children: [
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof c == "function" ? /* @__PURE__ */ r("div", { children: c({ day: o, events: e, resource: t }) }) : /* @__PURE__ */ r(A, { variant: "body2", children: $(o, "dd E", { locale: i }) }) }),
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: h.length > 0 ? /* @__PURE__ */ r(je, { day: o, events: h }) : /* @__PURE__ */ r(A, { sx: { padding: 1 }, children: a.noDataToDisplay }) })
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
    resources: c,
    resourceFields: h,
    resourceViewMode: d,
    fields: g,
    direction: v,
    locale: p,
    hourFormat: m,
    timeZone: f,
    stickyNavigation: u,
    agenda: w
  } = N(), { startHour: l, endHour: b, step: C, cellRenderer: k, headRenderer: D, hourRenderer: T } = e, x = ye(t, { hours: l, minutes: 0, seconds: 0 }), M = ye(t, { hours: b, minutes: -C, seconds: 0 }), y = gt(
    {
      start: x,
      end: M
    },
    { step: C }
  ), _ = Tt(i, y.length), S = xt(_, C), I = me(m), H = U(async () => {
    try {
      a(!0);
      const W = q(x, -1), R = q(M, 1), F = await o({
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
      const R = Te(W, t, f);
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__block_col",
          style: { height: de * R.length },
          children: R.map((F, B) => {
            const te = we(F.start, J(t)), G = ft(F.end, Q(t));
            return /* @__PURE__ */ r(
              "div",
              {
                className: "rs__multi_day",
                style: {
                  top: B * de,
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
    [t, f]
  ), V = U(
    (W) => {
      let R = n;
      if (W && (R = ve(n, W, h, g)), w)
        return /* @__PURE__ */ r(br, { resource: W, events: R });
      const F = c.length && d === "default", B = Te(
        F ? n : R,
        t,
        f
      ), te = de * B.length + 45;
      return /* @__PURE__ */ E(Z, { children: [
        /* @__PURE__ */ E(ge, { days: 1, sticky: "1", stickyNavigation: u, children: [
          /* @__PURE__ */ r("span", { className: "rs__cell" }),
          /* @__PURE__ */ E(
            "span",
            {
              className: `rs__cell rs__header ${ue(t) ? "rs__today_cell" : ""}`,
              style: { height: te },
              children: [
                typeof D == "function" ? /* @__PURE__ */ r("div", { children: D({ day: t, events: R, resource: W }) }) : /* @__PURE__ */ r(At, { date: t, locale: p }),
                z(R)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r(ge, { days: 1, children: y.map((G, ne) => {
          const O = /* @__PURE__ */ new Date(`${$(t, "yyyy/MM/dd")} ${$(G, I)}`), re = ae(O, C), L = h.idField;
          return /* @__PURE__ */ E(K, { children: [
            /* @__PURE__ */ r("span", { className: "rs__cell rs__header rs__time", style: { height: _ }, children: typeof T == "function" ? /* @__PURE__ */ r("div", { children: T($(G, I, { locale: p })) }) : /* @__PURE__ */ r(A, { variant: "caption", children: $(G, I, { locale: p }) }) }),
            /* @__PURE__ */ E("span", { className: `rs__cell ${ue(t) ? "rs__today_cell" : ""}`, children: [
              ne === 0 && /* @__PURE__ */ r(
                Wt,
                {
                  todayEvents: kt(R, t, f),
                  today: x,
                  minuteHeight: S,
                  startHour: l,
                  endHour: b,
                  step: C,
                  direction: v,
                  timeZone: f
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
      v,
      b,
      n,
      g,
      I,
      D,
      T,
      y,
      p,
      z,
      h,
      d,
      c.length,
      t,
      l,
      C,
      u,
      f
    ]
  );
  return c.length ? /* @__PURE__ */ r(Ge, { renderChildren: V }) : V();
}, st = (e) => {
  const t = {};
  let n = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i], a = Yt({ start: o.start, end: o.end });
    for (let s = 0; s < a.length; s++) {
      const c = $(a[s], "yyyy-MM-dd");
      if (t[c]) {
        const h = Object.values(t[c]);
        for (; h.includes(n); )
          n += 1;
        t[c][o.event_id] = n;
      } else
        t[c] = { [o.event_id]: n };
    }
    n = 0;
  }
  return t;
}, lt = (e, t, n, i, o) => {
  const a = o === "month" ? Et(e) : Me(e), s = {};
  if (t.length)
    for (const c of t) {
      const h = ve(a, c, n, i), d = st(h);
      s[c[n.idField]] = d;
    }
  else
    s.all = st(a);
  return s;
}, Dr = ({ children: e }) => {
  const { events: t, resources: n, resourceFields: i, fields: o, view: a } = N(), [s, c] = P({
    renderedSlots: lt(t, n, i, o, a)
  });
  ee(() => {
    c((d) => ({
      ...d,
      renderedSlots: lt(
        t,
        n,
        i,
        o,
        a
      )
    }));
  }, [t, o, i, n, a]);
  const h = (d, g, v, p) => {
    c((m) => {
      var f, u, w, l, b;
      return {
        ...m,
        renderedSlots: {
          ...m.renderedSlots,
          [p || "all"]: {
            ...(f = m.renderedSlots) == null ? void 0 : f[p || "all"],
            [d]: (w = (u = m.renderedSlots) == null ? void 0 : u[p || "all"]) != null && w[d] ? {
              ...(b = (l = m.renderedSlots) == null ? void 0 : l[p || "all"]) == null ? void 0 : b[d],
              [g]: v
            } : { [g]: v }
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
        setRenderedSlot: h
      },
      children: e
    }
  );
}, xr = ut(function(t, n) {
  const i = N(), { view: o, dialog: a, loading: s, loadingComponent: c, resourceViewMode: h, resources: d, translations: g } = i, v = j(() => {
    switch (o) {
      case "month":
        return /* @__PURE__ */ r(vr, {});
      case "week":
        return /* @__PURE__ */ r(sr, {});
      case "day":
        return /* @__PURE__ */ r(wr, {});
      default:
        return "";
    }
  }, [o]), p = j(() => /* @__PURE__ */ r("div", { className: "rs__table_loading", children: c || /* @__PURE__ */ r("div", { className: "rs__table_loading_internal", children: /* @__PURE__ */ E("span", { children: [
    /* @__PURE__ */ r(Dt, { size: 50 }),
    /* @__PURE__ */ r(A, { align: "center", children: g.loading })
  ] }) }) }), [c, g.loading]);
  return /* @__PURE__ */ E(
    qn,
    {
      dialog: a ? 1 : 0,
      "data-testid": "rs-wrapper",
      ref: (m) => {
        const f = n;
        f && (f.current = {
          el: m,
          scheduler: i
        });
      },
      children: [
        s ? p : null,
        /* @__PURE__ */ r(ur, {}),
        /* @__PURE__ */ r(
          Xn,
          {
            resource_count: h === "default" ? d.length : 1,
            sx: {
              overflowX: h === "default" && d.length > 1 ? "auto" : void 0,
              flexDirection: h === "vertical" ? "column" : void 0
            },
            "data-testid": "grid",
            children: /* @__PURE__ */ r(Dr, { children: v })
          }
        ),
        a && /* @__PURE__ */ r(pr, {})
      ]
    }
  );
}), Tr = ({ children: e, initial: t }) => {
  const [n, i] = P({ ...St, ...Mt(t) });
  ee(() => {
    i((m) => ({
      ...m,
      onEventDrop: t.onEventDrop,
      customEditor: t.customEditor,
      events: t.events || []
    }));
  }, [t.onEventDrop, t.customEditor, t.events]);
  const o = (m, f) => {
    i((u) => ({ ...u, [f]: m }));
  }, a = () => Nn(n), s = () => {
    i((m) => {
      const f = !m.agenda;
      return n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(n.view, f), { ...m, agenda: f };
    });
  }, c = (m, f) => {
    const u = f;
    i((w) => {
      var l;
      return {
        ...w,
        dialog: m,
        selectedRange: u != null && u.event_id ? void 0 : u || {
          start: /* @__PURE__ */ new Date(),
          end: new Date(Date.now() + 3600 * 1e3)
        },
        selectedEvent: u != null && u.event_id ? u : void 0,
        selectedResource: u == null ? void 0 : u[(l = n.resourceFields) == null ? void 0 : l.idField]
      };
    });
  }, h = (m) => {
    typeof t.loading > "u" && i((f) => ({ ...f, loading: m }));
  }, d = (m) => {
    const f = a();
    let u;
    f.includes("day") ? (u = "day", i((w) => ({ ...w, view: "day", selectedDate: m }))) : f.includes("week") ? (u = "week", i((w) => ({ ...w, view: "week", selectedDate: m }))) : console.warn("No Day/Week views available"), u && n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(u, n.agenda), u && n.onSelectedDateChange && typeof n.onSelectedDateChange == "function" && n.onSelectedDateChange(m);
  }, g = (m, f) => {
    let u;
    f === "edit" ? Array.isArray(m) ? u = n.events.map((w) => {
      const l = m.find((b) => b.event_id === w.event_id);
      return l ? { ...w, ...l } : w;
    }) : u = n.events.map(
      (w) => w.event_id === m.event_id ? { ...w, ...m } : w
    ) : u = n.events.concat(m), i((w) => ({ ...w, events: u }));
  }, v = (m) => {
    i((f) => ({ ...f, currentDragged: m }));
  }, p = async (m, f, u, w, l) => {
    var M;
    const b = n.events.find((y) => typeof y.event_id == "number" ? y.event_id === +f : y.event_id === f), C = n.fields.find((y) => y.name === w), k = !!((M = C == null ? void 0 : C.config) != null && M.multiple);
    let D = l;
    if (C) {
      const y = b[w], _ = We(C, y, b).value;
      if (k)
        if (_.includes(l)) {
          if (Ke(b.start, u))
            return;
          D = _;
        } else
          D = _.length > 1 ? [..._, l] : [l];
    }
    if (Ke(b.start, u) && (!D || !k && D === b[w]))
      return;
    const T = ke(b.end, b.start), x = {
      ...b,
      start: u,
      end: ae(u, T),
      recurring: void 0,
      [w]: D || ""
    };
    if (!n.onEventDrop || typeof n.onEventDrop != "function")
      return g(x, "edit");
    try {
      h(!0);
      const y = await n.onEventDrop(m, u, x, b);
      y && g(y, "edit");
    } finally {
      h(!1);
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
        triggerDialog: c,
        triggerLoading: h,
        handleGotoDay: d,
        confirmEvent: g,
        setCurrentDragged: v,
        onDrop: p
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
