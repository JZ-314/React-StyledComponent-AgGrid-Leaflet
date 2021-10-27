/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import styled from "styled-components";

export const SearchQueryList = [
  {
    value: "classic-block",
    label: "Classic - Blocks",
  },
  {
    value: "classic-graphemes",
    label: "Classic - Graphemes",
  },
  {
    value: "codical-block",
    label: "Codical - Blocks",
  },
  {
    value: "codical-graphemes",
    label: "Codical - Graphemes",
  },
  {
    value: "all-block",
    label: "All - Blocks",
  },
  {
    value: "all-graphemes",
    label: "All - Graphemes",
  },
  {
    value: "catalog",
    label: "Catalog",
  },
];

// Select

export const SelectTitleOption = [
  {
    value: "objabbr",
    label: "objabbr",
  },
  {
    value: "objname",
    label: "objname",
  },
  {
    value: "objstralmpg",
    label: "objstralmpg",
  },
  {
    value: "objclass",
    label: "objclass",
  },
  {
    value: "objmaterial",
    label: "objmaterial",
  },
  {
    value: "objtech",
    label: "objtech",
  },
  {
    value: "objorienfr",
    label: "objorienfr",
  },
  {
    value: "objregorig",
    label: "objregorig",
  },
  {
    value: "objregdest",
    label: "objregdest",
  },
  {
    value: "objcodeorig",
    label: "objcodeorig",
  },
  {
    value: "objcodedest",
    label: "objcodedest",
  },
  {
    value: "objsiteorig",
    label: "objsiteorig",
  },
  {
    value: "objsitedest",
    label: "objsitedest",
  },
  {
    value: "objlocabbr",
    label: "objlocabbr",
  },
  {
    value: "objloc",
    label: "objloc",
  },
  {
    value: "objacc",
    label: "objacc",
  },
  {
    value: "objcal",
    label: "objcal",
  },
  {
    value: "objlc",
    label: "objlc",
  },
  {
    value: "objgreg",
    label: "objgreg",
  },
  {
    value: "obj260",
    label: "obj260",
  },
  {
    value: "obj365",
    label: "obj365",
  },
  {
    value: "objhell",
    label: "objhell",
  },
  {
    value: "objkerr",
    label: "objkerr",
  },
  {
    value: "objms",
    label: "objms",
  },
  {
    value: "blsurfpgfr",
    label: "blsurfpgfr",
  },
  {
    value: "blcoord",
    label: "blcoord",
  },
  {
    value: "bllogosyll",
    label: "bllogosyll",
  },
  {
    value: "blhyphen",
    label: "blhyphen",
  },
  {
    value: "blmaya1",
    label: "blmaya1",
  },
  {
    value: "blmaya2",
    label: "blmaya2",
  },
  {
    value: "blengl",
    label: "blengl",
  },
  {
    value: "blcodes",
    label: "blcodes",
  },
  {
    value: "blsem",
    label: "blsem",
  },
  {
    value: "blevcal",
    label: "blevcal",
  },
  {
    value: "blevlc",
    label: "blevlc",
  },
  {
    value: "blgreg",
    label: "blgreg",
  },
  {
    value: "blev260",
    label: "blev260",
  },
  {
    value: "blev365",
    label: "blev365",
  },
  {
    value: "grlogosyll",
    label: "grlogosyll",
  },
  {
    value: "grhyphen",
    label: "grhyphen",
  },
  {
    value: "grmaya",
    label: "grmaya",
  },
  {
    value: "grengl",
    label: "grengl",
  },
  {
    value: "graphcode",
    label: "graphcode",
  },
];

export const SelectOperatorOptions = [
  {
    value: "contains",
    label: "Contains",
  },
  {
    value: "does_not_contain",
    label: "Does not contain",
  },
  {
    value: "begins_with",
    label: "Begins with",
  },
  {
    value: "ends_with",
    label: "Ends with",
  },
  {
    value: "equal_to",
    label: "Equal to",
  },
  {
    value: "not_equal_to",
    label: "Not equal to",
  },
  {
    value: "not_empty",
    label: "Not empty",
  },
  {
    value: "empty",
    label: "Empty",
  },
  {
    value: "match_exact_case",
    label: "Matches exact case",
  },
  {
    value: "number_of_words_is_between",
    label: "Number of words is between",
  },
];

export const SelectCatalogColumnOptions = [
  {
    value: "catcode",
    label: "catcode",
  },
  {
    value: "catcodem",
    label: "catcodem",
  },
  {
    value: "catsubsort",
    label: "catsubsort",
  },
  {
    value: "catcode2009",
    label: "catcode2009",
  },
  {
    value: "cattno",
    label: "cattno",
  },
  {
    value: "catpicture",
    label: "catpicture",
  },
  {
    value: "cattech",
    label: "cattech",
  },
  {
    value: "catdistr",
    label: "catdistr",
  },
  {
    value: "catvol",
    label: "catvol",
  },
  {
    value: "catusage",
    label: "catusage",
  },
  {
    value: "catlogo",
    label: "catlogo",
  },
  {
    value: "catlogocvc",
    label: "catlogocvc",
  },
  {
    value: "catengl",
    label: "catengl",
  },
  {
    value: "catwordclass",
    label: "catwordclass",
  },
  {
    value: "catsyll",
    label: "catsyll",
  },
  {
    value: "catcalendrical",
    label: "catcalendrical",
  },
];

// Pre-Select
export const preSelectMenu = [
  {
    title: "Blocks",
    options: [
      {
        value: "blocks_provenienced_monuments",
        label: "Provenienced monuments",
        isSubMenu: false,
      },
      {
        value: "blocks_provenienced_objects",
        label: "Provenienced objects",
        isSubMenu: false,
      },
      {
        value: "blocks_secure_object_date",
        label: "Secure object date",
        isSubMenu: false,
      },
      {
        value: "blocks_semantic",
        label: "Semantic",
        isSubMenu: true,
        subMenu: [
          { label: "260 cycle" },
          { label: "365 cycle" },
          { label: "819-day count" },
          { label: "accession" },
          { label: "agency" },
          { label: "agentive" },
          { label: "animal" },
          { label: "augury" },
          { label: "child/father" },
          { label: "child/mother" },
          { label: "cumulative total" },
          { label: "deity name" },
          { label: "directional" },
          { label: "distance number" },
          { label: "dynastic title" },
          { label: "emblem glyph" },
          { label: "long count" },
          { label: "numeral classifier" },
          { label: "object reference" },
          { label: "period ending expression" },
          { label: "personal name" },
          { label: "PSS dedication verb" },
          { label: "PSS initial sign" },
          { label: "relationship" },
          { label: "site title" },
          { label: "structure name" },
          { label: "title" },
          { label: "toponym" },
        ],
      },
    ],
  },
  {
    title: "Objects",
    options: [
      {
        value: "objects_all_objects",
        label: "All objects",
        isSubMenu: false,
      },
      {
        value: "objects_provenienced_monuments",
        label: "Provenienced monuments",
        isSubMenu: false,
      },
      {
        value: "objects_provenienced_objects",
        label: "Provenienced objects",
        isSubMenu: false,
      },
      {
        value: "objects_secure_object_date",
        label: "Secure object date",
        isSubMenu: false,
      },
    ],
  },
];

// Show/Hide
export const ShowHideOptions = [
  {
    headerName: "blsort",
    isChecked: true,
    field: "blsort",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blsort}
          <CellLineHeight />
        </span>
      );
    },
  },
  // {
  //   headerName: "blimage1 [thumbnail]",
  //   field: "blimage1",
  //   cell: (row) => (
  //     <span>{row["blimage1"] ? row["blimage1"].ThumbFileKey : ""}</span>
  //   ),
  //   sortable: true,
  //   isChecked: false,
  // },
  // {
  //   headerName: "blimage2 [thumbnail]",
  //   isChecked: false,
  //   field: "blimage2",
  //   cell: (row) => (
  //     <span>{row["blimage2"] ? row["blimage2"].ThumbFileKey : ""}</span>
  //   ),
  //   sortable: true,
  // },
  {
    headerName: "objabbr",
    isChecked: true,
    field: "objabbr",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.objabbr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objstralmpg",
    isChecked: false,
    field: "objstralmpg",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.objstralmpg}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objorienfr",
    isChecked: false,
    field: "objorienfr",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.objorienfr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blsurfpgfr",
    isChecked: true,
    field: "blsurfpgfr",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blsurfpgfr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objclass",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objclass}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objname",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objname}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "locaccession",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.locaccession}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objtechnique",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objtechnique}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objmaterial",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objmaterial}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objsitecodeorigin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objsitecodeorigin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objsiteorigin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.Origin?.siteorigin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objsitecodedestin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objsitecodedestin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objsitedestin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.Origin?.sitedestin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objregionorigin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.Origin?.regionorigin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objregiondestin",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.Destin?.regiondestin}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objhell",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objhell}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objkerr",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objkerr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objms",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objms}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objgreg",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.Objlcgreg?.objgreg}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objcal",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objcal}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objlc",
    isChecked: true,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.objlc}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "obj260",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.obj260}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "obj365",
    isChecked: false,
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data.Object?.obj365}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blcoord",
    isChecked: true,
    field: "blcoord",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blcoord}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "bllogosyll",
    isChecked: true,
    field: "bllogosyll",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.bllogosyll}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blhyphen",
    isChecked: false,
    field: "blhyphen",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blhyphen}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blmaya1",
    isChecked: true,
    field: "blmaya1",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blmaya1}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blmaya2",
    isChecked: false,
    field: "blmaya2",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blmaya2}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blengl",
    isChecked: true,
    field: "blengl",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blengl}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blgraphcodes",
    isChecked: true,
    field: "blgraphcodes",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blgraphcodes}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blgreg",
    isChecked: false,
    field: "blgreg",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.Bllcgreg?.blgreg}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blevcal",
    isChecked: false,
    field: "blevcal",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blevcal}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blevlc",
    isChecked: false,
    field: "blevlc",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blevlc}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blev260",
    isChecked: false,
    field: "blev260",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blev260}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blev365",
    isChecked: false,
    field: "blev365",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blev365}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blsem",
    isChecked: false,
    field: "blsem",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blsem}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "grlogosyll",
    isChecked: false,
    isGrapheme: true,
    field: "grlogosyll",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.grlogosyll}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "grhyphen",
    isChecked: false,
    isGrapheme: true,
    field: "grhyphen",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.grhyphen}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "grmaya",
    isChecked: false,
    isGrapheme: true,
    field: "grmaya",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.grmaya}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "grengl",
    isChecked: false,
    isGrapheme: true,
    field: "grengl",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.grengl}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "grgraphcode",
    isChecked: false,
    isGrapheme: true,
    field: "grgraphcode",
    sortable: true,
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.grgraphcode}
          <CellLineHeight />
        </span>
      );
    },
  },
];

const CellLineHeight = styled.div`
  height: 10px;
`;
