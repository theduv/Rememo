import {create} from "zustand";
import { Deck } from "../Interfaces/deck.interface";
const fs = window.require("fs");
let appData = window.require("app-data-folder");

const folderPath = appData("Rememo");
const filePath = folderPath + "/settings.json";

let parsedData: Array<Deck> = [];

if (fs.existsSync(folderPath)) {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    parsedData = JSON.parse(data);
  } else {
    fs.writeFileSync(filePath, "[]");
  }
} else {
  fs.mkdirSync(folderPath);
  fs.writeFileSync(filePath, "[]");
}

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
