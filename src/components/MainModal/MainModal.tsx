import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
// style
import {
  MainModalContainer,
  MainModalbg,
  MainModalCard,
  MainModalCloseButton
} from "./style";

export interface IMainModalProps {
  useModal: {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export const MainModal: FC<IMainModalProps> = ({ children, useModal }) => {
  const { modalIsOpen, setModalIsOpen } = useModal;
  const containerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeModalWithHandlerEscKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const isEscButton = key === "Escape";
      if (isEscButton) {
        setModalIsOpen(false);
      }
    };
    document.body.addEventListener("keydown", (event) =>
      closeModalWithHandlerEscKeyDown(event)
    );
  }, [setModalIsOpen]);

  return (
    <MainModalContainer modalIsOpen={modalIsOpen}>
      <MainModalbg onClick={() => setModalIsOpen(false)} />
      <MainModalCard modalIsOpen={modalIsOpen} ref={containerElement}>
        <MainModalCloseButton onClick={() => setModalIsOpen(false)} />
        {children}
      </MainModalCard>
    </MainModalContainer>
  );
};
