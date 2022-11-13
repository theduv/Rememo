import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card } from "../../../Interfaces/card.interface";
import { Deck } from "../../../Interfaces/deck.interface";
import useSettingsStore from "../../../stores/settings";
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
  const [clickedShow, setClickedShow] = useState(false);
  const settings = useSettingsStore((state: any) => state.settings);
  const onClickShow = () => {
    setClickedShow(true);
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

  return (
    <div className="flex flex-col space-y-12 items-center w-full ">
      <div
        className={clsx(
          "border-2 border-gray-400 rounded-lg p-6 w-1/5 flex flex-col justify-between h-96",

          { "bg-slate-800": settings.darkMode }
        )}
        style={{ minWidth: 350 }}
      >
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
