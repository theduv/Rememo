import { useState } from "react";
import { useParams } from "react-router";
import Header from "../../Header/Header";
import AddCardBar from "./AddCardBar";
import CardsList from "./CardsList";
import SearchCardBar from "./SearchCardBar";
const fs = window.require("fs");

const getDeckData = (id) => {
  const data = fs.readFileSync("src/data/decks.json", "utf8");
  const parsedDecks = JSON.parse(data);
  return parsedDecks.find((deck) => deck.id === id);
};

const SingleDeckSettings = () => {
  const params = useParams();
  const deckID = params.id;
  const deckData = getDeckData(deckID);
  const [valueSearch, setValueSearch] = useState("");
  const [cards, setCards] = useState(deckData.cards);

  return (
    <div className="flex flex-col justify-center overflow-hidden h-full">
      <Header title={`Edit ${deckData.name}`} />
      <div className="flex flex-col space-y-4">
        <SearchCardBar
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
        />
        <AddCardBar setCards={setCards} deckData={deckData} />
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
