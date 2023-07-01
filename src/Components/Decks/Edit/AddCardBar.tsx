import clsx from "clsx";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Check } from "react-feather";
import { uuid as v4 } from "uuidv4";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";
import useSettingsStore from "../../../stores/settings";
import TagsList from "./TagsList";

interface AddCardBarProps {
  setCards: Dispatch<SetStateAction<Array<Card>>>;
  deckData: Deck;
}

const AddCardBar = ({ setCards, deckData }: AddCardBarProps) => {
  const [frontValue, setFrontValue] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [backValue, setBackValue] = useState<string>("");
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
  const settings = useSettingsStore((state: any) => state.settings);
  const decks = useDecksStore((state: any) => state.decks);
  const setDecks = useDecksStore((state: any) => state.setDecks);

  const onClickCheck = () => {
    const oldDeckData = { ...deckData };

    const newCards = [
      ...deckData.cards,
      {
        front: frontValue.trim(),
        back: backValue.trim(),
        id: v4(),
        fav: settings.favOnAdd,
        lastResult: "wrong",
        tag,
      },
    ];
    setCards(newCards);
    oldDeckData.cards = newCards;
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck: Deck) => deck.id === deckData.id);
    targetDeck.cards = newCards;
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
        className={clsx("rounded-lg  py-2 px-4", {
          "bg-gray-700 placeholder:text-gray-300 text-gray-200":
            settings.darkMode,
          "bg-gray-200": settings.darkMode === false,
        })}
        placeholder="Front"
        value={frontValue}
        onChange={onChangeFrontValue}
      />
      <input
        className={clsx("rounded-lg  py-2 px-4", {
          "bg-gray-700 placeholder:text-gray-300 text-gray-200":
            settings.darkMode,
          "bg-gray-200": settings.darkMode === false,
        })}
        placeholder="Back"
        value={backValue}
        onChange={onChangeBackValue}
      />
      <TagsList tag={tag} setTag={setTag} />
      <button className="text-gray-200">Add image</button>
      <Check
        className={clsx("cursor-pointer", { "text-white": settings.darkMode })}
        onClick={onClickCheck}
      />
    </div>
  );
};

export default AddCardBar;
