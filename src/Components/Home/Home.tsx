import Header from "../Header/Header";
import DecksList from "./DecksList/DecksList";

const Home = () => {
  return (
    <div>
      <Header title={"Decks list"} />
      <div className="h-full p-8 my-auto text-center flex flex-col justify-center items-center">
        <DecksList />
      </div>
    </div>
  );
};

export default Home;
