import DeckPreview from "./DecksList/DeckPreview/DeckPreview";
import Header from "../Header/Header";
import DecksList from "./DecksList/DecksList";
const fs = window.require("fs");

const getDecks = () => {
  const data = fs.readFileSync("src/data/decks.json", "utf8");
  return JSON.parse(data);
};

const Home = () => {
  const decks = getDecks();

  return (
    <div>
      <Header title={"Decks list"} />
      <div className="h-full p-8 my-auto text-center flex flex-col justify-center items-center">
        <DecksList decks={decks} />
      </div>
    </div>
  );
};

export default Home;
