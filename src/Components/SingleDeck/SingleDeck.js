import { useState } from "react";
import { useParams } from "react-router";
import Header from "../Header/Header";
import DeckDone from "./DeckDone/DeckDone";
import SingleCard from "./SingleCard/SingleCard";
const fs = window.require("fs");

const getDeckData = (id) => {
  const data = fs.readFileSync("src/data/decks.json", "utf8");
  const parsedDecks = JSON.parse(data);
  return parsedDecks.find((deck) => deck.id === id);
};

const SingleDeck = () => {
  const params = useParams();
  const deckID = params.id;
  const deckData = getDeckData(deckID);
  console.log(deckData.cards);
  const shuffledDeck = deckData.cards.sort((a, b) => 0.5 - Math.random());
  const [currentCard, setCurrentCard] = useState(0);

  console.log(deckData.cards);
  return (
    <div>
      <Header title={deckData.name} />
      <div className="p-8 min-h-full">
        <div className="flex flex-col space-y-12 items-center justify-center h-full">
          {currentCard < deckData.cards.length ? (
            <SingleCard
              cardData={shuffledDeck[currentCard]}
              setCurrentCard={setCurrentCard}
            />
          ) : (
            <DeckDone setCurrentCard={setCurrentCard} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleDeck;
