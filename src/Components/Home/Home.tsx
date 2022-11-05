import { useEffect } from "react";
import Header from "../Header/Header";
import DecksList from "./DecksList/DecksList";
const ipcRenderer = window.require("electron").ipcRenderer;

const Home = () => {
  useEffect(() => {
    ipcRenderer.send("changeDeck", {
      title: "Main menu",
      deck: "undefined",
    });
  }, []);

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
