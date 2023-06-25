import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "../../Interfaces/card.interface";
import { Deck } from "../../Interfaces/deck.interface";
import useDecksStore from "../../stores/decks";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import DeckDone from "./DeckDone/DeckDone";
import SingleCard from "./SingleCard/SingleCard";
import WorkSelect from "./WorkSelect/WorkSelect";
const ipcRenderer = window.require("electron").ipcRenderer;

const getWorkCards = (
  workSelected: {
    cards: string;
    canStart: boolean;
    reverse: boolean;
    typing: boolean;
    tags: Array<string>;
  },
  cards: Array<Card>
) => {
  console.log(workSelected.tags);
  if (workSelected.cards === "wrong") {
    return cards.filter(
      (card) =>
        card.lastResult === "wrong" &&
        (workSelected.tags.includes(card.tag) || !card.tag)
    );
  }
  if (workSelected.cards === "fav") {
    return cards.filter(
      (card) =>
        card.fav === true && (workSelected.tags.includes(card.tag) || !card.tag)
    );
  }
  return cards.filter(
    (card) => workSelected.tags.includes(card.tag) || !card.tag
  );
};

const SingleDeck = () => {
  const params = useParams();
  const [lives, setLives] = useState({ max: 3, left: 3 });
  const decks = useDecksStore((state: any) => state.decks);
  const [startTime, setStartTime] = useState(new Date());
  const deckID = params.id;
  const settings = useSettingsStore((state: any) => state.settings);
  const deckData = decks.find((deck: Deck) => deck.id === deckID);
  const deckCards = [...deckData.cards];
  const [currentResults, setCurrentResults] = useState({
    right: 0,
    wrong: 0,
  });
  const [workSelected, setWorkSelected] = useState<{
    cards: string;
    canStart: boolean;
    reverse: boolean;
    typing: boolean;
    tags: Array<string>;
  }>({
    cards: "none",
    canStart: false,
    reverse: false,
    typing: false,
    tags: [],
  });
  const [shuffledDeck, setShuffledDeck] = useState(
    deckCards.sort((a, b) => 0.5 - Math.random())
  );
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    if (workSelected.canStart === true) {
      ipcRenderer.send("changeDeck", {
        title: "Working",
        deck: deckData.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workSelected]);

  const onClickStartLearn = () => {
    const targetCards = getWorkCards(workSelected, deckCards);
    if (workSelected.reverse) {
      setShuffledDeck(
        targetCards
          .map((card) => ({ ...card, front: card.back, back: card.front }))
          .sort((a, b) => 0.5 - Math.random())
      );
    } else {
      setShuffledDeck(targetCards.sort((a, b) => 0.5 - Math.random()));
    }
    setStartTime(new Date());
    setWorkSelected(
      (oldWork: {
        cards: string;
        canStart: boolean;
        reverse: boolean;
        typing: boolean;
        tags: Array<string>;
      }) => ({
        ...oldWork,
        canStart: true,
      })
    );
  };

  useEffect(() => {
    if (currentCard === 0) {
      const targetCards = getWorkCards(workSelected, deckCards);
      setShuffledDeck(targetCards.sort((a, b) => 0.5 - Math.random()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  return (
    <div
      className={clsx("h-full", {
        "bg-gray-900 text-gray-200": settings.theme === "defaultDark",
        "bg-gwen-purple text-gwen-white": settings.theme === "gwen",
      })}
    >
      <Header title={deckData.name} />
      <div className="p-8">
        <div className="flex flex-col space-y-12 items-center justify-center">
          {workSelected.canStart === false ? (
            <WorkSelect
              cards={deckCards}
              setWorkSelected={setWorkSelected}
              onClickStartLearn={onClickStartLearn}
            />
          ) : currentCard < shuffledDeck.length && shuffledDeck.length ? (
            <div className="flex flex-col items-center">
              <div className="text-4xl text-center mb-12">
                {currentCard + 1} / {shuffledDeck.length}
              </div>
              <SingleCard
                setLives={setLives}
                setCurrentResults={setCurrentResults}
                typing={workSelected.typing}
                deckData={deckData}
                cardData={shuffledDeck[currentCard]}
                setCurrentCard={setCurrentCard}
              />
            </div>
          ) : (
            <DeckDone
              setCurrentCard={setCurrentCard}
              currentResults={currentResults}
              setCurrentResults={setCurrentResults}
              isTyping={workSelected.typing}
              startTime={startTime}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleDeck;
