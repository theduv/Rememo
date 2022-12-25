import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";
import useSettingsStore from "../../../stores/settings";
import Header from "../../Header/Header";
import AddCardBar from "./AddCardBar";
import CardsList from "./CardsList";
import SearchCardBar from "./SearchCardBar";
const ipcRenderer = window.require("electron").ipcRenderer;

const SingleDeckSettings = () => {
  const params = useParams();
  const deckID = params.id;
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);
  const deckData = decks.find((deck: Deck) => deck.id === deckID);
  const [valueSearch, setValueSearch] = useState("");
  const [cards, setCards] = useState<Array<Card>>(deckData.cards);

  useEffect(() => {
    ipcRenderer.send("editing", {
      title: `Editing ${deckData.name}`,
      deck: "undefined",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
