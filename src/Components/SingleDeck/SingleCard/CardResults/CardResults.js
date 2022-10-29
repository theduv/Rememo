import { CheckCircle, XCircle } from "react-feather";

const CardResults = ({ onClickResult, clickedShow }) => {
  const onClickCorrect = () => {
    onClickResult((oldCard) => oldCard + 1);
  };

  const onClickIncorrect = () => {
    onClickResult((oldCard) => oldCard + 1);
  };

  return (
    <div className="flex space-x-12 justify-center">
      <XCircle
        onClick={onClickIncorrect}
        width={32}
        height={32}
        className="text-gray-500"
      />
      <CheckCircle
        onClick={onClickCorrect}
        width={32}
        height={32}
        className="text-gray-500"
      />
    </div>
  );
};

export default CardResults;
