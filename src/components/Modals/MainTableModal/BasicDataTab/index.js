import React from "react";
import styled from "styled-components";
import ModalImage from "react-modal-image";
// import Tooltip from "../../../Tooltip";
import ReactTooltip from "../../../Tooltip/ReactTooltip";

// import CodeImage from "../../../../assets/images/Catalog/image-code.svg";
// import TImage from "../../../../assets/images/Catalog/image-t.svg";

export default function BasicDataTab({ data }) {
  return (
    <RootWrapper>
      <FormWrapper>
        <TextBlock>
          <TextWrapper>
            <TextLabel>objabbr</TextLabel>
            <Text>{data?.objabbr}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>blsurfpgfr</TextLabel>
            <Text>{data?.blsurfpgfr}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>blcoord</TextLabel>
            <Text>{data?.blcoord}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>objlc</TextLabel>
            <Text>{data?.Object?.objlc}</Text>
          </TextWrapper>
        </TextBlock>
        <ImageWrapper>
          {data?.blimage1 && (
            <ImageWrapper
              data-for="blimage1"
              data-tip="blimage1"
              data-iscapture="true"
            >
              <ModalImage
                small={data?.blimage1?.ThumbPubLink}
                large={data?.blimage1?.OrgPubLink}
                alt={data?.blimage1?.FileName}
              />
              <ReactTooltip id="blimage1" place="top" />
              {/* <Tooltip left="30%" top="85%">
                {data?.blimage1?.OrgPubLink}
              </Tooltip> */}
            </ImageWrapper>
          )}
        </ImageWrapper>
      </FormWrapper>
      <FormWrapper>
        <TextBlock>
          <TextWrapper>
            <TextLabel>bllogosyll</TextLabel>
            <Text>{data?.bllogosyll}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>blmaya1</TextLabel>
            <Text>{data?.blmaya1}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>blengl</TextLabel>
            <Text>{data?.blengl}</Text>
          </TextWrapper>
          <TextWrapper>
            <TextLabel>blgraphcodes</TextLabel>
            <Text>{data?.blgraphcodes}</Text>
          </TextWrapper>
        </TextBlock>
        <ImageWrapper>
          {data?.blimage2 && (
            <ImageWrapper
              data-for="blimage2"
              data-tip="blimage2"
              data-iscapture="true"
            >
              <ModalImage
                small={data?.blimage2?.ThumbPubLink}
                large={data?.blimage2?.OrgPubLink}
                alt={data?.blimage2?.FileName}
              />
              <ReactTooltip id="blimage2" place="top" />
              {/* <Tooltip left="30%" top="85%">
                {data?.blimage2?.OrgPubLink}
              </Tooltip> */}
            </ImageWrapper>
          )}
        </ImageWrapper>
      </FormWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextBlock = styled.div`
  margin-right: 50px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const TextLabel = styled.label`
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  margin-right: 8px;
  width: 150px;
  text-align: right;
`;

const Text = styled.text`
  width: 320px;
  height: 24px;
  background: rgba(196, 196, 196, 0.29);
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 10px;

  &:focus {
    outline: none !important;
  }
`;

// const ImagesWrapper = styled.div`
//   border-radius: 4px;
// `;

// const ImageDataWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-bottom: 32px;
// `;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 210px;
  height: 210px;
  position: relative;
  border-radius: 8px;

  div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover span {
    visibility: visible;
  }

  img:not(#react-modal-image-img) {
    opacity: 0.89;
    max-width: 210px !important;
    max-height: 210px !important;
  }
`;

// const DataImage = styled.img`
//   opacity: 0.89;
//   border-radius: 4px;
//   width: 210px;
//   height: 210px;
// `;
