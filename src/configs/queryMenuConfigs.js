/* eslint-disable react/react-in-jsx-scope */
import styled from "styled-components";

const Icon = styled.i`
  color: #6b6a6acc;
`;

export const mainQueryMenu = [
  {
    id: "select",
    title: "Select",
    isDropdown: false,
    icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  // {
  //   id: "pre-select",
  //   title: "Pre-Select",
  //   isDropdown: true,
  //   icon: <Icon className="fas fa-caret-down"></Icon>,
  // },
  {
    id: "names",
    title: "Names",
    isDropdown: true,
    icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "word-list",
    title: "Word List",
    isDropdown: true,
    icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "save-search",
    title: "Save Search",
    isDropdown: false,
    icon: <Icon className="fas fa-save"></Icon>,
  },
  {
    id: "download",
    title: "Download",
    isDropdown: false,
    // icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "show-hide",
    title: "Show/Hide",
    isDropdown: false,
    icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "refresh",
    title: "Refresh",
    isDropdown: false,
  },
];

export const categoryQueryMenu = [
  {
    id: "select",
    title: "Select",
    isDropdown: false,
    icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "save-search",
    title: "Save Search",
    isDropdown: false,
    icon: <Icon className="fas fa-save"></Icon>,
  },
  {
    id: "download",
    title: "Download",
    isDropdown: false,
    // icon: <Icon className="fas fa-caret-down"></Icon>,
  },
  {
    id: "refresh",
    title: "Refresh",
    isDropdown: false,
  },
];
