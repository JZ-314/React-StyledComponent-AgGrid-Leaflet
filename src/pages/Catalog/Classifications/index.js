import React from "react";
import styled from "styled-components";

import Tooltip from "../../../components/Tooltip";

import IconQuestionCircle from "../../../assets/images/icons/icon-question-circle.svg";

export default function Classifications({ data }) {
  return (
    <RootWrapper>
      <InputWrapper>
        <InputLabel>Z#</InputLabel>
        <Input type="text" defaultValue={data?.zno} />
        <IconWrapper>
          <IconImage src={IconQuestionCircle} />
          <Tooltip top="-200%" left="150%" fontSize="16px" width="550px">
            <TooltipTitle>Zimmermann, Günter</TooltipTitle>
            1956{" "}
            <ItalicText>
              Die Hieroglyphen der Maya-Handschriften.
            </ItalicText>{" "}
            Abhandlungen aus dem Gebiet der Auslandskunde, Band 62—Reihe B
            (Völkerkunde, Kuturgeschichte und Sprachen Band 34). Hamburg:
            Universität Hamburg. 
          </Tooltip>
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>K1999#</InputLabel>
        <Input type="text" defaultValue={data?.k1999} />
        <IconWrapper>
          <IconImage src={IconQuestionCircle} />
          <Tooltip top="-200%" left="150%" fontSize="16px" width="550px">
            <TooltipTitle>Knorozov, Yuri V.</TooltipTitle>
            1967
            <ItalicText>
              Selected Chapters from The Writing of the Maya Indians.
            </ItalicText>
            <br />
            Russian Translation Series 6. Cambridge, Massachusetts: Harvard
            University. 
          </Tooltip>
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>K#</InputLabel>
        <Input type="text" defaultValue={data?.kno} />
        <IconWrapper>
          <IconImage src={IconQuestionCircle} />
          <Tooltip top="-200%" left="150%" fontSize="16px" width="550px">
            <TooltipTitle>Knorozov, Yuri V. </TooltipTitle>
            1999{" "}
            <ItalicText>
              Compendio Xcaret de la escritura jeroglífica Maya descifrada.
            </ItalicText>
            <br />
            vols. 1-3. Chetumal. Quintana Roo: Universidad de Quintana
            Roo/Promotora Xcaret. 
          </Tooltip>
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>G#</InputLabel>
        <Input type="text" defaultValue={data?.gno} />
        <IconWrapper>
          <IconImage src={IconQuestionCircle} />
          <Tooltip top="-200%" left="150%" fontSize="16px" width="550px">
            <TooltipTitle>Gates, William E.</TooltipTitle>
            1931{" "}
            <ItalicText>
              An Outline Dictionary of Maya Glyphs: With a Concordance and
              Analysis of Their Relationships.{" "}
            </ItalicText>
            Baltimore: Johns Hopkins Press.
          </Tooltip>
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputLabel>Former MHD code</InputLabel>
        <Input type="text" defaultValue={data?.code2003} />
        <IconWrapper>
          <IconImage src={IconQuestionCircle} />
          <Tooltip top="-200%" left="110%" fontSize="16px" width="565px">
            <TooltipTitle>Macri, Martha J.; Vail, Gabrielle </TooltipTitle>
            2009{" "}
            <ItalicText>
              The New Catalog of Maya Hieroglyphs, Volume 2: The Codical Texts.
            </ItalicText>
            <br />
            Norman: University of Oklahoma Press.
          </Tooltip>
        </IconWrapper>
      </InputWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 65px;
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
`;

const InputLabel = styled.label`
  width: 180px;
  text-align: right;
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  font-weight: 500;
  margin-right: 8px;
`;

const Input = styled.input`
  width: 360px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 9px;
  padding: 5px 10px;

  &:focus {
    outline: none !important;
    ${"" /* border: none; */}
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
  }
`;
const IconImage = styled.img`
  width: 20px;
`;

const TooltipTitle = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
  font-style: normal;
`;

const ItalicText = styled.i``;
