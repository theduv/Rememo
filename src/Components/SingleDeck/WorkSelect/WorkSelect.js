const WorkSelect = ({ cards, setWorkSelected }) => {
  const getWrongCards = () => {
    const wrongCards = cards.filter((card) => card.lastResult === "wrong");
    return wrongCards.length;
  };

  const onClickAll = () => {
    setWorkSelected("all");
  };

  const onClickWrong = () => {
    setWorkSelected("wrong");
  };

  return (
    <div className="flex items-center justify-center space-x-12">
      <div
        onClick={onClickAll}
        className="cursor-pointer text-3xl rounded-lg border-2 border-gray-400 bg-green-200 p-24"
      >
        <h1>All cards ({cards.length})</h1>
      </div>
      <div
        onClick={onClickWrong}
        className="cursor-pointer text-3xl rounded-lg border-2 border-gray-400 bg-red-200 p-24"
      >
        <h1>Wrong cards ({getWrongCards()})</h1>
      </div>
    </div>
  );
};

export default WorkSelect;
