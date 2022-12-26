import create from "zustand";
import { Deck } from "../Interfaces/deck.interface";
import useDecksStore from "./decks";

export interface CurrentDeckStore {
    currentDeck: Deck,
    setCurrentDeck: (newDeck: string) => void,
    deckId: () => string
}

const useCurrentDeckStore = create<CurrentDeckStore>((set, get) => ({
    currentDeck: {} as Deck,
    setCurrentDeck: (newDeck: string) =>
        set((state) => ({
            ...state,
            currentDeck: useDecksStore.getState().decks.find(deck => deck.id === newDeck)
        })),
    deckId: () => get().currentDeck.id,
}));

export default useCurrentDeckStore;