import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Flex, Box } from "reflexbox";
import ModalImage from "react-modal-image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ReactTooltip from "../../../Tooltip/ReactTooltip";
import ReactSpinner from "../../../Loader/ReactSpinner";

// import CodeImage from "../../../../assets/images/Catalog/image-code.svg";
// import TImage from "../../../../assets/images/Catalog/image-t.svg";

import MainButton from "../../../Buttons/MainButton";
// import Tooltip from "../../../Tooltip";
import {
  fetchMainCatalog,
  setCatalogParams,
} from "../../../../store/catalog/actions";
import { setSearchParams } from "../../../../store/search/actions";

export default function DataTab({ data, searchType, closeModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [wrapTarget, setWrapTarget] = useState({
    name: "",
    innerText: "",
  });
  const [isMoreImage, setIsMoreImage] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const getTextWidth = (e) => {
    setWrapTarget({
      name: e.target.getAttribute("name"),
      innerText: e.target.innerText,
    });
  };

  const handleClickCatalogButton = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const landingParams = localStorage.getItem("landingParams");
    if (landingParams) {
      const landingSearchType = JSON.parse(landingParams).type;

      let type = "";
      if (landingSearchType.includes("classic")) {
        type = "classic";
      } else if (landingSearchType.includes("codical")) {
        type = "codical";
      }

      const payload = {
        type,
        limit: 50,
        offset: 0,
      };

      localStorage.setItem("catalogParams", JSON.stringify(payload));

      if (landingSearchType.includes("graphemes")) {
        const payload = {
          actionType: "main-catalog",
          type,
          limit: 50,
          offset: 0,
          direction: "DESC",
          orderkey: "codeid",
        };

        await dispatch(setCatalogParams(payload));
        await dispatch(fetchMainCatalog(data.blsort));
      }

      await dispatch(setSearchParams(null));
      setIsLoading(false);

      history.push("/catalog");
    } else {
      history.push("/landing");
    }
    closeModal();
  };

  return (
    <RootWrapper searchType={searchType}>
      <ReactSpinner loading={isLoading} />
      <TextFormWrapper>
        <Flex>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>region orig</TextLabel>
              <Text
                name="region_orig"
                width="300px"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "region_orig"}
                isInnerText={wrapTarget.innerText === ""}
              >
                {data?.Object?.Origin?.regionorigin}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>code orig</TextLabel>
              <TextWrapper>
                <Text
                  name="code_orig"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "code_orig"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.Origin?.codeorigin}
                </Text>
                <TextLabel ml="8px" width="100%">
                  site orig
                </TextLabel>
                <Text
                  name="site_orig"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "site_orig"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.Origin?.siteorigin}
                </Text>
              </TextWrapper>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>objabbr</TextLabel>
              <TextWrapper>
                <Text
                  name="objabbr"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "objabbr"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.objabbr}
                </Text>
                <TextLabel ml="8px" width="100%">
                  type
                </TextLabel>
                <Text
                  name="type"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "type"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.objclass}
                </Text>
              </TextWrapper>
            </TextLabelWrapper>
          </Box>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>region dest</TextLabel>
              <Text
                name="region_dest"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "region_dest"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.Destin?.regiondestin}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>code dest</TextLabel>
              <TextWrapper>
                <Text
                  name="code_dest"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "code_dest"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.Destin?.codedestin}
                </Text>
                <TextLabel ml="8px" width="100%">
                  site dest
                </TextLabel>
                <Text
                  name="site_dest"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "site_dest"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.Destin?.sitedestin}
                </Text>
              </TextWrapper>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>material</TextLabel>
              <TextWrapper>
                <Text
                  name="material"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "material"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.objmaterial}
                </Text>
                <TextLabel ml="8px" width="100%">
                  technique
                </TextLabel>
                <Text
                  name="technique"
                  onClick={getTextWidth}
                  isWrap={wrapTarget.name === "technique"}
                  isInnerText={wrapTarget.innerText === ""}
                  width="100%"
                >
                  {data?.Object?.objtechnique}
                </Text>
              </TextWrapper>
            </TextLabelWrapper>
          </Box>
        </Flex>
        <Flex>
          <Box width={1}>
            <TextLabelWrapper>
              <TextLabel>object</TextLabel>
              <Text
                name="object"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "object"}
                isInnerText={wrapTarget.innerText === ""}
                width="740px"
              >
                {data?.Object?.objname}
              </Text>
            </TextLabelWrapper>
          </Box>
        </Flex>
        <Flex>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>str/alman</TextLabel>
              <Text
                name="str/alman"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "str/alman"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.objstralmpg}
              </Text>
            </TextLabelWrapper>
          </Box>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel fullWidth>orientation/frame</TextLabel>
              <Text
                name="orientation/frame"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "orientation/frame"}
                isInnerText={wrapTarget.innerText === ""}
                width="220px"
              >
                {data?.objorienfr}
              </Text>
            </TextLabelWrapper>
          </Box>
        </Flex>
        <Flex>
          <Box width={1}>
            <TextLabelWrapper>
              <TextLabel>coll</TextLabel>
              <Text
                name="coll"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "coll"}
                isInnerText={wrapTarget.innerText === ""}
                width="490px"
                margin="0 10px 0 0"
              >
                {data?.Object?.Museum?.musname &&
                  data?.Object?.Museum?.musname !== "" &&
                  `${data?.Object?.Museum?.musname}, `}
                {data?.Object?.Museum?.muscitystate &&
                  data?.Object?.Museum?.muscitystate !== "" &&
                  `${data?.Object?.Museum?.muscitystate}, `}
                {data?.Object?.Museum?.muscountry &&
                  data?.Object?.Museum?.muscountry !== "" &&
                  `${data?.Object?.Museum?.muscountry}`}
              </Text>
              <Text
                name="coll-2"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "coll-2"}
                isInnerText={wrapTarget.innerText === ""}
                text="type"
                width="220px"
              >
                {data?.Object?.locaccession}
              </Text>
            </TextLabelWrapper>
          </Box>
        </Flex>
        <Line />
        <Flex>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>coordinate</TextLabel>
              <Text
                name="blcoord"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blcoord"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blcoord}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl logosyll</TextLabel>
              <Text
                name="bllogosyll"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "bllogosyll"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.bllogosyll}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl hyphen</TextLabel>
              <Text
                name="blhyphen"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blhyphen"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blhyphen}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl transcr 1</TextLabel>
              <Text
                name="blmaya1"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blmaya1"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blmaya1}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl transcr 2</TextLabel>
              <Text
                name="blmaya2"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blmaya2"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blmaya2}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl Engl</TextLabel>
              <Text
                name="blengl"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blengl"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blengl}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl codes</TextLabel>
              <Text
                name="blgraphcodes"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blgraphcodes"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blgraphcodes}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>semantic</TextLabel>
              <Text
                name="blsem"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blsem"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blsem}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>bl notes</TextLabel>
              <Text
                name="blnotes"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blnotes"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blnotes}
              </Text>
            </TextLabelWrapper>
          </Box>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>blsurfpgfr</TextLabel>
              <Text
                name="blsurfpgfr"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blsurfpgfr"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blsurfpgfr}
              </Text>
            </TextLabelWrapper>
            {searchType.includes("graphemes") && (
              <>
                <TextLabelWrapper>
                  <TextLabel>gr logosyll</TextLabel>
                  <Text
                    name="grlogosyll"
                    onClick={getTextWidth}
                    isWrap={wrapTarget.name === "grlogosyll"}
                    isInnerText={wrapTarget.innerText === ""}
                    width="300px"
                  >
                    {data?.grlogosyll}
                  </Text>
                </TextLabelWrapper>
                <TextLabelWrapper>
                  <TextLabel>gr hyphen</TextLabel>
                  <Text
                    name="grhyphen"
                    onClick={getTextWidth}
                    isWrap={wrapTarget.name === "grhyphen"}
                    isInnerText={wrapTarget.innerText === ""}
                    width="300px"
                  >
                    {data?.grhyphen}
                  </Text>
                </TextLabelWrapper>
                <TextLabelWrapper>
                  <TextLabel>gr transcr</TextLabel>
                  <Text
                    name="grmaya"
                    onClick={getTextWidth}
                    isWrap={wrapTarget.name === "grmaya"}
                    isInnerText={wrapTarget.innerText === ""}
                    width="300px"
                  >
                    {data?.grmaya}
                  </Text>
                </TextLabelWrapper>
                <TextLabelWrapper>
                  <TextLabel>gr Engl</TextLabel>
                  <Text
                    name="grengl"
                    onClick={getTextWidth}
                    isWrap={wrapTarget.name === "grengl"}
                    isInnerText={wrapTarget.innerText === ""}
                    width="300px"
                  >
                    {data?.grengl}
                  </Text>
                </TextLabelWrapper>
                <TextLabelWrapper>
                  <TextLabel>gr code</TextLabel>
                  <Text
                    name="grgraphcode"
                    onClick={getTextWidth}
                    isWrap={wrapTarget.name === "grgraphcode"}
                    isInnerText={wrapTarget.innerText === ""}
                    width="300px"
                  >
                    {data?.grgraphcode}
                  </Text>
                </TextLabelWrapper>
                <ButtonWrapper>
                  {/* <MainButton
                    color="#FFFFFF"
                    size="18px"
                    bgColor="rgba(0, 0, 0, 0.88)"
                    padding="3px 16px"
                  >
                    Find Proper Name
                  </MainButton> */}
                  <MainButton
                    color="#448344"
                    size="16px"
                    bgColor="#EEEEEE"
                    padding="6px"
                    onClick={handleClickCatalogButton}
                  >
                    Search Catalog
                  </MainButton>
                </ButtonWrapper>
              </>
            )}
            <TextLabelWrapper>
              <TextLabel>scribe</TextLabel>
              <Text
                name="scribe"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "scribe"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.scribe?.map((item, index) => (
                  <Fragment key={index}>
                    {item.Name.propname === "" ? "" : `${item.Name.propname}, `}
                    {item.Name.pnsite === "" ? "" : `${item.Name.pnsite}, `}
                  </Fragment>
                ))}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>image notes</TextLabel>
              <Text
                name="blimagenotes"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blimagenotes"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blimagenotes}
              </Text>
            </TextLabelWrapper>
          </Box>
        </Flex>
        <Line />
        <Flex>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>evcal</TextLabel>
              <Text
                name="blevcal"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blevcal"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blevcal}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>evlc</TextLabel>
              <Text
                name="blevlc"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blevlc"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blevlc}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>ev260</TextLabel>
              <Text
                name="blev260"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blev260"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blev260}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>ev365</TextLabel>
              <Text
                name="blev365"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "blev365"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.blev365}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>evGreg</TextLabel>
              <Text
                name="evGreg"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "evGreg"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Bllcgreg?.blgreg}
              </Text>
            </TextLabelWrapper>
          </Box>
          <Box width={[1, 1 / 2, 1 / 2]}>
            <TextLabelWrapper>
              <TextLabel>objcal</TextLabel>
              <Text
                name="objcal"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "objcal"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.objcal}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>objlc</TextLabel>
              <Text
                name="objlc"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "objlc"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.objlc}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>obj260</TextLabel>
              <Text
                name="obj260"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "obj260"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.obj260}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>obj365</TextLabel>
              <Text
                name="obj365"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "obj365"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.obj365}
              </Text>
            </TextLabelWrapper>
            <TextLabelWrapper>
              <TextLabel>objGreg</TextLabel>
              <Text
                name="objGreg"
                onClick={getTextWidth}
                isWrap={wrapTarget.name === "objGreg"}
                isInnerText={wrapTarget.innerText === ""}
                width="300px"
              >
                {data?.Object?.Objlcgreg?.objgreg}
              </Text>
            </TextLabelWrapper>
          </Box>
        </Flex>
      </TextFormWrapper>
      <ImagesWrapper>
        <ImagesContainer>
          <ImageWrapper>
            {data?.blimage1 && (
              <ImageWrapper
                data-for="blimage1"
                data-tip="blimage1"
                data-iscapture="true"
              >
                <ModalImage
                  small={data?.blimage1?.ThumbPubLink}
                  large={data?.blimage1?.ThumbPubLink}
                  alt={data?.blimage1?.FileName}
                />
                <ReactTooltip id="blimage1" />
              </ImageWrapper>
            )}
          </ImageWrapper>
          <ImageWrapper>
            {data?.blimage2 && (
              <ImageWrapper
                data-for="blimage2"
                data-tip="blimage2"
                data-iscapture="true"
              >
                <ModalImage
                  small={data?.blimage2?.ThumbPubLink}
                  large={data?.blimage2?.ThumbPubLink}
                  alt={data?.blimage2?.FileName}
                />
                <ReactTooltip id="blimage2" place="top" />
              </ImageWrapper>
            )}
          </ImageWrapper>
          {data?.imgfr ? (
            <ImageWrapper
              data-for="imgfr"
              data-tip="imgfr"
              data-iscapture="true"
            >
              <ModalImage
                small={data?.imgfr?.ThumbPubLink}
                large={data?.imgfr?.ThumbPubLink}
                alt={data?.imgfr?.FileName}
              />
              <ReactTooltip id="imgfr" place="top" />
            </ImageWrapper>
          ) : (
            <>
              {data?.Object &&
                data?.Object.objImages &&
                data?.Object?.objImages?.length !== 0 && (
                  <ImageWrapper
                    data-for="objImage1"
                    data-tip="objImage1"
                    data-iscapture="true"
                  >
                    <ModalImage
                      small={data?.Object?.objImages[0]?.ThumbPubLink}
                      large={data?.Object?.objImages[0]?.OrgPubLink}
                      alt={data?.Object?.objImages[0]?.FileName}
                    />
                    <ReactTooltip id="objImage1" place="top" />
                  </ImageWrapper>
                )}
            </>
          )}
          {isMoreImage && (
            <Lightbox
              mainSrc={data?.Object?.objImages[photoIndex]?.OrgPubLink}
              nextSrc={
                data?.Object?.objImages[
                  (photoIndex + 1) % data?.Object?.objImages.length
                ]?.OrgPubLink
              }
              prevSrc={
                data?.Object?.objImages[
                  (photoIndex + data?.Object?.objImages.length - 1) %
                    data?.Object?.objImages.length
                ]?.OrgPubLink
              }
              onCloseRequest={() => setIsMoreImage(false)}
              onMovePrevRequest={() =>
                setPhotoIndex(photoIndex + data?.Object?.objImages.length - 1) %
                data?.Object?.objImages.length
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % data?.Object?.objImages.length)
              }
            />
          )}
        </ImagesContainer>
        {data?.Object &&
          data?.Object.objImages &&
          data?.Object?.objImages?.length !== 0 && (
            <MainButton
              color="#FFFFFF"
              size="18px"
              bgColor="rgba(0, 0, 0, 0.88)"
              padding="4px 16px"
              onClick={() => setIsMoreImage(true)}
            >
              More Images
            </MainButton>
          )}
      </ImagesWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 30px 36px;
`;

const TextFormWrapper = styled.div``;

const TextLabelWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-left: ${({ ml }) => ml};
  margin-bottom: 8px;
`;

const TextLabel = styled.label`
  width: ${({ fullWidth, width }) =>
    fullWidth ? "auto" : width ? width : "110px"};
  color: #5d5d5d;
  font-size: 18px;
  margin-right: 8px;
  ${"" /* margin-left: ${({ ml }) => ml}; */}
  text-align: right;
  vertical-align: top;
  word-wrap: break-word;
`;

const TextWrapper = styled.div`
  width: 320px;
  display: flex;
  align-items: flex-start;
`;

const Text = styled.span`
  background: rgba(196, 196, 196, 0.29);
  border-radius: 4px;
  margin: ${({ margin }) => margin};
  padding: ${({ isWrap }) => (isWrap ? "2px 10px" : "0px 10px")};
  border: none;
  width: ${({ width, fullWidth }) => (fullWidth ? "auto" : width)};
  height: ${({ isWrap, isInnerText }) =>
    isWrap && !isInnerText ? "auto" : "24px"};
  word-wrap: ${({ isWrap }) => (isWrap ? "break-word" : "normal")};
  white-space: ${({ isWrap }) => (isWrap ? "normal" : "nowrap")};
  overflow: ${({ isWrap }) => (isWrap ? "normal" : "hidden")};
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  button:first-child {
    padding-left: 9px;
    padding-right: 9px;
    margin-right: 55px;
  }
`;

const Line = styled.div`
  height: 1px;
  background: #c4c4c4;
  margin: 16px 0;
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
`;

const ImagesContainer = styled.div`
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 170px;
  height: 170px;
  margin-bottom: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover span {
    visibility: visible;
  }

  img:not(#react-modal-image-img) {
    max-width: 170px !important;
    max-height: 170px !important;
  }
`;

// const Image = styled.img`
//   width: 170px;
//   height: 170px;
//   margin-bottom: 8px;
//   border-radius: 4px;
//   object-fit: cover;
// `;

// const ImageStyle = {
//   opacity: 0.89,
//   borderRadius: 4,
//   width: 210,
//   height: 210,
// };
