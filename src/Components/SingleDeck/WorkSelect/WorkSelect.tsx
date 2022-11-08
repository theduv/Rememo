import { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../../../Interfaces/card.interface";
import InputCheckbox from "../../Shareable/InputCheckbox";

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
  const [count, setCount] = useState(cards.length);

  const onChangeSelectCards = (e: any) => {
    const newWork = e.target.value;

    if (newWork === "all") {
      setCount(cards.length);
    }
    if (newWork === "fav") {
      setCount(cards.filter((card: Card) => card.fav).length);
    }
    if (newWork === "wrong") {
      setCount(
        cards.filter((card: Card) => card.lastResult === "wrong").length
      );
    }
    setWorkSelected(
      (oldWork: {
        cards: string;
        canStart: boolean;
        reverse: boolean;
        typing: boolean;
      }) => ({
        ...oldWork,
        cards: newWork,
      })
    );
  };

  const onChangeReverse = (e: any) => {
    return; //does nothing for the moment
  };

  const onClickTyping = (e: any) => {
    setTyping(e.target.checked);
    setWorkSelected(
      (oldWork: { cards: string; canStart: boolean; reverse: boolean }) => ({
        ...oldWork,
        typing: e.target.checked,
      })
    );
    return;
  };

  return (
    <div className="flex space-y-8 flex-col justify-center text-3xl ">
      <label className="flex space-x-6 items-center">
        <h1>Cards to study</h1>
        <select
          className="rounded-lg border border-gray-400 text-gray-800"
          onChange={onChangeSelectCards}
        >
          <option value="all">All</option>
          <option value="fav">Fav</option>
          <option value="wrong">Wrong</option>
        </select>
      </label>
      <label className="flex space-x-6 items-center">
        <h1>Randomly reverse</h1>
        <div>
          <InputCheckbox checked={reverse} onChange={onChangeReverse} />
        </div>
      </label>
      <label className="flex space-x-6 items-center">
        <h1>Typing</h1>
        <div>
          <InputCheckbox checked={typing} onChange={onClickTyping} />
        </div>
      </label>
      <div className="font-bold">Cards : {count}</div>
      <button
        onClick={onClickStartLearn}
        className="rounded-lg w-4/5 px-4 py-4 bg-gray-600 font-bold text-white"
      >
        Start learning
      </button>
    </div>
  );
};

export default WorkSelect;
