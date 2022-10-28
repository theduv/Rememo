import { Delete, XCircle } from "react-feather";

const CardsList = ({ cards }) => {
  return (
    <div className="flex items-center justify-center mt-8 max-w-1/4">
      <div className="grid grid-cols-3 gap-x-32 gap-y-4 items-center">
        <h1 className="py-2 px-4 italic rounded-lg">Front</h1>
        <h1 className="py-2 px-4 italic rounded-lg">Back</h1>
        <div></div>
        {cards.map((card) => (
          <>
            <div className="py-1 px-3 rounded-lg">{card.front}</div>
            <div className="py-1 px-3 rounded-lg">{card.back}</div>
            <div className="text-gray-500 cursor-pointer" onClick={() => {}}>
              <XCircle />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default CardsList;
