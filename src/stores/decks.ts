import create from "zustand";
import { Deck } from "../Interfaces/deck.interface";
const fs = window.require("fs");

const data = fs.readFileSync("src/data/decks.json");
const parsedData = JSON.parse(data);

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
