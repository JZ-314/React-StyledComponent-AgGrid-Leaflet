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

import { TextData } from "../../../configs/fieldsConfig";

export default function TextsFields() {
  return (
    <RootWrapper>
      <Title>Descriptions of the fields</Title>
      <SubTitle>TEXTS</SubTitle>
      <FieldsTable>
        <Tbody>
          {TextData.map((data, index) => (
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
