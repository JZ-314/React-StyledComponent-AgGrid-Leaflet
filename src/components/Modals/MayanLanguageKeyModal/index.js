import React from "react";
import styled from "styled-components";

import { languages } from "../../../configs/languages";

export default function MayanLanguageKeyModal() {
  return (
    <ModalWrapper>
      {/* <Title>Mayan language key</Title> */}
      <LanguageWrapper>
        {languages.map((item, index) => (
          <LanguageText key={index}>{item.label}</LanguageText>
        ))}
      </LanguageWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 12px;
`;

// const Title = styled.div`
//   color: rgba(0, 0, 0, 0.48);
//   font-size: 18px;
//   margin-bottom: 12px;
// `;

const LanguageWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px 30px;
`;

const LanguageText = styled.div`
  color: #000000;
  font-size: 14px;
  display: list-item;
  list-style-type: disc;
  list-style-position: inside;
`;
