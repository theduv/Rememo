import create from "zustand";
import { Deck } from "../Interfaces/deck.interface";
const fs = window.require("fs");
let appData = window.require("app-data-folder");

const data = fs.readFileSync(appData("Rememo") + "/decks.json");
const parsedData = JSON.parse(data);

interface DecksStoreInterface {
  somethingChanged: boolean,
  setSomethingChanged: (value: boolean) => void,
  decks: Deck[],
  setDecks: (newValue: Deck[]) => void
}

const useDecksStore = create<DecksStoreInterface>((set) => ({
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
