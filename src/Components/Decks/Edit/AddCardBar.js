import { useState } from "react";
import { Check } from "react-feather";
const fs = window.require("fs");

const AddCardBar = ({ setCards, deckData }) => {
  const [frontValue, setFrontValue] = useState("");
  const [backValue, setBackValue] = useState("");

  const onClickCheck = () => {
    const data = fs.readFileSync("src/data/decks.json", "utf8");
    const parsedData = JSON.parse(data);
    const oldDeckData = { ...deckData };

    const newCards = [
      ...deckData.cards,
      { front: frontValue, back: backValue },
    ];
    setCards(newCards);
    oldDeckData.cards = newCards;
    const indexTargetDeck = parsedData
      .map((deck) => deck.id)
      .indexOf(deckData.id);
    parsedData[indexTargetDeck].cards = newCards;
    parsedData[indexTargetDeck].numberOfCards++;
    fs.writeFileSync("src/data/decks.json", JSON.stringify(parsedData));
    setBackValue("");
    setFrontValue("");
  };

  const onChangeFrontValue = (e) => {
    setFrontValue(e.target.value);
  };

  const onChangeBackValue = (e) => {
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
