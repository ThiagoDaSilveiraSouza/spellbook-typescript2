import styled from "styled-components";

interface IModalProps {
  modalIsOpen: boolean;
}

export const MainModalContainer = styled.div<IModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 100;
  visibility: ${({ modalIsOpen }) => (modalIsOpen ? "visible" : "hidden")};
  animation-delay: 0.4s;
`;

export const MainModalbg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const MainModalCard = styled.div<IModalProps>`
  position: relative;
  max-width: 100%;
  max-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background: white;
  z-index: 1;
  transform: ${({ modalIsOpen }) =>
    modalIsOpen ? "translateY(0%)" : "translateY(-100%)"};
  opacity: ${({ modalIsOpen }) => (modalIsOpen ? 1 : 0)};
  transition: 0.3s;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const MainModalCloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
    ::after,
    ::before {
      background: red;
      box-shadow: 0 0 3px 0 gray;
    }
  }
  ::after,
  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    background: black;
  }
  ::before {
    transform: rotate(45deg);
  }
  ::after {
    transform: rotate(-45deg);
  }
`;
