import clsx from "clsx";
import React, { useState } from "react";
import { Plus } from "react-feather";
import { v4 as uuid } from "uuid";
import useDecksStore from "../../stores/decks";
import useSettingsStore from "../../stores/settings";

const CreateBar = () => {
  const [deckName, setDeckName] = useState("");
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
  };

  const onClickPlus = () => {
    if (deckName.length === 0) return;
    const oldDecks = [...decks];
    oldDecks.push({ id: uuid(), name: deckName, cards: [] });
    setDecks([...oldDecks]);
    setSomethingChanged(true);
    setDeckName("");
  };

  return (
    <div className="flex space-x-4 items-center">
      <input
        placeholder="New deck name"
        className={clsx("px-4 py-2 bg-gray-100 rounded-lg", {
          "text-gray-200 bg-gray-700 placeholder:text-gray-200 ":
            settings.darkMode,
        })}
        value={deckName}
        onChange={onChangeName}
      />
      <Plus onClick={onClickPlus} className="cursor-pointer" />
    </div>
  );
};

export default CreateBar;
