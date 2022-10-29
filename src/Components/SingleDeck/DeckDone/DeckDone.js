const DeckDone = ({ setCurrentCard }) => {
  const onClickAgain = () => {
    setCurrentCard(0);
  };

  return (
    <div className="flex flex-col items-center space-y-4 text-xl">
      <h1>You completed this deck ! </h1>
      <h1
        className="text-blue-400 font-bold cursor-pointer"
        onClick={onClickAgain}
      >
        Do it again
      </h1>
    </div>
  );
};

export default DeckDone;
