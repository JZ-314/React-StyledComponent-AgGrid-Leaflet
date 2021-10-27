/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../../Loader/ReactSpinner";
// import AgGrid from "../../../AgGrid";

import {
  fetchMainTextCitation,
  setMainTableParams,
} from "../../../../store/main/actions";
import { FETCH_MAIN_CITATION_SUCCESS } from "../../../../store/main/constants";

// const photoColumnDefs = [
//   {
//     headerName: "Credit",
//     field: "png1credit",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.png1credit }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
//   {
//     headerName: "Citation",
//     field: "png1citation",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.png1citation }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
// ];

// const drawingColumnDefs = [
//   {
//     headerName: "Credit",
//     field: "png2credit",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.png2credit }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
//   {
//     headerName: "Citation",
//     field: "png2citation",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.png2citation }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
// ];

// const imageColumnDefs = [
//   {
//     headerName: "Credit",
//     field: "objimgcredit",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.objimgcredit }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
//   {
//     headerName: "Citation",
//     field: "objimgcitation",
//     cellRendererFramework: (row) => {
//       const { data } = row;
//       return (
//         <>
//           <CellLineHeight />
//           <div dangerouslySetInnerHTML={{ __html: data?.objimgcitation }} />
//           <CellLineHeight />
//         </>
//       );
//     },
//   },
// ];

export default function TextCitationsTab({ data }) {
  const dispatch = useDispatch();
  const { objabbr } = data;

  const [isLoading, setIsLoading] = useState(true);
  const [citations, setCitations] = useState({
    drawingCredit: [],
    imageCredit: [],
    photoCredit: [],
    textCitations: [],
  });

  useEffect(() => {
    async function fetchData() {
      await dispatch(setMainTableParams({ actionType: "citation" }));
      const result = await dispatch(fetchMainTextCitation(objabbr));
      setIsLoading(false);

      if (result.type === FETCH_MAIN_CITATION_SUCCESS) {
        const { drawingCredit, imageCredit, photoCredit, textCitations } =
          result.payload.data;

        setCitations({
          drawingCredit,
          imageCredit,
          photoCredit,
          textCitations,
        });
      }
    }

    fetchData();
  }, [data]);

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <Block>
        <Title>Text citations:</Title>
        <TextList>
          {citations?.textCitations.map((text, index) => (
            <TextRow
              key={index}
              dangerouslySetInnerHTML={{ __html: text.objcitation }}
            />
          ))}
        </TextList>
      </Block>
      <Block>
        <Title>Photo credit:</Title>
        <Table>
          {citations?.photoCredit.map((text, index) => (
            <Tr>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.png1credit }}
                ></div>
              </Td>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.png1citation }}
                ></div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Block>
      <Block>
        <Title>Drawing credit:</Title>
        <Table>
          {citations?.drawingCredit.map((text, index) => (
            <Tr>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.png2credit }}
                ></div>
              </Td>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.png2citation }}
                ></div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Block>
      <Block>
        <Title>Object image credit:</Title>
        <Table>
          {citations?.imageCredit.map((text, index) => (
            <Tr>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.objimgcredit }}
                ></div>
              </Td>
              <Td>
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: text.objimgcitation }}
                ></div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Block>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  padding: 8px;
`;

const Block = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  margin-bottom: 7px;
`;

const TextList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #c4c4c4;
  border-bottom: none;
`;

const TextRow = styled.li`
  list-style-type: none;
  padding: 13px 7px;
  border-bottom: 1px solid #c4c4c4;
  font-size: 14px;
  line-height: 1.5;

  &:nth-child(even) {
    background: #fff;
  }

  &:nth-child(odd) {
    background: #f9f9f9;
  }
`;

// const CellLineHeight = styled.div`
//   height: 10px;
// `;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #c4c4c4;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const Tr = styled.tr``;
const Td = styled.td`
  width: 50%;
  font-size: 14px;
  line-height: 1.5;
`;
