import { useState } from "react";
import { Plus } from "react-feather";
import { v4 as uuid } from "uuid";
const fs = window.require("fs");

const CreateBar = ({ decks, setDecks }) => {
  const [deckName, setDeckName] = useState("");

  const onChangeName = (e) => {
    setDeckName(e.target.value);
  };
  const onClickPlus = () => {
    if (deckName.length === 0) return;
    const oldDecks = [...decks];
    oldDecks.push({ id: uuid(), name: deckName, numberOfCards: 0, cards: [] });
    setDecks(oldDecks);
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
