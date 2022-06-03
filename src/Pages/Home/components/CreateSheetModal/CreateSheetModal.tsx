import {
  ChangeEvent,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { MainModal, IMainModalProps } from "../../../../components";
import { useData } from "../../../../context";
import { ICharacterSheet } from "../../../../interfaces";

// CreateSheetModal components
import { AtrributeLabel, SkillLabel } from "./components";

const Form = styled.form`
  width: 500px;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Label = styled.label`
  flex: 0 1 245px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  strong {
    flex: 1 1 100%;
    text-align: start;
  }
  input,
  select {
    flex: 1 1 100%;
    padding: 3px;
    flex: 1 1 100%;
  }
`;

const Container = styled.div`
  flex: 0 1 245px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  border: 1px solid black;
  padding: 10px;
  box-sizing: border-box;
  h3 {
    flex: 1 1 100%;
    margin: 0;
    text-align: center;
  }
`;

const AttributesContainer = styled(Container)``;

const SkillsContainer = styled(Container)``;

const defaultSheet: ICharacterSheet = {
  id: "",
  name: "",
  attributes: {
    str: 0,
    dex: 0,
    const: 0,
    int: 0,
    wis: 0,
    char: 0
  },
  class: "",
  race: ""
};

export const CreateSheetModal: FC<IMainModalProps> = ({ useModal }) => {
  const { races, racesByIndex, classesByIndex, skills } = useData();
  const modalElement = useRef<HTMLFormElement>(null);
  const [newSheet, setNewSheet] = useState<ICharacterSheet>(defaultSheet);

  interface IFormSheet {
    attributeStr?: HTMLOutputElement;
  }

  const formHandlerSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const { attributeStr } = event.target as IFormSheet;
  };

  const handlerUpdateRaceOnInputChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    console.log(value);
    setNewSheet((currentSheet) => {
      return { ...currentSheet, race: value };
    });
  };

  useEffect(() => {
    console.log(skills);
  }, [skills]);

  // reset form onload
  useEffect(() => {
    const { modalIsOpen } = useModal;
    if (!modalIsOpen) {
      modalElement.current?.reset();
      setNewSheet(defaultSheet);
    }
  }, [useModal]);

  return (
    <MainModal useModal={useModal}>
      <Form ref={modalElement} onSubmit={formHandlerSubmit}>
        <Label>
          <strong>Nome:</strong>
          <input type="text" name="name" />
        </Label>
        <Label>
          <strong>Raça:</strong>
          <select
            name="race"
            defaultValue=""
            onChange={handlerUpdateRaceOnInputChange}
          >
            <option disabled={true} hidden></option>
            {races &&
              races.map(({ index, name }, raceIndex) => (
                <option value={index} key={raceIndex + index}>
                  {name}
                </option>
              ))}
          </select>
        </Label>
        <AttributesContainer>
          <h3>Atributos</h3>
          <AtrributeLabel description="Força" name="attributeStr" />
          <AtrributeLabel description="Destreza" name="attributeDex" />
          <AtrributeLabel description="Constituição" name="attributeConst" />
          <AtrributeLabel description="Sabedoria" name="attributeWin" />
          <AtrributeLabel description="Inteligencia" name="attributeInt" />
          <AtrributeLabel description="Carisma" name="attributeInt" />
        </AttributesContainer>
        <SkillsContainer>
          <h3>Perícias</h3>
          {skills.map(({ index, name }, arrayPosition) => {
            return (
              <SkillLabel
                key={arrayPosition + index}
                name={index}
                description={name}
              />
            );
          })}
        </SkillsContainer>
      </Form>
    </MainModal>
  );
};
