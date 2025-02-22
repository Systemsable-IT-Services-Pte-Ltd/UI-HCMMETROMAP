export const StorageKey = {
  FILTERS: `filters`,
  THEME: `theme`,
};

export const getDataFromStorage = async (key: string) => {
  const storedData = JSON.parse(localStorage.getItem(`${key}`) || "[]");
  return storedData;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDataToStorage = async (key: string, data: any) => {
  return localStorage.setItem(`${key}`, JSON.stringify(data));
};

export const removeDataFromStorage = async (key: string) => {
  await localStorage.removeItem(`${key}`);
};
