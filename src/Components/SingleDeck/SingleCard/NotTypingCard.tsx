import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Star } from "react-feather";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useDecksStore from "../../../stores/decks";
import useSettingsStore from "../../../stores/settings";
import SingleTag from "../../Decks/Edit/SingleTag";
import CardResults from "./CardResults/CardResults";

interface NotTypingCardProps {
  cardData: Card;
  setCurrentCard: Dispatch<SetStateAction<number>>;
  deckData: Deck;
  setCurrentResults: Dispatch<SetStateAction<{ right: number; wrong: number }>>;
}

const NotTypingCard = ({
  cardData,
  setCurrentCard,
  deckData,
  setCurrentResults,
}: NotTypingCardProps) => {
  const decks = useDecksStore((state: any) => state.decks);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const [clickedShow, setClickedShow] = useState(false);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
  const settings = useSettingsStore((state: any) => state.settings);
  const onClickShow = () => {
    setClickedShow(true);
  };

  const onClickStar = () => {
    const newDecks = [...decks];
    const targetDeck = newDecks.find((deck) => deck.id === deckData.id);
    if (targetDeck) {
      const targetCard = targetDeck.cards.find(
        (card: Card) => cardData.id === card.id
      );
      console.log(targetCard);
      targetCard.fav = !targetCard.fav;
      setDecks(newDecks);
      setSomethingChanged(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "w" || key === "s") {
        setClickedShow(true);
      }
    });
  }, []);

  const onClickResult = () => {
    setCurrentCard((oldCardIndex) => oldCardIndex + 1);
    setClickedShow(false);
  };

  const onClickTag = () => {};

  return (
    <div className="flex flex-col space-y-12 items-center w-full ">
      <div
        className={clsx(
          "border-2 border-gray-400 rounded-lg p-6 w-1/5 flex flex-col justify-between h-96",

          { "bg-slate-800": settings.darkMode }
        )}
        style={{ minWidth: 350 }}
      >
        <div className="flex justify-between">
          <SingleTag
            tag={cardData.tag}
            onClickTag={onClickTag}
            cardID={cardData.id}
          />
          <div
            className="flex justify-end cursor-pointer"
            onClick={onClickStar}
          >
            <Star fill={cardData.fav ? "#FFAC1C" : "none"} />
          </div>
        </div>
        <h1 className="m-auto text-3xl text-center">{cardData.front}</h1>
        <div className="border w-full border-gray-300" />
        {clickedShow ? (
          <h1 className="m-auto text-3xl text-center ">{cardData.back}</h1>
        ) : (
          <button onClick={onClickShow} className="m-auto italic text-3xl">
            Show answer
          </button>
        )}
      </div>
      <CardResults
        setCurrentResults={setCurrentResults}
        onClickResult={onClickResult}
        clickedShow={clickedShow}
        deckData={deckData}
        cardData={cardData}
      />
    </div>
  );
};

export default NotTypingCard;
