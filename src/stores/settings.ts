import create from "zustand";
const fs = window.require("fs");
let appData = window.require("app-data-folder");

const data = fs.readFileSync(appData("Rememo") + "\\settings.json");
const parsedData = JSON.parse(data);

const useSettingsStore = create((set) => ({
  settings: parsedData,
  somethingChanged: false,
  setSomethingChanged: (value: boolean) =>
    set((state: { somethingChanged: boolean }) => ({
      ...state,
      somethingChanged: value,
    })),
  setSettings: (newValue: {}) =>
    set((state: {}) => ({ ...state, settings: newValue })),
}));

export default useSettingsStore;
