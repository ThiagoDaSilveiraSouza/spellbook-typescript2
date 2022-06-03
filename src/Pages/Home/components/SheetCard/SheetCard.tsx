import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

// components
import { MainContainer } from "../../../../components";

const AddNewSheetButton = styled.button``;

interface Props {
  setModalState: Dispatch<SetStateAction<boolean>>;
}

export const SheetCard: FC<Props> = ({ setModalState }) => {
  return (
    <MainContainer>
      <AddNewSheetButton onClick={() => setModalState(true)}>
        Novo personagem +
      </AddNewSheetButton>
    </MainContainer>
  );
};
