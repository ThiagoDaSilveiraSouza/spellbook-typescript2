export interface ISpell {
  index: string;
  level?: number;
  [key: string]: any;
}

export interface IClass {
  index: string;
  spells?: {
    count: number;
    results: ISpell[];
    [key: string]: any;
  };
  [key: string]: any;
}

interface IAbilityBonuses {
  ability_score: {
    name: string;
    index: string;
    url: string;
  };
  bonus: number;
}
export interface IRace {
  index: string;
  name: string;
  ability_bonuses: IAbilityBonuses[];
  [key: string]: any;
}

export interface ICharacterSheet {
  id: string;
  name: string;
  class: string;
  race: string;
  attributes: {
    str: number;
    dex: number;
    const: number;
    int: number;
    wis: number;
    char: number;
  };
  [key: string]: any;
}
export interface ISkills {
  index: string;
  name: string;
  desc: string[];
  ability_score: {
    index: string;
    name: string;
    url: string;
  };
  url: "string";
}

export interface IData {
  classes: IClass[];
  spells: ISpell[];
  races: IRace[];
  characterSheetList: ICharacterSheet[];
  skills: ISkills[];
}
