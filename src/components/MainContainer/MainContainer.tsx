import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 0 1 300px;
  border: 1px solid black;
  padding: 20px;
`;

export const MainContainer: FC = ({ children }) => {
  return <Container>{children}</Container>;
};
