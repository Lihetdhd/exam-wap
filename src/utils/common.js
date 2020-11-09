export default {
  setStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  getStorage(name) {
    return JSON.parse(localStorage.getItem(name));
  },
};
