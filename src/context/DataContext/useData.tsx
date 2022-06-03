import { useContext } from "react";

import { DataContext } from "./DataContext";

// interfaces
import { IClass, ISpell, ICharacterSheet, IRace } from "../../interfaces";

interface ISpellByIndex {
  [key: string]: ISpell;
}

interface IClassByIndex {
  [key: string]: IClass;
}
interface IRaceByIndex {
  [key: string]: IRace;
}

interface ISpellListByLevel {
  [key: string]: ISpell[];
}

export const useData = () => {
  const { data, setData } = useContext(DataContext);
  const { races, spells, classes, skills } = data;

  const spellsByIndex = data.spells.reduce<ISpellByIndex>(
    (spellsByIndex, currentSpell) => {
      const { index } = currentSpell;
      spellsByIndex[index] = currentSpell;
      return spellsByIndex;
    },
    {}
  );

  const filterSpellsListByNivel = (targetClass: IClass) => {
    const { spells } = targetClass;

    if (spells) {
      const { results } = spells;
      const spellsByLevel = results.reduce<ISpellListByLevel>(
        (spellsByLevel, currentSpell) => {
          const { level } = currentSpell;
          if (level) {
            spellsByLevel[level] = spellsByLevel[level] || [];
            spellsByLevel[level].push(currentSpell);
          }
          return spellsByLevel;
        },
        {}
      );
      const updatedTargetClass: IClass = {
        ...targetClass,
        spells: {
          ...spells,
          spellsByLevel
        }
      };
      return updatedTargetClass;
    }
    return targetClass;
  };

  const updateClassSpells = (targetClass: IClass) => {
    const { spells } = targetClass;
    if (spells) {
      const { results } = spells;
      const updateSpells = results.map(
        (currentSpell) => spellsByIndex[currentSpell.index]
      );
      const updateResults = {
        count: spells.count,
        results: updateSpells
      };
      const updateTargetClass = {
        ...targetClass,
        spells: { ...updateResults }
      };
      return updateTargetClass;
    }
    return targetClass;
  };

  const classesByIndex = data.classes.reduce<IClassByIndex>(
    (classesByIndex, currentClass) => {
      const { index } = currentClass;
      const updatedClass = updateClassSpells(currentClass);
      const spellsByNivel = filterSpellsListByNivel(updatedClass);

      classesByIndex[index] = spellsByNivel;
      return classesByIndex;
    },
    {}
  );

  const racesByIndex = data.races.reduce<IRaceByIndex>(
    (racesByIndex, currentRace) => {
      const { index } = currentRace;
      racesByIndex[index] = currentRace;
      return racesByIndex;
    },
    {}
  );

  const saveCharacterSheet = (characterSheet: ICharacterSheet) => {
    setData((data) => {
      const { characterSheetList } = data;
      const updateCharacterSheetList = [...characterSheetList];
      updateCharacterSheetList.push(characterSheet);
      return { ...data, characterSheet: updateCharacterSheetList };
    });
  };

  const removeCharacterSheetById = (characterSheetId: string) => {
    setData((data) => {
      const { characterSheetList } = data;
      const updateCharacterSheetList = characterSheetList.reduce<
        ICharacterSheet[]
      >((updateCharacterSheetList, currentSheet) => {
        if (characterSheetId !== currentSheet.id) {
          updateCharacterSheetList.push(currentSheet);
        }
        return updateCharacterSheetList;
      }, []);
      return { ...data, characterSheet: updateCharacterSheetList };
    });
  };

  return {
    data,
    setData,
    races,
    spells,
    classes,
    skills,
    classesByIndex,
    spellsByIndex,
    racesByIndex,
    saveCharacterSheet,
    removeCharacterSheetById
  };
};
