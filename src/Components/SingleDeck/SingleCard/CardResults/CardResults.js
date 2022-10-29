import { CheckCircle, XCircle } from "react-feather";

const CardResults = ({ onClickResult, clickedShow }) => {
  const onClickButton = () => {
    onClickResult((oldCard) => oldCard + 1);
  };

  return (
    <div className="flex space-x-12 justify-center">
      <button
        onClick={onClickButton}
        disabled={!clickedShow}
        className="text-gray-600 rounded-lg  text-sm"
      >
        <XCircle />
      </button>
      <button
        onClick={onClickButton}
        disabled={!clickedShow}
        className="text-gray-600 rounded-lg  text-sm"
      >
        <CheckCircle />
      </button>
    </div>
  );
};

export default CardResults;
