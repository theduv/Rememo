import {create} from "zustand";
import { Deck } from "../Interfaces/deck.interface";
const fs = window.require("fs");
let appData = window.require("app-data-folder");
const folderPath = appData("Rememo");
const filePath = folderPath + "/decks.json";

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

const useDecksStore = create((set) => ({
  somethingChanged: false,
  setSomethingChanged: (value: boolean) =>
    set((state: { somethingChanged: boolean }) => ({
      ...state,
      somethingChanged: value,
    })),
  decks: parsedData,
  setDecks: (newValue: Array<Deck>) =>
    set((state: {}) => ({ ...state, decks: newValue })),
}));

export default useDecksStore;
