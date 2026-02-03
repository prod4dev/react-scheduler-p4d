import { jsxs as S, jsx as r, Fragment as Z } from "react/jsx-runtime";
import { createContext as dt, useContext as ct, useMemo as j, useState as P, Fragment as K, useRef as Ye, useEffect as ee, useCallback as U, forwardRef as ut } from "react";
import { isWithinInterval as oe, endOfDay as Q, startOfDay as J, format as N, isSameDay as ue, differenceInDays as ht, addSeconds as Lt, subMinutes as Vt, addMinutes as ae, differenceInMilliseconds as Bt, addDays as q, addMilliseconds as Gt, isToday as he, differenceInMinutes as ke, set as ve, isBefore as xe, isAfter as ft, startOfWeek as Ee, eachMinuteOfInterval as pt, endOfMonth as gt, endOfWeek as mt, startOfMonth as Le, getMonth as jt, setMonth as Qe, getDaysInMonth as Ut, isSameMonth as yt, differenceInCalendarWeeks as Zt, closestTo as qt, setHours as Je, eachWeekOfInterval as Xt, eachDayOfInterval as Yt, isEqual as Ke } from "date-fns";
import { useTheme as Y, ListItem as Qt, ListItemAvatar as vt, Avatar as Ve, ListItemText as _t, Typography as $, Tabs as Jt, Tab as Kt, Box as we, styled as ie, alpha as de, Paper as bt, Grow as en, IconButton as fe, Slide as tn, Button as X, Popover as _e, List as nn, ListItemButton as rn, ButtonBase as on, useMediaQuery as wt, MenuList as an, MenuItem as Oe, TextField as ln, FormControl as sn, InputLabel as dn, Select as cn, Checkbox as un, Chip as hn, CircularProgress as xt, FormHelperText as fn, Dialog as pn, DialogTitle as gn, DialogContent as mn, Grid as et, DialogActions as yn } from "@mui/material";
import { enUS as vn } from "date-fns/locale";
import { styled as _n } from "@mui/material/styles";
import bn from "@mui/icons-material/DeleteRounded";
import wn from "@mui/icons-material/EditRounded";
import xn from "@mui/icons-material/EventNoteRounded";
import Dn from "@mui/icons-material/ClearRounded";
import Tn from "@mui/icons-material/SupervisorAccountRounded";
import tt from "@mui/icons-material/ArrowRightRounded";
import nt from "@mui/icons-material/ArrowLeftRounded";
import { LocalizationProvider as Cn } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns as kn } from "@mui/x-date-pickers/AdapterDateFnsV3";
import rt from "@mui/icons-material/NavigateBeforeRounded";
import $e from "@mui/icons-material/NavigateNextRounded";
import { DateCalendar as Be } from "@mui/x-date-pickers";
import En from "@mui/icons-material/MoreVert";
import Sn from "@mui/icons-material/ViewAgenda";
import { DatePicker as Mn } from "@mui/x-date-pickers/DatePicker";
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
}, Rn = (e) => {
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
    const v = s && !Array.isArray(d[o]) ? [d[o]] : d[o];
    (s || Array.isArray(v) ? v.includes(t[o]) : v === t[o]) && u.push({
      ...d,
      color: d.color || t[n.colorField || ""]
    });
  }
  return u;
}, $n = (e, t) => e.filter(
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
), Dt = (e, t) => Math.ceil(e) / t, Tt = (e, t) => Math.max(e / t, 60), le = (e, t) => ht(Q(Lt(t, -1)), J(e)), An = (e) => new Date(
  e.getUTCFullYear(),
  e.getUTCMonth(),
  e.getUTCDate(),
  e.getUTCHours(),
  e.getUTCMinutes()
), Ct = (e, t, n) => {
  var o;
  const i = Bt(e.end, e.start);
  return e.recurring ? (o = e.recurring) == null ? void 0 : o.between(q(t, -1), q(t, 1), !0).map((a, s) => {
    const u = An(a);
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
}, De = (e, t) => {
  const n = e.filter(
    (i) => oe(t, {
      start: J(i.start),
      end: Q(Vt(i.end, 1))
    })
  );
  return Se(n);
}, Et = (e) => e.sort((t, n) => {
  const i = t.end.getTime() - t.start.getTime();
  return n.end.getTime() - n.start.getTime() - i;
}), Se = (e) => e.sort((t, n) => t.allDay || le(t.start, t.end) > 0 ? -1 : t.start.getTime() - n.start.getTime()), Te = (e, t, n, i) => {
  var u;
  const o = Array.isArray(t), a = [], s = {};
  for (let f = 0; f < e.length; f++) {
    const d = Ce(e[f], n);
    let p = d.allDay || le(d.start, d.end) > 0;
    if (p && (o ? p = t.some(
      (v) => oe(v, {
        start: J(d.start),
        end: Q(d.end)
      })
    ) : p = oe(t, {
      start: J(d.start),
      end: Q(d.end)
    }), p))
      if (a.push(d), o)
        for (const v of t) {
          const y = N(v, "yyyy-MM-dd");
          oe(v, { start: J(d.start), end: Q(d.end) }) && (s[y] = (s[y] || []).concat(d));
        }
      else {
        const v = N(d.start, "yyyy-MM-dd");
        s[v] = (s[v] || []).concat(d);
      }
  }
  return o && i ? ((u = Object.values(s).sort((f, d) => d.length - f.length)) == null ? void 0 : u[0]) || [] : a;
}, Ce = (e, t) => ({
  ...e,
  start: pe(e.start, t),
  end: pe(e.end, t),
  convertedTz: !0
}), pe = (e, t) => new Date(
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
}) => ue(e, pe(t || /* @__PURE__ */ new Date(), n)), ye = (e) => e === "12" ? "hh:mm a" : "HH:mm";
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
}, zn = {
  startHour: 9,
  endHour: 17,
  step: 60,
  navigation: !0
}, Hn = {
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
    day: i !== null ? Object.assign(zn, i) : null
  };
}, St = (e) => {
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
    ...p
  } = e, v = Vn(e), y = i || "week", g = v[y] ? y : Nn(v);
  return {
    ...v,
    translations: Ln(t),
    resourceFields: Object.assign(Hn, n),
    view: g,
    selectedDate: pe(a || /* @__PURE__ */ new Date(), e.timeZone),
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
    ...p
  };
}, Mt = {
  ...St({}),
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
}, It = dt(Mt), R = () => ct(It), ze = ({ resource: e }) => {
  const { resourceHeaderComponent: t, resourceFields: n, direction: i, resourceViewMode: o } = R(), a = Y(), s = e[n.textField], u = e[n.subTextField || ""], f = e[n.avatarField || ""], d = e[n.colorField || ""];
  return t instanceof Function ? t(e) : /* @__PURE__ */ S(
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
            primary: /* @__PURE__ */ r($, { variant: "body2", noWrap: o !== "vertical", children: s }),
            secondary: /* @__PURE__ */ r(
              $,
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
}) => /* @__PURE__ */ S(jn, { style: a, children: [
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
  const { resources: t, resourceFields: n, resourceViewMode: i } = R(), o = Y();
  return i === "tabs" ? /* @__PURE__ */ r(Zn, { renderChildren: e }) : i === "vertical" ? /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ S(we, { sx: { display: "flex" }, children: [
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
        children: /* @__PURE__ */ r(ze, { resource: a })
      }
    ),
    /* @__PURE__ */ r(
      we,
      {
        sx: { width: "100%", overflowX: "auto" },
        children: e(a)
      }
    )
  ] }, `${a[n.idField]}_${s}`)) }) : /* @__PURE__ */ r(Z, { children: t.map((a, s) => /* @__PURE__ */ S("div", { children: [
    /* @__PURE__ */ r(ze, { resource: a }),
    e(a)
  ] }, `${a[n.idField]}_${s}`)) });
}, Zn = ({ renderChildren: e }) => {
  const { resources: t, resourceFields: n, selectedTab: i, handleState: o, onResourceChange: a } = R(), s = t.map((d) => ({
    id: d[n.idField],
    label: /* @__PURE__ */ r(ze, { resource: d }),
    component: /* @__PURE__ */ r(Z, { children: e(d) })
  })), u = (d) => {
    if (o(d, "selectedTab"), typeof a == "function") {
      const p = t.find((v) => v[n.idField] === d);
      p && a(p);
    }
  }, f = j(() => {
    const d = t[0][n.idField];
    return !i || t.findIndex((v) => v[n.idField] === i) < 0 ? d : i;
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
})), Me = ie("div")(({ theme: e }) => ({
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
  const { editable: t, deletable: n, draggable: i } = R(), o = j(() => typeof e.editable < "u" ? e.editable : t, [t, e.editable]), a = j(() => typeof e.deletable < "u" ? e.deletable : n, [n, e.deletable]), s = j(() => {
    if (o)
      return typeof e.draggable < "u" ? e.draggable : i;
  }, [i, e.draggable, o]);
  return {
    canEdit: o,
    canDelete: a,
    canDrag: s
  };
}, er = ({ event: e, onDelete: t, onEdit: n }) => {
  const { translations: i, direction: o } = R(), [a, s] = P(!1), u = () => {
    if (!a)
      return s(!0);
    t();
  }, { canEdit: f, canDelete: d } = Ft(e);
  return /* @__PURE__ */ S(Jn, { children: [
    /* @__PURE__ */ r(en, { in: !a, exit: !1, timeout: 400, unmountOnExit: !0, children: /* @__PURE__ */ S("div", { children: [
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
        children: /* @__PURE__ */ S("div", { children: [
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
    fields: p,
    resources: v,
    resourceFields: y,
    locale: g,
    viewerTitleComponent: h,
    hourFormat: c,
    translations: w,
    onEventEdit: l
  } = R(), b = Y(), E = le(t.start, t.end) <= 0 && t.allDay, k = ye(c), x = y.idField, C = v.filter(
    (T) => Array.isArray(t[x]) ? t[x].includes(T[x]) : T[x] === t[x]
  ), D = async () => {
    try {
      u(!0);
      let T = t.event_id;
      if (o) {
        const _ = await o(T);
        _ ? T = _ : T = "";
      }
      if (T) {
        n();
        const _ = a.filter((m) => m.event_id !== T);
        s(_, "events");
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
      children: typeof f == "function" ? f(t, () => n()) : /* @__PURE__ */ S(Qn, { children: [
        /* @__PURE__ */ S(
          we,
          {
            sx: {
              bgcolor: t.color || b.palette.primary.main,
              color: b.palette.primary.contrastText
            },
            children: [
              /* @__PURE__ */ S("div", { className: "rs__popper_actions", children: [
                /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                  fe,
                  {
                    size: "small",
                    onClick: () => {
                      n();
                    },
                    children: /* @__PURE__ */ r(Dn, { color: "disabled" })
                  }
                ) }),
                /* @__PURE__ */ r(
                  er,
                  {
                    event: t,
                    onDelete: D,
                    onEdit: () => {
                      n(), i(!0, t), l && typeof l == "function" && l(t);
                    }
                  }
                )
              ] }),
              h instanceof Function ? h(t) : /* @__PURE__ */ r($, { style: { padding: "5px 0" }, noWrap: !0, children: t.title })
            ]
          }
        ),
        /* @__PURE__ */ S("div", { style: { padding: "5px 10px" }, children: [
          /* @__PURE__ */ S(
            $,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(xn, {}),
                E ? w.event.allDay : `${N(t.start, `dd MMMM yyyy ${k}`, {
                  locale: g
                })} - ${N(t.end, `dd MMMM yyyy ${k}`, {
                  locale: g
                })}`
              ]
            }
          ),
          C.length > 0 && /* @__PURE__ */ S(
            $,
            {
              style: { display: "flex", alignItems: "center", gap: 8 },
              color: "textSecondary",
              variant: "caption",
              noWrap: !0,
              children: [
                /* @__PURE__ */ r(Tn, {}),
                C.map((T) => T[y.textField]).join(", ")
              ]
            }
          ),
          d instanceof Function ? d(p, t) : d
        ] })
      ] })
    }
  );
}, je = ({ day: e, events: t }) => {
  const [n, i] = P(null), [o, a] = P(), [s, u] = P(!1), { locale: f, hourFormat: d, eventRenderer: p, onEventClick: v, timeZone: y, disableViewer: g } = R(), h = Y(), c = ye(d), w = (l) => {
    !(l != null && l.currentTarget) && s && u(!1), i((l == null ? void 0 : l.currentTarget) || null);
  };
  return /* @__PURE__ */ S(K, { children: [
    /* @__PURE__ */ r(nn, { children: t.map((l) => {
      const E = se({
        dateLeft: l.start,
        dateRight: e,
        timeZone: y
      }) ? c : `MMM d, ${c}`, k = N(l.start, E, {
        locale: f
      }), C = se({ dateLeft: l.end, dateRight: e, timeZone: y }) ? c : `MMM d, ${c}`, D = N(l.end, C, {
        locale: f
      });
      return typeof p == "function" ? p({
        event: l,
        onClick: (T) => {
          a(l), w(T);
        }
      }) : /* @__PURE__ */ S(
        rn,
        {
          focusRipple: !0,
          disableRipple: g,
          tabIndex: g ? -1 : 0,
          disabled: l.disabled,
          onClick: (T) => {
            T.preventDefault(), T.stopPropagation(), g || w(T), a(l), typeof v == "function" && v(l);
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
            /* @__PURE__ */ r(_t, { primary: l.title, secondary: `${k} - ${D}` })
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
  const { height: e, translations: t } = R();
  return /* @__PURE__ */ r(
    Me,
    {
      sx: {
        borderWidth: 1,
        padding: 1,
        height: e / 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: /* @__PURE__ */ r($, { children: t.noDataToDisplay }) })
    }
  );
}, tr = ({ daysList: e, resource: t, events: n }) => {
  const { week: i, handleGotoDay: o, locale: a, timeZone: s, translations: u, alwaysShowAgendaDays: f } = R(), { disableGoToDay: d, headRenderer: p } = i, v = j(() => e.some((y) => De(n, y).length > 0), [e, n]);
  return !f && !v ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Me, { children: e.map((y, g) => {
    const h = se({ dateLeft: y, timeZone: s }), c = De(n, y);
    return !f && !c.length ? null : /* @__PURE__ */ S("div", { className: `rs__agenda_row ${he(y) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof p == "function" ? /* @__PURE__ */ r("div", { children: p({ day: y, events: n, resource: t }) }) : /* @__PURE__ */ r(
        $,
        {
          sx: { fontWeight: h ? "bold" : "inherit" },
          color: h ? "primary" : "inherit",
          variant: "body2",
          className: d ? "" : "rs__hover__op",
          onClick: (w) => {
            w.stopPropagation(), d || o(y);
          },
          children: N(y, "dd E", { locale: a })
        }
      ) }),
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: c.length > 0 ? /* @__PURE__ */ r(je, { day: y, events: c }) : /* @__PURE__ */ r($, { sx: { padding: 1 }, children: u.noDataToDisplay }) })
    ] }, g);
  }) });
}, He = 1, ce = 28, it = 27, nr = 23, Rt = () => {
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
}, $t = ({ date: e, onClick: t, locale: n }) => {
  const { timeZone: i } = R(), o = se({ dateLeft: e, timeZone: i });
  return /* @__PURE__ */ S("div", { children: [
    /* @__PURE__ */ r(
      $,
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
      $,
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
}, At = dt({
  renderedSlots: {},
  setRenderedSlot: () => {
  }
}), Ot = () => ct(At), rr = (e) => {
  const { setCurrentDragged: t } = R(), n = Y();
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
  const { direction: a, locale: s, hourFormat: u, eventRenderer: f, onEventClick: d, view: p, disableViewer: v } = R(), y = rr(e), [g, h] = P(null), [c, w] = P(!1), l = Y(), b = ye(u), E = a === "rtl" ? nt : tt, k = a === "rtl" ? tt : nt, x = le(e.start, e.end) <= 0 && e.allDay, { canDrag: C } = Ft(e), D = U(
    (_) => {
      !(_ != null && _.currentTarget) && c && w(!1), h((_ == null ? void 0 : _.currentTarget) || null);
    },
    [c]
  ), T = j(() => {
    if (typeof f == "function" && !t && p !== "month") {
      const m = f({ event: e, onClick: D, ...y });
      if (m)
        return /* @__PURE__ */ r(ot, { children: m }, `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`);
    }
    let _ = /* @__PURE__ */ S("div", { style: { padding: "2px 6px" }, children: [
      /* @__PURE__ */ r($, { variant: "subtitle2", style: { fontSize: 12 }, noWrap: !0, children: e.title }),
      e.subtitle && /* @__PURE__ */ r($, { variant: "body2", style: { fontSize: 11 }, noWrap: !0, children: e.subtitle }),
      o && /* @__PURE__ */ r($, { style: { fontSize: 11 }, noWrap: !0, children: `${N(e.start, b, {
        locale: s
      })} - ${N(e.end, b, { locale: s })}` })
    ] });
    return t && (_ = /* @__PURE__ */ S(
      "div",
      {
        style: {
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ r($, { sx: { fontSize: 11 }, noWrap: !0, children: n ? /* @__PURE__ */ r(k, { fontSize: "small", sx: { display: "flex" } }) : o && !x && N(e.start, b, { locale: s }) }),
          /* @__PURE__ */ r($, { variant: "subtitle2", align: "center", sx: { fontSize: 12 }, noWrap: !0, children: e.title }),
          /* @__PURE__ */ r($, { sx: { fontSize: 11 }, noWrap: !0, children: i ? /* @__PURE__ */ r(E, { fontSize: "small", sx: { display: "flex" } }) : o && !x && N(e.end, b, { locale: s }) })
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
            onClick: (m) => {
              m.preventDefault(), m.stopPropagation(), v || D(m), typeof d == "function" && d(e);
            },
            focusRipple: !0,
            tabIndex: v ? -1 : 0,
            disableRipple: v,
            disabled: e.disabled,
            children: /* @__PURE__ */ r("div", { ...y, draggable: C, children: _ })
          }
        )
      },
      `${e.start.getTime()}_${e.end.getTime()}_${e.event_id}`
    );
  }, [
    f,
    t,
    p,
    e,
    o,
    b,
    s,
    l.palette.primary.main,
    l.palette.primary.contrastText,
    v,
    y,
    C,
    D,
    n,
    k,
    x,
    i,
    E,
    d
  ]);
  return /* @__PURE__ */ S(K, { children: [
    T,
    /* @__PURE__ */ r(Nt, { anchorEl: g, event: e, onTriggerViewer: D })
  ] });
};
function Ae({ startHour: e, step: t, minuteHeight: n, timeZone: i }) {
  const o = pe(/* @__PURE__ */ new Date(), i), a = ke(o, ve(o, { hours: e, minutes: 0 })), s = a * n, f = a / t + He;
  return s + f;
}
const or = (e) => {
  const [t, n] = P(Ae(e)), { startHour: i, step: o, minuteHeight: a, timeZone: s } = e;
  return ee(() => {
    const u = { startHour: i, step: o, minuteHeight: a, timeZone: s };
    n(Ae(u));
    const f = setInterval(() => n(Ae(u)), 60 * 1e3);
    return () => clearInterval(f);
  }, [i, o, a, s]), t < 0 ? null : /* @__PURE__ */ S(Kn, { style: { top: t, zIndex: e.zIndex }, children: [
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
  return /* @__PURE__ */ S(K, { children: [
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
    e.map((d, p) => {
      const v = (i * 60 - n * 60) * a, y = ke(d.end, d.start) * a, g = Math.min(y, v) - He, h = n * 60, c = d.start.getHours() * 60 + d.start.getMinutes(), w = Math.max(c - h, 0), l = w * a, E = g / 60 * He, k = w / o, x = l + k, C = $n(e, d), D = C.filter((T) => f.includes(T.event_id));
      return f.push(d.event_id), /* @__PURE__ */ r(
        "div",
        {
          className: "rs__event__item",
          style: {
            height: g + E,
            top: x,
            width: D.length > 0 ? `calc(100% - ${100 - 98 / (D.length + 1)}%)` : "98%",
            // Leave some space to click cell
            zIndex: e.length + p,
            [s === "rtl" ? "right" : "left"]: D.length > 0 ? `${100 / (C.length + 1) * D.length}%` : ""
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
    timeZone: p,
    isCellDisabled: v,
    disabledCellLabel: y,
    availableCellLabel: g
  } = R(), h = Y(), c = j(() => v && typeof v == "function" ? v(e, t, n, i) : !1, [v, e, t, n, i]), w = d && !c;
  return {
    tabIndex: w ? 0 : -1,
    disableRipple: !w,
    disabled: c,
    title: c ? y : g,
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
        const b = Pe(e, p);
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
    resourceFields: p,
    resourceViewMode: v,
    direction: y,
    locale: g,
    hourFormat: h,
    timeZone: c,
    stickyNavigation: w
  } = R(), { startHour: l, endHour: b, step: E, cellRenderer: k, disableGoToDay: x, headRenderer: C, hourRenderer: D } = s, { renderedSlots: T } = Ot(), { headersRef: _, bodyRef: m } = Rt(), M = ce, I = J(e[0]), z = Q(e[e.length - 1]), H = ye(h), V = j(() => {
    const A = d.length && v === "default", F = Te(
      A ? u : o,
      e,
      c,
      !0
    );
    return M * F.length + 45;
  }, [
    M,
    e,
    u,
    v,
    o,
    d.length,
    c
  ]), W = (A, F, B) => {
    const te = ue(I, F);
    return Te(A, e, c).filter((O) => xe(O.start, I) ? te : ue(O.start, F)).sort((O, re) => re.end.getTime() - O.end.getTime()).map((O) => {
      var Xe;
      const re = xe(J(O.start), I), L = ft(Q(O.end), z), Ne = le(re ? I : O.start, L ? z : O.end) + 1, Pt = N(F, "yyyy-MM-dd"), zt = B ? B[p.idField] : "all", Re = (Xe = T == null ? void 0 : T[zt]) == null ? void 0 : Xe[Pt], Ht = (Re == null ? void 0 : Re[O.event_id]) || 0;
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__multi_day",
          style: {
            top: Ht * M + 45,
            width: `${99.9 * Ne}%`,
            overflowX: "hidden"
          },
          children: /* @__PURE__ */ r(Ie, { event: O, hasPrev: re, hasNext: L, multiday: !0 })
        },
        O.event_id
      );
    });
  };
  return /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ S(
      ge,
      {
        days: e.length,
        ref: _,
        sticky: "1",
        stickyNavigation: w,
        children: [
          /* @__PURE__ */ r("span", { className: "rs__cell rs__time" }),
          e.map((A, F) => /* @__PURE__ */ S(
            "span",
            {
              className: `rs__cell rs__header ${he(A) ? "rs__today_cell" : ""}`,
              style: { height: V },
              children: [
                typeof C == "function" ? /* @__PURE__ */ r("div", { children: C({ day: A, events: o, resource: a }) }) : /* @__PURE__ */ r(
                  $t,
                  {
                    date: A,
                    onClick: x ? void 0 : f,
                    locale: g
                  }
                ),
                W(o, A, a)
              ]
            },
            F
          ))
        ]
      }
    ),
    /* @__PURE__ */ r(ge, { days: e.length, ref: m, children: t.map((A, F) => /* @__PURE__ */ S(K, { children: [
      /* @__PURE__ */ r("span", { style: { height: n }, className: "rs__cell rs__header rs__time", children: typeof D == "function" ? /* @__PURE__ */ r("div", { children: D(N(A, H, { locale: g })) }) : /* @__PURE__ */ r($, { variant: "caption", children: N(A, H, { locale: g }) }) }),
      e.map((B, te) => {
        const G = /* @__PURE__ */ new Date(`${N(B, "yyyy/MM/dd")} ${N(A, H)}`), ne = ae(G, E), O = p.idField;
        return /* @__PURE__ */ S("span", { className: `rs__cell ${he(B) ? "rs__today_cell" : ""}`, children: [
          F === 0 && /* @__PURE__ */ r(
            Wt,
            {
              todayEvents: kt(o, B, c),
              today: B,
              minuteHeight: i,
              startHour: l,
              endHour: b,
              step: E,
              direction: y,
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
    agenda: p
  } = R(), { weekStartOn: v, weekDays: y, startHour: g, endHour: h, step: c } = e, w = Ee(t, { weekStartsOn: v }), l = y.map((M) => q(w, M)), b = J(l[0]), E = Q(l[l.length - 1]), k = ve(t, { hours: g, minutes: 0, seconds: 0 }), x = ve(t, { hours: h, minutes: -c, seconds: 0 }), C = pt(
    {
      start: k,
      end: x
    },
    { step: c }
  ), D = Tt(n, C.length), T = Dt(D, c), _ = U(async () => {
    try {
      a(!0);
      const M = await o({
        start: b,
        end: E,
        view: "week"
      });
      Array.isArray(M) && s(M, "events");
    } catch (M) {
      throw M;
    } finally {
      a(!1);
    }
  }, [o]);
  ee(() => {
    o instanceof Function && _();
  }, [_, o]);
  const m = (M) => {
    let I = i;
    return M && (I = be(i, M, f, d)), p ? /* @__PURE__ */ r(tr, { daysList: l, resource: M, events: I }) : /* @__PURE__ */ r(
      ar,
      {
        resourcedEvents: I,
        resource: M,
        hours: C,
        cellHeight: D,
        minutesHeight: T,
        daysList: l
      }
    );
  };
  return u.length ? /* @__PURE__ */ r(Ge, { renderChildren: m }) : m();
}, Fe = ({ children: e }) => {
  const { locale: t } = R();
  return /* @__PURE__ */ r(Cn, { dateAdapter: kn, adapterLocale: t, children: e });
}, me = ({ type: e, onClick: t, ...n }) => {
  const { direction: i } = R();
  let o = $e;
  return e === "prev" ? o = i === "rtl" ? $e : rt : e === "next" && (o = i === "rtl" ? rt : $e), /* @__PURE__ */ r(
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
  const { selectedDate: e, week: t, navigationPickerProps: n, view: i } = R(), o = n == null ? void 0 : n.minDate, a = n == null ? void 0 : n.maxDate, s = i === "month" ? gt(e) : i === "week" ? mt(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, u = i === "month" ? Le(e) : i === "week" ? Ee(e, { weekStartsOn: t == null ? void 0 : t.weekStartOn }) : e, f = o ? u <= o : !1, d = a ? s >= a : !1;
  return { prevDisabled: f, nextDisabled: d };
}, sr = ({ selectedDate: e, onChange: t, weekProps: n }) => {
  const { locale: i, navigationPickerProps: o } = R(), [a, s] = P(null), { weekStartOn: u } = n, f = Ee(e, { weekStartsOn: u }), d = mt(e, { weekStartsOn: u }), { prevDisabled: p, nextDisabled: v } = qe(), y = (l) => {
    s(l.currentTarget);
  }, g = () => {
    s(null);
  }, h = (l) => {
    t(l || /* @__PURE__ */ new Date()), g();
  }, c = () => {
    const l = q(f, -1);
    t(l);
  }, w = () => {
    const l = q(d, 1);
    t(l);
  };
  return /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: c,
        disabled: p,
        "aria-label": "previous week"
      }
    ),
    /* @__PURE__ */ r(X, { style: { padding: 4 }, onClick: y, "aria-label": "selected week", children: `${N(f, "dd", { locale: i })} - ${N(d, "dd MMM yyyy", {
      locale: i
    })}` }),
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
        disabled: v,
        "aria-label": "next week"
      }
    )
  ] });
}, dr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = R(), [o, a] = P(null), { prevDisabled: s, nextDisabled: u } = qe(), f = (g) => {
    a(g.currentTarget);
  }, d = () => {
    a(null);
  }, p = (g) => {
    t(g || /* @__PURE__ */ new Date()), d();
  }, v = () => {
    const g = q(e, -1);
    t(g);
  }, y = () => {
    const g = q(e, 1);
    t(g);
  };
  return /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: v,
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
            onChange: p
          }
        ) })
      }
    ),
    /* @__PURE__ */ r(me, { type: "next", onClick: y, disabled: u, "aria-label": "next day" })
  ] });
}, cr = ({ selectedDate: e, onChange: t }) => {
  const { locale: n, navigationPickerProps: i } = R(), o = jt(e), [a, s] = P(null), { prevDisabled: u, nextDisabled: f } = qe(), d = (h) => {
    s(h.currentTarget);
  }, p = () => {
    s(null);
  }, v = (h) => {
    t(h || /* @__PURE__ */ new Date()), p();
  }, y = () => {
    const h = o - 1;
    t(Qe(e, h));
  }, g = () => {
    const h = o + 1;
    t(Qe(e, h));
  };
  return /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ r(
      me,
      {
        type: "prev",
        onClick: y,
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
        onClose: p,
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
      me,
      {
        type: "next",
        onClick: g,
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
    onSelectedDateChange: p,
    onViewChange: v,
    stickyNavigation: y,
    timeZone: g,
    agenda: h,
    toggleAgenda: c,
    enableAgenda: w
  } = R(), [l, b] = P(null), E = Y(), k = wt(E.breakpoints.up("sm")), x = o(), C = (m) => {
    b(m || null);
  }, D = (m) => {
    i(m, "selectedDate"), p && typeof p == "function" && p(m);
  }, T = (m) => {
    i(m, "view"), v && typeof v == "function" && v(m, h);
  }, _ = () => {
    switch (t) {
      case "month":
        return (f == null ? void 0 : f.navigation) && /* @__PURE__ */ r(cr, { selectedDate: e, onChange: D });
      case "week":
        return (n == null ? void 0 : n.navigation) && /* @__PURE__ */ r(
          sr,
          {
            selectedDate: e,
            onChange: D,
            weekProps: n
          }
        );
      case "day":
        return (u == null ? void 0 : u.navigation) && /* @__PURE__ */ r(dr, { selectedDate: e, onChange: D });
      default:
        return "";
    }
  };
  return !s && d ? null : /* @__PURE__ */ S(Yn, { sticky: y ? "1" : "0", children: [
    /* @__PURE__ */ r("div", { "data-testid": "date-navigator", children: s && _() }),
    /* @__PURE__ */ S(
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
              onClick: () => D(pe(/* @__PURE__ */ new Date(), g)),
              "aria-label": a.navigation.today,
              sx: {
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                padding: "6px 16px",
                color: "#374151",
                border: "1px solid #e5e7eb",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#d1d5db"
                }
              },
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
              children: /* @__PURE__ */ r(Sn, {})
            }
          )),
          x.length > 1 && (k ? /* @__PURE__ */ r(
            "div",
            {
              style: {
                display: "inline-flex",
                backgroundColor: "#f3f4f6",
                borderRadius: "8px",
                padding: "4px",
                gap: "4px"
              },
              children: x.map((m) => /* @__PURE__ */ r(
                X,
                {
                  onClick: () => T(m),
                  onDragOver: (M) => {
                    M.preventDefault(), T(m);
                  },
                  sx: {
                    borderRadius: "6px",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "14px",
                    padding: "6px 16px",
                    minWidth: "auto",
                    transition: "all 0.2s ease",
                    backgroundColor: m === t ? "#fff" : "transparent",
                    color: m === t ? "#1d4ed8" : "#6b7280",
                    boxShadow: m === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    "&:hover": {
                      backgroundColor: m === t ? "#fff" : "rgba(255,255,255,0.5)"
                    }
                  },
                  children: a.navigation[m]
                },
                m
              ))
            }
          ) : /* @__PURE__ */ S(K, { children: [
            /* @__PURE__ */ r(
              fe,
              {
                style: { padding: 5 },
                onClick: (m) => {
                  C(m.currentTarget);
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
                children: /* @__PURE__ */ r(an, { autoFocusItem: !!l, disablePadding: !0, children: x.map((m) => /* @__PURE__ */ r(
                  Oe,
                  {
                    selected: m === t,
                    onClick: () => {
                      C(), T(m);
                    },
                    children: a.navigation[m]
                  },
                  m
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
  const { translations: p } = R(), [v, y] = P({
    touched: !1,
    valid: !!t,
    errorMsg: u || (d ? ((w = p == null ? void 0 : p.validation) == null ? void 0 : w.required) || "Required" : void 0)
  }), g = e === "date" ? Mn : In, h = v.touched && (s || !v.valid), c = U(
    (b) => {
      var D;
      const E = !isNaN(Date.parse(b)), k = typeof b == "string" && E ? new Date(b) : b;
      let x = !0, C = u;
      d && !k && (x = !1, C = u || ((D = p == null ? void 0 : p.validation) == null ? void 0 : D.required) || "Required"), y((T) => ({ ...T, touched: !0, valid: x, errorMsg: C })), o(i, k);
    },
    [u, i, o, d, (l = p == null ? void 0 : p.validation) == null ? void 0 : l.required]
  );
  return ee(() => {
    f && c(t);
  }, [c, f, t]), /* @__PURE__ */ r(Fe, { children: /* @__PURE__ */ r(
    g,
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
          helperText: h && v.errorMsg,
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
  onChange: p,
  disabled: v,
  multiline: y,
  rows: g,
  touched: h
}) => {
  const [c, w] = P({
    touched: !1,
    valid: !1,
    errorMsg: ""
  }), { translations: l } = R(), b = U(
    (E) => {
      var D, T, _, m, M, I, z, H, V;
      const k = E;
      let x = !0, C = "";
      f && (x = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(k) && x, C = ((D = l == null ? void 0 : l.validation) == null ? void 0 : D.invalidEmail) || "Invalid Email"), d && (x = /^[0-9]+(\.[0-9]*)?$/.test(k) && x, C = ((T = l == null ? void 0 : l.validation) == null ? void 0 : T.onlyNumbers) || "Only Numbers Allowed"), s && `${k}`.trim().length < s && (x = !1, C = typeof ((_ = l == null ? void 0 : l.validation) == null ? void 0 : _.min) == "function" ? (m = l == null ? void 0 : l.validation) == null ? void 0 : m.min(s) : ((M = l == null ? void 0 : l.validation) == null ? void 0 : M.min) || `Minimum ${s} letters`), u && `${k}`.trim().length > u && (x = !1, C = typeof ((I = l == null ? void 0 : l.validation) == null ? void 0 : I.max) == "function" ? (z = l == null ? void 0 : l.validation) == null ? void 0 : z.max(u) : ((H = l == null ? void 0 : l.validation) == null ? void 0 : H.max) || `Maximum ${u} letters`), a && `${k}`.trim().length <= 0 && (x = !1, C = ((V = l == null ? void 0 : l.validation) == null ? void 0 : V.required) || "Required"), w({ touched: !0, valid: x, errorMsg: C }), p(o, k, x);
    },
    [d, f, u, s, o, p, a, l == null ? void 0 : l.validation]
  );
  return ee(() => {
    h && b(i);
  }, [b, h, i]), /* @__PURE__ */ r(
    ln,
    {
      variant: e,
      label: t && /* @__PURE__ */ r($, { variant: "body2", children: `${t} ${a ? "*" : ""}` }),
      value: i,
      name: o,
      onChange: (E) => b(E.target.value),
      disabled: v,
      error: c.touched && !c.valid,
      helperText: c.touched && !c.valid && c.errorMsg,
      multiline: y,
      rows: g,
      style: { width: "100%" },
      InputProps: {
        placeholder: n || ""
      }
    }
  );
}, pr = ({
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
  multiple: p,
  placeholder: v,
  errMsg: y
}) => {
  var E, k;
  const g = Y(), { translations: h } = R(), [c, w] = P({
    touched: !1,
    valid: !!t,
    errorMsg: y || (i ? ((E = h == null ? void 0 : h.validation) == null ? void 0 : E.required) || "Required" : void 0)
  }), l = U(() => {
    c.touched || w((x) => ({ ...x, touched: !0, errorMsg: y || x.errorMsg }));
  }, [y, c.touched]), b = U(
    (x) => {
      var _;
      const C = x;
      let D = !0, T = y;
      i && (p ? !C.length : !C) && (D = !1, T = y || ((_ = h == null ? void 0 : h.validation) == null ? void 0 : _.required) || "Required"), w((m) => ({ ...m, touched: !0, valid: D, errorMsg: T })), o(n, C, D);
    },
    [y, p, n, o, i, (k = h == null ? void 0 : h.validation) == null ? void 0 : k.required]
  );
  return ee(() => {
    u && b(t);
  }, [b, u, t]), /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ S(
      sn,
      {
        variant: f || "outlined",
        fullWidth: !0,
        error: i && c.touched && !c.valid,
        disabled: s,
        children: [
          a && /* @__PURE__ */ r(dn, { id: `input_${n}`, children: /* @__PURE__ */ r($, { variant: "body2", children: `${a} ${i ? "*" : ""}` }) }),
          /* @__PURE__ */ S(
            cn,
            {
              label: a,
              labelId: `input_${n}`,
              value: t,
              onBlur: l,
              onChange: (x) => b(x.target.value),
              IconComponent: d ? () => /* @__PURE__ */ r(xt, { size: 5 }) : Fn,
              multiple: !!p,
              classes: {
                select: p === "chips" ? "flex__wrap" : void 0
              },
              renderValue: (x) => {
                if (!x || x.length === 0)
                  return /* @__PURE__ */ r("em", { children: a });
                const C = [];
                if (p) {
                  for (const D of e)
                    x.includes(D.value) && C.push([D.text]);
                  return p === "chips" ? C.map((D, T) => /* @__PURE__ */ r(hn, { label: D, style: { margin: "0 2px" }, color: "primary" }, `${D}_${T}`)) : C.join(",");
                } else {
                  for (const D of e)
                    x === D.value && C.push([D.text]);
                  return C.join(",");
                }
              },
              children: [
                v && /* @__PURE__ */ r(Oe, { value: "", children: /* @__PURE__ */ r("em", { children: v }) }),
                e.map((x) => /* @__PURE__ */ S(Oe, { value: x.value, children: [
                  p && /* @__PURE__ */ r(un, { checked: t.indexOf(x.value) > -1, color: "primary" }),
                  x.text
                ] }, x.id || x.value))
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ r(fn, { style: { color: g.palette.error.main }, children: c.touched && !c.valid && c.errorMsg })
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
}, gr = () => {
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
    confirmEvent: p,
    dialogMaxWidth: v,
    translations: y,
    timeZone: g
  } = R(), [h, c] = P(at(e, o || i)), [w, l] = P(!1), b = Y(), E = wt(b.breakpoints.down("sm")), k = (_, m, M) => {
    c((I) => ({
      ...I,
      [_]: { ...I[_], value: m, validity: M }
    }));
  }, x = (_) => {
    _ && c(at(e)), n(!1);
  }, C = async () => {
    let _ = {};
    for (const m in h)
      if (_[m] = h[m].value, !d && !h[m].validity)
        return l(!0);
    try {
      u(!0), _.end = _.start >= _.end ? ae(_.start, ke(i == null ? void 0 : i.end, i == null ? void 0 : i.start)) : _.end;
      const m = o != null && o.event_id ? "edit" : "create";
      f ? _ = await f(_, m) : _.event_id = (o == null ? void 0 : o.event_id) || Date.now().toString(36) + Math.random().toString(36).slice(2), _.start = Pe(_.start, g), _.end = Pe(_.end, g), p(_, m), x(!0);
    } catch (m) {
      console.error(m);
    } finally {
      u(!1);
    }
  }, D = (_) => {
    var M, I, z;
    const m = h[_];
    switch (m.type) {
      case "input":
        return /* @__PURE__ */ r(
          fr,
          {
            value: m.value,
            name: _,
            onChange: k,
            touched: w,
            ...m.config,
            label: y.event[_] || ((M = m.config) == null ? void 0 : M.label)
          }
        );
      case "date":
        return /* @__PURE__ */ r(
          hr,
          {
            value: m.value,
            name: _,
            onChange: (...V) => k(...V, !0),
            touched: w,
            ...m.config,
            label: y.event[_] || ((I = m.config) == null ? void 0 : I.label)
          }
        );
      case "select":
        const H = e.find((V) => V.name === _);
        return /* @__PURE__ */ r(
          pr,
          {
            value: m.value,
            name: _,
            options: (H == null ? void 0 : H.options) || [],
            onChange: k,
            touched: w,
            ...m.config,
            label: y.event[_] || ((z = m.config) == null ? void 0 : z.label)
          }
        );
      default:
        return "";
    }
  };
  return /* @__PURE__ */ r(
    pn,
    {
      open: t,
      fullScreen: E,
      maxWidth: v,
      onClose: () => {
        n(!1);
      },
      children: (() => {
        if (d) {
          const _ = {
            state: h,
            close: () => n(!1),
            loading: (m) => u(m),
            edited: o,
            onConfirm: p,
            [a.idField]: s
          };
          return d(_);
        }
        return /* @__PURE__ */ S(K, { children: [
          /* @__PURE__ */ r(gn, { children: o ? y.form.editTitle : y.form.addTitle }),
          /* @__PURE__ */ r(mn, { style: { overflowX: "hidden" }, children: /* @__PURE__ */ r(et, { container: !0, spacing: 2, children: Object.keys(h).map((_) => {
            var M;
            const m = h[_];
            return /* @__PURE__ */ r(et, { size: { sm: (M = m.config) == null ? void 0 : M.sm, xs: 12 }, children: D(_) }, _);
          }) }) }),
          /* @__PURE__ */ S(yn, { children: [
            /* @__PURE__ */ r(X, { color: "inherit", fullWidth: !0, onClick: () => x(), children: y.form.cancel }),
            /* @__PURE__ */ r(X, { color: "primary", fullWidth: !0, onClick: C, children: y.form.confirm })
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
  } = R(), { disableGoToDay: d, headRenderer: p } = n, v = Ut(s), y = Array.from({ length: v }, (h, c) => c + 1), g = j(() => e.filter((h) => yt(h.start, s)), [e, s]);
  return !f && !g.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Me, { children: y.map((h) => {
    const c = new Date(s.getFullYear(), s.getMonth(), h), w = se({ dateLeft: c, timeZone: a }), l = De(e, c);
    return !f && !l.length ? null : /* @__PURE__ */ S("div", { className: `rs__agenda_row ${he(c) ? "rs__today_cell" : ""}`, children: [
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof p == "function" ? /* @__PURE__ */ r("div", { children: p({ day: c, events: e, resource: t }) }) : /* @__PURE__ */ r(
        $,
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
      /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: l.length > 0 ? /* @__PURE__ */ r(je, { day: c, events: l }) : /* @__PURE__ */ r($, { sx: { padding: 1 }, children: u.noDataToDisplay }) })
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
  const f = Math.round((u - it) / ce - 1), { translations: d, month: p, locale: v, timeZone: y } = R(), { renderedSlots: g } = Ot(), h = j(() => {
    var w;
    const c = [];
    for (let l = 0; l < Math.min(e.length, f + 1); l++) {
      const b = Ce(e[l], y), E = !!o && xe(b.start, o), k = E && o ? o : b.start;
      let x = le(k, b.end) + 1;
      const C = Zt(b.end, k, {
        weekStartsOn: p == null ? void 0 : p.weekStartOn,
        locale: v
      }) > 0;
      if (C) {
        const M = Ee(b.start, {
          weekStartsOn: p == null ? void 0 : p.weekStartOn,
          locale: v
        }), I = qt(M, i);
        I && (x = a.length - (o ? 0 : ht(b.start, I)));
      }
      const D = N(n, "yyyy-MM-dd"), T = (w = g == null ? void 0 : g[t || "all"]) == null ? void 0 : w[D], _ = (T == null ? void 0 : T[b.event_id]) || 0, m = Math.min(_, f) * ce + it;
      if (_ >= f) {
        c.push(
          /* @__PURE__ */ r(
            $,
            {
              width: "100%",
              className: "rs__multi_day rs__hover__op",
              style: { top: m, fontSize: 11 },
              onClick: (M) => {
                M.stopPropagation(), s(n);
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
              top: m,
              width: `${100 * x}%`,
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
    g,
    e,
    f,
    o,
    p == null ? void 0 : p.weekStartOn,
    v,
    n,
    i,
    a.length,
    d.moreEvents,
    s,
    y
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
    locale: p,
    hourFormat: v,
    stickyNavigation: y,
    timeZone: g,
    onClickMore: h
  } = R(), { weekDays: c, startHour: w, endHour: l, cellRenderer: b, headRenderer: E, disableGoToDay: k } = o, { headersRef: x, bodyRef: C } = Rt(), D = Y(), T = Le(a), _ = ye(v), m = i / n.length, M = U(
    (I) => {
      let z = Se(s);
      I && (z = be(s, I, f, d));
      const H = [];
      for (const V of n) {
        const W = c.map((A) => {
          const F = q(V, A), B = /* @__PURE__ */ new Date(`${N(Je(F, w), `yyyy/MM/dd ${_}`)}`), te = /* @__PURE__ */ new Date(`${N(Je(F, l), `yyyy/MM/dd ${_}`)}`), G = f.idField, ne = ue(V, F) ? F : null, O = z.flatMap((L) => Ct(L, F)).filter((L) => {
            if (ue(L.start, F)) return !0;
            const Ne = { start: J(L.start), end: Q(L.end) };
            return !!(ne && oe(ne, Ne));
          }), re = se({ dateLeft: F, timeZone: g });
          return /* @__PURE__ */ S("span", { style: { height: m }, className: "rs__cell", children: [
            /* @__PURE__ */ r(
              Ze,
              {
                start: B,
                end: te,
                day: a,
                height: m,
                resourceKey: G,
                resourceVal: I ? I[G] : null,
                cellRenderer: b
              }
            ),
            /* @__PURE__ */ S(K, { children: [
              typeof E == "function" ? /* @__PURE__ */ r("div", { style: { position: "absolute", top: 0 }, children: E({ day: F, events: z, resource: I }) }) : /* @__PURE__ */ r(
                Ve,
                {
                  style: {
                    width: 27,
                    height: 27,
                    position: "absolute",
                    top: 0,
                    background: re ? D.palette.secondary.main : "transparent",
                    color: re ? D.palette.secondary.contrastText : "",
                    marginBottom: 2
                  },
                  children: /* @__PURE__ */ r(
                    $,
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
                  cellHeight: m
                }
              )
            ] })
          ] }, A.toString());
        });
        H.push(/* @__PURE__ */ r(K, { children: W }, V.toString()));
      }
      return H;
    },
    [
      m,
      b,
      e,
      k,
      n,
      l,
      s,
      d,
      _,
      u,
      E,
      T,
      h,
      f,
      a,
      w,
      D.palette.secondary.contrastText,
      D.palette.secondary.main,
      g,
      c
    ]
  );
  return /* @__PURE__ */ S(Z, { children: [
    /* @__PURE__ */ r(
      ge,
      {
        days: e.length,
        ref: x,
        indent: "0",
        sticky: "1",
        stickyNavigation: y,
        children: e.map((I, z) => /* @__PURE__ */ r(
          $,
          {
            className: "rs__cell rs__header rs__header__center",
            align: "center",
            variant: "body2",
            children: N(I, "EE", { locale: p })
          },
          z
        ))
      }
    ),
    /* @__PURE__ */ r(ge, { days: e.length, ref: C, indent: "0", children: M(t) })
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
  } = R(), { weekStartOn: p, weekDays: v } = e, y = Le(t), g = gt(t), h = Xt(
    {
      start: y,
      end: g
    },
    { weekStartsOn: p }
  ), c = v.map((b) => q(h[0], b)), w = U(async () => {
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
        let E = Se(n);
        return b && (E = be(n, b, u, f)), /* @__PURE__ */ r(mr, { resource: b, events: E });
      }
      return /* @__PURE__ */ r(vr, { daysList: c, eachWeekStart: h, resource: b });
    },
    [d, c, h, n, f, u]
  );
  return s.length ? /* @__PURE__ */ r(Ge, { renderChildren: l }) : l();
}, br = ({ events: e, resource: t }) => {
  const { day: n, locale: i, selectedDate: o, translations: a, alwaysShowAgendaDays: s } = R(), { headRenderer: u } = n, f = j(() => De(e, o), [e, o]);
  return !s && !f.length ? /* @__PURE__ */ r(Ue, {}) : /* @__PURE__ */ r(Me, { children: /* @__PURE__ */ S("div", { className: "rs__agenda_row rs__today_cell", children: [
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda__cell", children: typeof u == "function" ? /* @__PURE__ */ r("div", { children: u({ day: o, events: e, resource: t }) }) : /* @__PURE__ */ r($, { variant: "body2", children: N(o, "dd E", { locale: i }) }) }),
    /* @__PURE__ */ r("div", { className: "rs__cell rs__agenda_items", children: f.length > 0 ? /* @__PURE__ */ r(je, { day: o, events: f }) : /* @__PURE__ */ r($, { sx: { padding: 1 }, children: a.noDataToDisplay }) })
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
    fields: p,
    direction: v,
    locale: y,
    hourFormat: g,
    timeZone: h,
    stickyNavigation: c,
    agenda: w
  } = R(), { startHour: l, endHour: b, step: E, cellRenderer: k, headRenderer: x, hourRenderer: C } = e, D = ve(t, { hours: l, minutes: 0, seconds: 0 }), T = ve(t, { hours: b, minutes: -E, seconds: 0 }), _ = pt(
    {
      start: D,
      end: T
    },
    { step: E }
  ), m = Tt(i, _.length), M = Dt(m, E), I = ye(g), z = U(async () => {
    try {
      a(!0);
      const W = q(D, -1), A = q(T, 1), F = await o({
        start: W,
        end: A,
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
    o instanceof Function && z();
  }, [z, o]);
  const H = U(
    (W) => {
      const A = Te(W, t, h);
      return /* @__PURE__ */ r(
        "div",
        {
          className: "rs__block_col",
          style: { height: ce * A.length },
          children: A.map((F, B) => {
            const te = xe(F.start, J(t)), G = ft(F.end, Q(t));
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
      let A = n;
      if (W && (A = be(n, W, f, p)), w)
        return /* @__PURE__ */ r(br, { resource: W, events: A });
      const F = u.length && d === "default", B = Te(
        F ? n : A,
        t,
        h
      ), te = ce * B.length + 45;
      return /* @__PURE__ */ S(Z, { children: [
        /* @__PURE__ */ S(ge, { days: 1, sticky: "1", stickyNavigation: c, children: [
          /* @__PURE__ */ r("span", { className: "rs__cell" }),
          /* @__PURE__ */ S(
            "span",
            {
              className: `rs__cell rs__header ${he(t) ? "rs__today_cell" : ""}`,
              style: { height: te },
              children: [
                typeof x == "function" ? /* @__PURE__ */ r("div", { children: x({ day: t, events: A, resource: W }) }) : /* @__PURE__ */ r($t, { date: t, locale: y }),
                H(A)
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r(ge, { days: 1, children: _.map((G, ne) => {
          const O = /* @__PURE__ */ new Date(`${N(t, "yyyy/MM/dd")} ${N(G, I)}`), re = ae(O, E), L = f.idField;
          return /* @__PURE__ */ S(K, { children: [
            /* @__PURE__ */ r("span", { className: "rs__cell rs__header rs__time", style: { height: m }, children: typeof C == "function" ? /* @__PURE__ */ r("div", { children: C(N(G, I, { locale: y })) }) : /* @__PURE__ */ r($, { variant: "caption", children: N(G, I, { locale: y }) }) }),
            /* @__PURE__ */ S("span", { className: `rs__cell ${he(t) ? "rs__today_cell" : ""}`, children: [
              ne === 0 && /* @__PURE__ */ r(
                Wt,
                {
                  todayEvents: kt(A, t, h),
                  today: D,
                  minuteHeight: M,
                  startHour: l,
                  endHour: b,
                  step: E,
                  direction: v,
                  timeZone: h
                }
              ),
              /* @__PURE__ */ r(
                Ze,
                {
                  start: O,
                  end: re,
                  day: t,
                  height: m,
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
      m,
      M,
      D,
      w,
      k,
      v,
      b,
      n,
      p,
      I,
      x,
      C,
      _,
      y,
      H,
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
  const a = o === "month" ? Et(e) : Se(e), s = {};
  if (t.length)
    for (const u of t) {
      const f = be(a, u, n, i), d = lt(f);
      s[u[n.idField]] = d;
    }
  else
    s.all = lt(a);
  return s;
}, xr = ({ children: e }) => {
  const { events: t, resources: n, resourceFields: i, fields: o, view: a } = R(), [s, u] = P({
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
  const f = (d, p, v, y) => {
    u((g) => {
      var h, c, w, l, b;
      return {
        ...g,
        renderedSlots: {
          ...g.renderedSlots,
          [y || "all"]: {
            ...(h = g.renderedSlots) == null ? void 0 : h[y || "all"],
            [d]: (w = (c = g.renderedSlots) == null ? void 0 : c[y || "all"]) != null && w[d] ? {
              ...(b = (l = g.renderedSlots) == null ? void 0 : l[y || "all"]) == null ? void 0 : b[d],
              [p]: v
            } : { [p]: v }
          }
        }
      };
    });
  };
  return /* @__PURE__ */ r(
    At.Provider,
    {
      value: {
        ...s,
        setRenderedSlot: f
      },
      children: e
    }
  );
}, Dr = ut(function(t, n) {
  const i = R(), { view: o, dialog: a, loading: s, loadingComponent: u, resourceViewMode: f, resources: d, translations: p } = i, v = j(() => {
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
  }, [o]), y = j(() => /* @__PURE__ */ r("div", { className: "rs__table_loading", children: u || /* @__PURE__ */ r("div", { className: "rs__table_loading_internal", children: /* @__PURE__ */ S("span", { children: [
    /* @__PURE__ */ r(xt, { size: 50 }),
    /* @__PURE__ */ r($, { align: "center", children: p.loading })
  ] }) }) }), [u, p.loading]);
  return /* @__PURE__ */ S(
    qn,
    {
      dialog: a ? 1 : 0,
      "data-testid": "rs-wrapper",
      ref: (g) => {
        const h = n;
        h && (h.current = {
          el: g,
          scheduler: i
        });
      },
      children: [
        s ? y : null,
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
            children: /* @__PURE__ */ r(xr, { children: v })
          }
        ),
        a && /* @__PURE__ */ r(gr, {})
      ]
    }
  );
}), Tr = ({ children: e, initial: t }) => {
  const [n, i] = P({ ...Mt, ...St(t) });
  ee(() => {
    i((g) => ({
      ...g,
      onEventDrop: t.onEventDrop,
      customEditor: t.customEditor,
      events: t.events || []
    }));
  }, [t.onEventDrop, t.customEditor, t.events]);
  const o = (g, h) => {
    i((c) => ({ ...c, [h]: g }));
  }, a = () => Rn(n), s = () => {
    i((g) => {
      const h = !g.agenda;
      return n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(n.view, h), { ...g, agenda: h };
    });
  }, u = (g, h) => {
    const c = h;
    i((w) => {
      var l;
      return {
        ...w,
        dialog: g,
        selectedRange: c != null && c.event_id ? void 0 : c || {
          start: /* @__PURE__ */ new Date(),
          end: new Date(Date.now() + 3600 * 1e3)
        },
        selectedEvent: c != null && c.event_id ? c : void 0,
        selectedResource: c == null ? void 0 : c[(l = n.resourceFields) == null ? void 0 : l.idField]
      };
    });
  }, f = (g) => {
    typeof t.loading > "u" && i((h) => ({ ...h, loading: g }));
  }, d = (g) => {
    const h = a();
    let c;
    h.includes("day") ? (c = "day", i((w) => ({ ...w, view: "day", selectedDate: g }))) : h.includes("week") ? (c = "week", i((w) => ({ ...w, view: "week", selectedDate: g }))) : console.warn("No Day/Week views available"), c && n.onViewChange && typeof n.onViewChange == "function" && n.onViewChange(c, n.agenda), c && n.onSelectedDateChange && typeof n.onSelectedDateChange == "function" && n.onSelectedDateChange(g);
  }, p = (g, h) => {
    let c;
    h === "edit" ? Array.isArray(g) ? c = n.events.map((w) => {
      const l = g.find((b) => b.event_id === w.event_id);
      return l ? { ...w, ...l } : w;
    }) : c = n.events.map(
      (w) => w.event_id === g.event_id ? { ...w, ...g } : w
    ) : c = n.events.concat(g), i((w) => ({ ...w, events: c }));
  }, v = (g) => {
    i((h) => ({ ...h, currentDragged: g }));
  }, y = async (g, h, c, w, l) => {
    var T;
    const b = n.events.find((_) => typeof _.event_id == "number" ? _.event_id === +h : _.event_id === h), E = n.fields.find((_) => _.name === w), k = !!((T = E == null ? void 0 : E.config) != null && T.multiple);
    let x = l;
    if (E) {
      const _ = b[w], m = We(E, _, b).value;
      if (k)
        if (m.includes(l)) {
          if (Ke(b.start, c))
            return;
          x = m;
        } else
          x = m.length > 1 ? [...m, l] : [l];
    }
    if (Ke(b.start, c) && (!x || !k && x === b[w]))
      return;
    const C = ke(b.end, b.start), D = {
      ...b,
      start: c,
      end: ae(c, C),
      recurring: void 0,
      [w]: x || ""
    };
    if (!n.onEventDrop || typeof n.onEventDrop != "function")
      return p(D, "edit");
    try {
      f(!0);
      const _ = await n.onEventDrop(g, c, D, b);
      _ && p(_, "edit");
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
        confirmEvent: p,
        setCurrentDragged: v,
        onDrop: y
      },
      children: e
    }
  );
}, qr = ut(function(t, n) {
  return /* @__PURE__ */ r(Tr, { initial: t, children: /* @__PURE__ */ r(Dr, { ref: n }) });
});
export {
  qr as Scheduler
};
