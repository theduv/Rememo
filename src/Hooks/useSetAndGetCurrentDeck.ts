import { useEffect } from "react";
import { useParams } from "react-router";
import useCurrentDeckStore, { CurrentDeckStore } from "../stores/currentDeck";

export default function useSetAndGetCurrentDeck() {
    const setCurrentDeck = useCurrentDeckStore((state: CurrentDeckStore) => state.setCurrentDeck);
    const queryParams = useParams();
    useEffect(() => {
        setCurrentDeck(queryParams.id as string)
    }, [setCurrentDeck, queryParams.id]);
    return useCurrentDeckStore((state: CurrentDeckStore) => state.currentDeck);
}