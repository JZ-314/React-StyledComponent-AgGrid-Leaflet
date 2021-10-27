import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1188px;
  margin: 0 auto;
  padding: 80px 24px 24px;
  text-align: center;
`;

const Headline = styled.h1`
  font-weight: bold;
`;

const Subhead = styled.h2``;

export default function PageNotFound() {
  return (
    <Wrapper>
      <Headline>SORRY, THAT PAGE DOESN’T EXIST!</Headline>
      <Subhead>WE COULDN&lsquo;T FIND THE PAGE YOU WERE LOOKING FOR.</Subhead>
      {/* <Button small to="/">
        To Discover
      </Button>
      <Button ghost small href="http://blackdove.zendesk.com">
        Get Help
      </Button> */}
    </Wrapper>
  );
}
