import { useState } from "react";
import styled from "styled-components";

// Home components
import { SheetCard, CreateSheetModal } from "./components";

const HomeContainer = styled.section`
  display: flex;
  padding: 20px;
`;

export const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);

  return (
    <>
      <HomeContainer>
        <SheetCard setModalState={setModalIsOpen} />
      </HomeContainer>
      <CreateSheetModal useModal={{ modalIsOpen, setModalIsOpen }} />
    </>
  );
};
