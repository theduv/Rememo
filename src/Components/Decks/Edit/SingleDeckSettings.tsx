import clsx from "clsx";
import { useEffect, useState } from "react";
import useSetAndGetCurrentDeck from "../../../Hooks/useSetAndGetCurrentDeck";
import { Card } from "../../../Interfaces/card.interface";
import useSettingsStore from "../../../stores/settings";
import Header from "../../Header/Header";
import AddCardBar from "./AddCardBar";
import CardsList from "./CardsList";
import SearchCardBar from "./SearchCardBar";
const ipcRenderer = window.require("electron").ipcRenderer;

const SingleDeckSettings = () => {
  const deckData = useSetAndGetCurrentDeck()

  const settings = useSettingsStore((state: any) => state.settings);
  const [valueSearch, setValueSearch] = useState("");
  const [cards, setCards] = useState<Array<Card>>(deckData.cards);

  useEffect(() => {
    ipcRenderer.send("editing", {
      title: `Editing ${deckData.name}`,
      deck: "undefined",
    });
  }, [deckData]);

  return (
    <div className={clsx("h-full", { "bg-gray-900": settings.darkMode })}>
      <Header title={`Edit ${deckData.name}`} />
      <div className="flex flex-col space-y-4 h-4/5 items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 h-full ">
          <SearchCardBar
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
          />
          <AddCardBar setCards={setCards} deckData={deckData} />
        </div>
        <CardsList
          valueSearch={valueSearch}
          cards={cards.sort((a: Card, b: Card) =>
            a.front.localeCompare(b.front)
          )}
          setCards={setCards}
          deckData={deckData}
        />
      </div>
    </div>
  );
};

export default SingleDeckSettings;
