export const setDataOnLocalStorage = (key: string, data: object) => {
  const dataToSring = JSON.stringify(data);

  localStorage.setItem(key, dataToSring);
};

export const getDataFromLocalStorage = (key: string): object | undefined => {
  const stringData = localStorage.getItem(key);

  if (stringData) {
    return JSON.parse(stringData);
  }
};
