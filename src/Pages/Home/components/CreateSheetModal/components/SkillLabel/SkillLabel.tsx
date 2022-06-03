import { FC, KeyboardEventHandler } from "react";
import styled from "styled-components";

const Label = styled.label`
  flex: 1 1 100%;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  user-select: none;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
  }
`;

type SkillLabelProps = {
  name: string;
  description: string;
};
export const SkillLabel: FC<SkillLabelProps> = ({ name, description }) => {
  const inputHandlerKeyPress: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { key, target } = event;
    const isPlusButton = key === "+";
    const isDecresesButton = key === "-";

    if (isPlusButton) {
      (target as HTMLInputElement).checked = true;
    } else if (isDecresesButton) {
      (target as HTMLInputElement).checked = false;
    }
  };

  return (
    <Label>
      <input onKeyDown={inputHandlerKeyPress} type="checkbox" name={name} />
      <strong>{description}</strong>
    </Label>
  );
};
