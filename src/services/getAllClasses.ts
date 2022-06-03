// Api
import { api } from "../api";

interface IClass {
  [key: string]: any;
}

const updateClassData = async (classData: IClass) => {
  const { spells, class_levels } = classData;

  if (spells && class_levels) {
    const { data: dataSpell } = await api.get(spells);
    const { data: data_class_levels } = await api.get(class_levels);
    classData.spells = dataSpell;
    classData.class_levels = data_class_levels;
  }

  return classData;
};

export const getAllClasses = async () => {
  try {
    const allClasses = await api.get("api/classes");

    if (allClasses.status === 200) {
      const results: IClass[] = allClasses.data.results;
      const allClassesPromises = results.map((currenClass) =>
        api.get(currenClass.url)
      );
      const allResponses = await Promise.all(allClassesPromises);
      const allClassesResponsed = await Promise.all(
        allResponses.map(async (response) => {
          const { data } = response;
          const updateBySpell = await updateClassData(data);

          return updateBySpell;
        })
      );

      return allClassesResponsed;
    }

    return undefined;
  } catch (err) {
    console.log(err);
  }
};
