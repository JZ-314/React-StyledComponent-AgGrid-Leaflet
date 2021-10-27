import React from "react";
import styled from "styled-components";
import Collapsible from "react-collapsible";

const ReactCollapsible = ({ title, children }) => {
  const Trigger = () => (
    <TriggerWrapper>
      <TriggerTitle>{title}</TriggerTitle>
      <TriggerIcon className="fas fa-caret-down" />
    </TriggerWrapper>
  );

  return (
    <CollapsibleWrapper>
      <Collapsible trigger={<Trigger />} triggerStyle={triggerStyle}>
        {children}
      </Collapsible>
    </CollapsibleWrapper>
  );
};

const CollapsibleWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const TriggerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const TriggerTitle = styled.span`
  color: #000000cc;
`;

const TriggerIcon = styled.i`
  color: #000000cc;
`;

const triggerStyle = {
  // width: "100%",
  // padding: "0px 5px 5px",
};

export default ReactCollapsible;
