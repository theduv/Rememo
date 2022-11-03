import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Check } from "react-feather";
import { uuid as v4 } from "uuidv4";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
const fs = window.require("fs");

interface AddCardBarProps {
  setCards: Dispatch<SetStateAction<Array<Card>>>;
  deckData: Deck;
}

const AddCardBar = ({ setCards, deckData }: AddCardBarProps) => {
  const [frontValue, setFrontValue] = useState<string>("");
  const [backValue, setBackValue] = useState<string>("");

  const onClickCheck = () => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const oldDeckData = { ...deckData };

    const newCards = [
      ...deckData.cards,
      {
        front: frontValue,
        back: backValue,
        id: v4(),
        fav: false,
        lastResult: "wrong",
      },
    ];
    setCards(newCards);
    oldDeckData.cards = newCards;
    const indexTargetDeck = parsedData
      .map((deck: Deck) => deck.id)
      .indexOf(deckData.id);
    parsedData[indexTargetDeck].cards = newCards;
    parsedData[indexTargetDeck].numberOfCards++;
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
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
