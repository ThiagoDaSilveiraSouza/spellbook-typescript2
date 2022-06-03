import { ChangeEventHandler, FC, useRef, useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  flex: 1 1 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  table {
    flex: 1 1 100%;
    tr {
      width: 100%;
      display: flex;
      th {
        flex: 1 1 100%;
      }
    }
    input {
      width: 20px;
      text-align: center;
      user-select: none;
      -moz-appearance: textfield;

      ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
`;
const InputTd = styled.td`
  width: 100%;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 5px;
    button {
      cursor: pointer;
      user-select: none;
    }
  }
`;

interface IOutputTd {
  modValue: number;
}
const OutputTd = styled.td<IOutputTd>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #dacdac;
  color: ${({ modValue }) => {
    if (modValue < 0) {
      return "#f85741";
    }
    if (modValue > 0) {
      return "#0e9094";
    }
    return "white";
  }};
  font-weight: bold;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 14px;
`;

interface IAtrributeLabelProps {
  name: string;
  description: string;
}

const modByAttribute = {
  1: -5,
  2: -4,
  3: -4,
  4: -3,
  5: -3,
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: 0,
  11: 0,
  12: +1,
  13: +1,
  14: +2,
  15: +2,
  16: +3,
  17: +3,
  18: +4,
  19: +4,
  20: +5,
  21: +5,
  22: +6,
  23: +6,
  24: +7
};

type modByAttributeType = keyof typeof modByAttribute;

export const AtrributeLabel: FC<IAtrributeLabelProps> = ({
  name,
  description
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [lastValue, setLastValue] = useState<number>(10);
  const modValue = modByAttribute[lastValue as modByAttributeType];
  const maxCount = 24;
  const minCount = 1;

  const decreaseInputValue = () => {
    if (inputElement.current !== null) {
      const currentValue = inputElement.current?.valueAsNumber;
      const valueIsMin = currentValue === minCount;
      if (valueIsMin) {
        inputElement.current.valueAsNumber = minCount;
        setLastValue(minCount);
      } else {
        inputElement.current.valueAsNumber = currentValue - 1;
        setLastValue(currentValue - 1);
      }
    }
  };
  const plusInputValue = () => {
    if (inputElement.current !== null) {
      const currentValue = inputElement.current?.valueAsNumber;
      const valueIsMax = currentValue === maxCount;
      if (valueIsMax) {
        inputElement.current.valueAsNumber = maxCount;
        setLastValue(maxCount);
      } else {
        inputElement.current.valueAsNumber = currentValue + 1;
        setLastValue(currentValue + 1);
      }
    }
  };

  const inputHandleChangeEvent: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { valueAsNumber, value } = event.target;
    const isMaxLength = value.length > 2;
    const valueIsMin = valueAsNumber < minCount;
    const valueIsMax = valueAsNumber > maxCount;

    if (isMaxLength || !valueAsNumber) {
      event.target.value = `${lastValue}`;
      return;
    }

    if (valueIsMin) {
      event.target.value = `${minCount}`;
      setLastValue(minCount);
      return;
    }

    if (valueIsMax) {
      event.target.value = `${maxCount}`;
      setLastValue(maxCount);
      return;
    }

    setLastValue(valueAsNumber);
  };

  return (
    <Label>
      <table>
        <thead>
          <tr>
            <th>{description}</th>
            <th>Mod</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <InputTd>
              <div>
                <button type="button" onClick={decreaseInputValue}>
                  -
                </button>
                <input
                  type="number"
                  defaultValue="10"
                  name={name}
                  ref={inputElement}
                  onChange={inputHandleChangeEvent}
                />
                <button type="button" onClick={plusInputValue}>
                  +
                </button>
              </div>
            </InputTd>
            <OutputTd modValue={modValue}>
              {modValue > 0 ? "+" + modValue : modValue}
            </OutputTd>
          </tr>
        </tbody>
      </table>
    </Label>
  );
};
