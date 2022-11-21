import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card } from "../../../Interfaces/card.interface";
import { TbArrowsShuffle } from "react-icons/tb";
import { BsCardList } from "react-icons/bs";
import SelectButton from "./SelectButton";
import { FaKeyboard } from "react-icons/fa";
import { Star, XCircle } from "react-feather";
interface WorkSelectProps {
  setWorkSelected: Dispatch<
    SetStateAction<{
      cards: string;
      canStart: boolean;
      reverse: boolean;
      typing: boolean;
    }>
  >;
  onClickStartLearn: () => void;
  cards: Array<Card>;
}

const WorkSelect = ({
  setWorkSelected,
  onClickStartLearn,
  cards,
}: WorkSelectProps) => {
  const [reverse, setReverse] = useState(false);
  const [typing, setTyping] = useState(false);
  const [cardsLearn, setCardsLearn] = useState("all");
  const [count, setCount] = useState(cards.length);

  useEffect(() => {
    if (cardsLearn === "fav") {
      setCount(cards.filter((card) => card.fav).length);
    }
    if (cardsLearn === "wrong") {
      setCount(cards.filter((card) => card.lastResult === "wrong").length);
    }
    if (cardsLearn === "all") {
      setCount(cards.length);
    }
    setWorkSelected(
      (oldWork: {
        cards: string;
        canStart: boolean;
        reverse: boolean;
        typing: boolean;
      }) => ({
        ...oldWork,
        cards: cardsLearn,
        typing,
        reverse,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing, reverse, cardsLearn]);

  const onClickCard = (type: string) => {
    setCardsLearn(type);
  };

  return (
    <div className="flex space-y-8 flex-col items-center justify-center text-3xl ">
      <div className="rounded-lg border w-full border-black flex bg-gray-700 flex-col items-center p-4 space-y-6">
        <h1>Cards</h1>
        <div className="flex space-x-4">
          <SelectButton
            data="All cards"
            selected={cardsLearn === "all"}
            onClick={() => onClickCard("all")}
          >
            <div className="text-base">All</div>
          </SelectButton>
          <SelectButton
            data="Starred"
            selected={cardsLearn === "fav"}
            onClick={() => onClickCard("fav")}
          >
            <Star />
          </SelectButton>
          <SelectButton
            data="Wrong"
            selected={cardsLearn === "wrong"}
            onClick={() => onClickCard("wrong")}
          >
            <XCircle />
          </SelectButton>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col border border-black bg-gray-700 items-center p-4 space-y-6">
        <h1>Mode</h1>
        <div className="flex space-x-4">
          <SelectButton
            data="Reverse"
            selected={reverse}
            onClick={() => setReverse((oldReverse) => !oldReverse)}
          >
            <TbArrowsShuffle />
          </SelectButton>
          <SelectButton
            data="Typing"
            selected={typing}
            onClick={() => setTyping((oldTyping) => !oldTyping)}
          >
            <FaKeyboard />
          </SelectButton>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 items-center justify-center">
        <div className="flex items-center space-x-2 p-2 rounded-sm">
          <BsCardList width="10" />
          <h3 className="text-lg">{count}</h3>
        </div>
        <button
          onClick={onClickStartLearn}
          className="rounded-lg px-4 py-4 text-lg w-3/4 bg-slate-700 font-bold text-white"
        >
          Start learning
        </button>
      </div>
    </div>
  );
};

export default WorkSelect;
