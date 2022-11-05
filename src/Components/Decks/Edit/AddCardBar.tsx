import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Check } from "react-feather";
import { uuid as v4 } from "uuidv4";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";

interface AddCardBarProps {
  setCards: Dispatch<SetStateAction<Array<Card>>>;
  deckData: Deck;
}

const AddCardBar = ({ setCards, deckData }: AddCardBarProps) => {
  const [frontValue, setFrontValue] = useState<string>("");
  const [backValue, setBackValue] = useState<string>("");
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
  const decks = useDecksStore((state: any) => state.decks);
  const setDecks = useDecksStore((state: any) => state.setDecks);

  const onClickCheck = () => {
    const oldDeckData = { ...deckData };

    const newCards = [
      ...deckData.cards,
      {
        front: frontValue,
        back: backValue,
        id: v4(),
        fav: true,
        lastResult: "wrong",
      },
    ];
    setCards(newCards);
    oldDeckData.cards = newCards;
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    targetDeck.cards = newCards;
    targetDeck.numberOfCards++;
    setDecks(newDecks);
    setSomethingChanged(true);
    setBackValue("");
    setFrontValue("");
  };

  const onChangeFrontValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFrontValue(e.target.value);
  };

  const onChangeBackValue = (e: ChangeEvent<HTMLInputElement>) => {
    setBackValue(e.target.value);
  };

  return (
    <div className="flex space-x-4 items-center justify-center">
      <input
        className="rounded-lg bg-gray-200 py-2 px-4"
        placeholder="Front"
        value={frontValue}
        onChange={onChangeFrontValue}
      />
      <input
        className="rounded-lg bg-gray-200 py-2 px-4"
        placeholder="Back"
        value={backValue}
        onChange={onChangeBackValue}
      />
      <Check className="cursor-pointer" onClick={onClickCheck} />
    </div>
  );
};

export default AddCardBar;
