import { useState } from "react";
import { useParams } from "react-router";
import Header from "../../Header/Header";
import AddCardBar from "./AddCardBar";
import CardsList from "./CardsList";
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
  const [cards, setCards] = useState(deckData.cards);

  return (
    <div className="flex flex-col justify-center ">
      <Header title={`Edit ${deckData.name}`} />
      <div className="flex flex-col ">
        <AddCardBar setCards={setCards} deckData={deckData} />
        <CardsList cards={cards} setCards={setCards} deckData={deckData} />
      </div>
    </div>
  );
};

export default SingleDeckSettings;
