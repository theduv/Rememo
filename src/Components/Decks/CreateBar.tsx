import React, { Dispatch, SetStateAction, useState } from "react";
import { Plus } from "react-feather";
import { v4 as uuid } from "uuid";
import { Deck } from "../../Interfaces/deck.interface";
const fs = window.require("fs");

interface CreateBarProps {
  decks: Array<Deck>;
  setDecks: Dispatch<SetStateAction<Array<Deck>>>;
}

const CreateBar = ({ decks, setDecks }: CreateBarProps) => {
  const [deckName, setDeckName] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
  };
  const onClickPlus = () => {
    if (deckName.length === 0) return;
    const oldDecks = [...decks];
    oldDecks.push({ id: uuid(), name: deckName, numberOfCards: 0, cards: [] });
    setDecks([...oldDecks]);
    fs.writeFileSync("src/data/decks.json", JSON.stringify(oldDecks));
    setDeckName("");
  };

  return (
    <div className="flex space-x-4">
      <input
        placeholder="New deck name"
        className="px-2 bg-gray-100 rounded-lg"
        value={deckName}
        onChange={onChangeName}
      />
      <Plus onClick={onClickPlus} className="cursor-pointer" />
    </div>
  );
};

export default CreateBar;
