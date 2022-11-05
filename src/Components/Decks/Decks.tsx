import { useEffect } from "react";
import useDecksStore from "../../stores/decks";
import Header from "../Header/Header";
import CreateBar from "./CreateBar";
import DecksListSettings from "./DecksListSettings";
import NoDeck from "./NoDeck";
const ipcRenderer = window.require("electron").ipcRenderer;

const Decks = () => {
  const decks = useDecksStore((state: any) => state.decks);

  useEffect(() => {
    ipcRenderer.send("changeDeck", {
      title: "Editing decks",
      deck: "undefined",
    });
  }, []);

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
