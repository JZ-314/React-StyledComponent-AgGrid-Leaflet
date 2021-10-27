import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { closeModal } from "../../store/app/actions";

import MayanLanguageKeyModal from "./MayanLanguageKeyModal";
import MainTableModal from "./MainTableModal";
import CatalogModal from "./CatalogModal";
import SelectQueryModal from "./SelectQueryModal";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: ${({ width }) => width};
  height: auto;
  border-radius: 6px;
`;

const useOutsideAlerter = (ref) => {
  const dispatch = useDispatch();
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

const Modal = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const app = useSelector((state) => state.app);

  useOutsideAlerter(containerRef);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  });

  const renderModal = () => {
    switch (app.currentModal) {
      case "MAYAN_LANGUAGE_KEY":
        return <MayanLanguageKeyModal closeModal={handleCloseModal} />;
      case "MAIN_TABLE_ROW_MODAL":
        return <MainTableModal closeModal={handleCloseModal} />;
      case "CATALOG_TABLE_ROW_MODAL":
        return <CatalogModal closeModal={handleCloseModal} />;
      case "SELECT_QUERY_MODAL":
        return <SelectQueryModal closeModal={handleCloseModal} />;
      default:
        return null;
    }
  };

  if (!app.modalOpen) {
    return null;
  }

  return (
    <Wrapper>
      <ModalContainer width={app?.modalWidth}>{renderModal()}</ModalContainer>
    </Wrapper>
  );
};

export default Modal;
