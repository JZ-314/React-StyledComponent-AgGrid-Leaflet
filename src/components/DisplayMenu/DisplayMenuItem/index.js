import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TabItemWrapper = styled.li`
  position: relative;
  float: left;
  background: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #c6cacc;
  border-bottom: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px 2px 0px 0px;
`;

const InActiveTabItemWrapper = styled.li`
  float: left;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5e6366;
  border: 1px solid #f1f1f1;
`;

const TabTitle = styled.span`
  font-size: 16px;
  padding: 15px 20px;
`;

const DisplayMenuItemComponent = ({
  title = "",
  onTabItemClicked = () => {},
  isActive = false,
}) => {
  return (
    <>
      {isActive ? (
        <TabItemWrapper onClick={onTabItemClicked}>
          <TabTitle>{title}</TabTitle>
        </TabItemWrapper>
      ) : (
        <InActiveTabItemWrapper onClick={onTabItemClicked}>
          <TabTitle>{title}</TabTitle>
        </InActiveTabItemWrapper>
      )}
    </>
  );
};

DisplayMenuItemComponent.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onTabItemClicked: PropTypes.func,
};

DisplayMenuItemComponent.defaultProps = {
  title: "",
  isActive: false,
  onTabItemClicked: null,
};

export default DisplayMenuItemComponent;
