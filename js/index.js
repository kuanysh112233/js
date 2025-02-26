const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};
const addToLocalStorage = (key, newItem) => {
  const array = getFromLocalStorage(key);
  localStorage.setItem(key, JSON.stringify([...array, newItem]));
};
