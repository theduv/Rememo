import useDecksStore from "../../stores/decks";
import Header from "../Header/Header";
import CreateBar from "./CreateBar";
import DecksListSettings from "./DecksListSettings";
import NoDeck from "./NoDeck";

const Decks = () => {
  const decks = useDecksStore((state: any) => state.decks);

  return (
    <div>
      <Header title={"Decks list"} />
      <div className="flex flex-col items-center space-y-8">
        <CreateBar />
        {decks.length ? <DecksListSettings /> : <NoDeck />}
      </div>
    </div>
  );
};

export default Decks;
