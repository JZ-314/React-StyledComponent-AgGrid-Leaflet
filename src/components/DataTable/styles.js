import { defaultThemes } from "./themes";

export const customStyles = {
  table: {
    style: {
      border: "1px solid #C4C5C8",
      borderRadius: 2,
      background: "#FAFAFA",
      paddingBottom: 0,
      marginBottom: -250,
    },
  },
  header: {
    style: {
      fontSize: "22px",
      color: "rgba(0, 0, 0, 0.8)",
      // color: theme.text.primary,
      // backgroundColor: theme.background.default,
      minHeight: "56px",
      paddingLeft: "16px",
      paddingRight: "8px",
    },
  },
  headRow: {
    style: {
      background: "#F5F5F5",
      borderBottom: "1px solid #C4C5C8",
      minHeight: "40px",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  headCells: {
    style: {
      fontSize: 14,
      fontWeight: "600 !important",
      color: "rgba(0, 0, 0, 0.8)",

      "&:hover": {
        color: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  rows: {
    style: {
      fontSize: "13px",
      color: defaultThemes.text.primary,
      backgroundColor: defaultThemes.background.default,
      minHeight: "32px",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: defaultThemes.divider.default,
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      "&:nth-of-type(n)": {
        color: defaultThemes.selected.text,
        backgroundColor: defaultThemes.selected.default,
        borderBottomColor: defaultThemes.background.default,
      },
    },
    highlightOnHoverStyle: {
      color: defaultThemes.highlightOnHover.text,
      backgroundColor: defaultThemes.highlightOnHover.default,
      transitionDuration: "0.15s",
      transitionProperty: "background-color",
      borderBottomColor: defaultThemes.background.default,
      outlineStyle: "solid",
      outlineWidth: "1px",
      outlineColor: defaultThemes.background.default,
    },
    stripedStyle: {
      color: defaultThemes.striped.text,
      backgroundColor: defaultThemes.striped.default,
    },
  },
  cells: {
    style: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  pagination: {
    style: {
      color: defaultThemes.text.secondary,
      fontSize: "13px",
      minHeight: "56px",
      backgroundColor: "#FAFAFA",
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: defaultThemes.button.default,
      fill: defaultThemes.button.default,
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: defaultThemes.button.disabled,
        fill: defaultThemes.button.disabled,
      },
      "&:hover:not(:disabled)": {
        backgroundColor: defaultThemes.button.hover,
      },
      "&:focus": {
        outline: "none",
        backgroundColor: defaultThemes.button.focus,
      },
    },
  },
};
