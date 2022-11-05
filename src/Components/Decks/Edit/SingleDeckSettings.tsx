import { useState } from "react";
import { useParams } from "react-router";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";
import Header from "../../Header/Header";
import AddCardBar from "./AddCardBar";
import CardsList from "./CardsList";
import SearchCardBar from "./SearchCardBar";

const SingleDeckSettings = () => {
  const params = useParams();
  const deckID = params.id;
  const decks = useDecksStore((state: any) => state.decks);
  const deckData = decks.find((deck: Deck) => deck.id === deckID);
  const [valueSearch, setValueSearch] = useState("");
  const [cards, setCards] = useState(deckData.cards);

  return (
    <div className="h-full">
      <Header title={`Edit ${deckData.name}`} />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <SearchCardBar
            valueSearch={valueSearch}
            setValueSearch={setValueSearch}
          />
          <AddCardBar setCards={setCards} deckData={deckData} />
        </div>
        <CardsList
          valueSearch={valueSearch}
          cards={cards}
          setCards={setCards}
          deckData={deckData}
        />
      </div>
    </div>
  );
};

export default SingleDeckSettings;
