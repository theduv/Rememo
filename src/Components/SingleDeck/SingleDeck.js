import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header/Header";
import DeckDone from "./DeckDone/DeckDone";
import SingleCard from "./SingleCard/SingleCard";
import WorkSelect from "./WorkSelect/WorkSelect";
const fs = window.require("fs");

const getDeckData = (id) => {
  const data = fs.readFileSync("src/data/decks.json", "utf8");
  const parsedDecks = JSON.parse(data);
  return parsedDecks.find((deck) => deck.id === id);
};

const getWorkCards = (workSelected, cards) => {
  if (workSelected === "wrong") {
    return cards.filter((card) => card.lastResult === "wrong");
  }
  return cards;
};

const SingleDeck = () => {
  const params = useParams();
  const deckID = params.id;
  const deckData = getDeckData(deckID);
  const deckCards = [...deckData.cards];
  const [workSelected, setWorkSelected] = useState("none");
  const [shuffledDeck, setShuffledDeck] = useState(
    deckCards.sort((a, b) => 0.5 - Math.random())
  );
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    const targetCards = getWorkCards(workSelected, deckCards);
    setShuffledDeck(targetCards.sort((a, b) => 0.5 - Math.random()));
  }, [workSelected]);

  return (
    <div>
      <Header title={deckData.name} />
      <div className="p-8 min-h-full">
        <div className="flex flex-col space-y-12 items-center justify-center h-full">
          {workSelected === "none" ? (
            <WorkSelect cards={deckCards} setWorkSelected={setWorkSelected} />
          ) : currentCard < shuffledDeck.length && shuffledDeck.length ? (
            <SingleCard
              deckData={deckData}
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
