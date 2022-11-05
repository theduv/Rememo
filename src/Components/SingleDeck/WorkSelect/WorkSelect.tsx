import { Dispatch, SetStateAction, useState } from "react";

interface WorkSelectProps {
  setWorkSelected: Dispatch<
    SetStateAction<{ cards: string; canStart: boolean; reverse: boolean }>
  >;
  onClickStartLearn: () => void;
}

const WorkSelect = ({
  setWorkSelected,
  onClickStartLearn,
}: WorkSelectProps) => {
  const [reverse, setReverse] = useState(false);

  const onChangeSelectCards = (e: any) => {
    setWorkSelected(
      (oldWork: { cards: string; canStart: boolean; reverse: boolean }) => ({
        ...oldWork,
        cards: e.target.value,
      })
    );
  };

  const onChangeReverse = (e: any) => {
    return; //does nothing for the moment
  };

  return (
    <div className="flex  space-y-4 flex-col justify-center ">
      <label className="flex space-x-2 items-center">
        <h1>Cards to study</h1>
        <select
          className="rounded-lg border border-gray-400"
          onChange={onChangeSelectCards}
        >
          <option value="all">All</option>
          <option value="fav">Fav</option>
          <option value="wrong">Wrong</option>
        </select>
      </label>
      <label className="flex space-x-2 items-center">
        <h1>Randomly reverse</h1>
        <input type="checkbox" checked={reverse} onChange={onChangeReverse} />
      </label>
      <button
        onClick={onClickStartLearn}
        className="rounded-lg w-4/5 px-4 py-2 bg-gray-600 font-bold text-white"
      >
        Start learning
      </button>
    </div>
  );
};

export default WorkSelect;
