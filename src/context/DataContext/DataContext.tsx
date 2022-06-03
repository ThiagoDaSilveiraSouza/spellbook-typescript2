import {
  Context,
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState
} from "react";

// services
import {
  getAllClasses,
  getAllRaces,
  getAllSpells,
  getAllSkills
} from "../../services";

// utils
import { setDataOnLocalStorage, getDataFromLocalStorage } from "../../utils";

// interfaces
import { IData } from "../../interfaces";

interface IDataContext {
  data: IData;
  setData: Dispatch<SetStateAction<IData>>;
}

const defaultData: IData = {
  classes: [],
  spells: [],
  characterSheetList: [],
  races: [],
  skills: []
};

export const DataContext: Context<IDataContext> = createContext<IDataContext>({
  data: defaultData,
  setData: () => (data: IData) => data
});

export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<IData>(defaultData);

  useEffect(() => {
    const updateData = async (
      setDataFunction: Dispatch<SetStateAction<IData>>
    ) => {
      const dataFromlocalstorage = () => getDataFromLocalStorage("data");
      const updateDataOnLocalstorage = (data: object) =>
        setDataOnLocalStorage("data", data);
      const localstorageData = dataFromlocalstorage() as IData;
      if (localstorageData) {
        setData({ ...localstorageData });
        return;
      }

      const newData = {
        classes: await getAllClasses(),
        spells: await getAllSpells(),
        races: await getAllRaces(),
        skills: await getAllSkills()
      } as IData;

      setDataFunction(newData);
      updateDataOnLocalstorage(newData);
    };
    updateData(setData);
  }, [setData]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
