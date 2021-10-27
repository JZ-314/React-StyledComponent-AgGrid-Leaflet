import React from "react";

import {
  RootWrapper,
  Title,
  SubTitle,
  FieldsTable,
  Tbody,
  Tr,
  Td,
} from "../styles";

import { CatalogData } from "../../../configs/fieldsConfig";

export default function Catalog() {
  return (
    <RootWrapper>
      <Title>Descriptions of the fields</Title>
      <SubTitle>Catalog</SubTitle>
      <FieldsTable>
        <Tbody>
          {CatalogData.map((data, index) => (
            <Tr key={index}>
              <Td>{data.label}</Td>
              <Td>{data.content}</Td>
            </Tr>
          ))}
        </Tbody>
      </FieldsTable>
    </RootWrapper>
  );
}
