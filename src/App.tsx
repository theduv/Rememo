import AppRouter from "./Components/AppRouter";
import { DataContext } from "./Contexts/Data";
const fs = window.require("fs");

const data = fs.readFileSync("src/data/decks.json", "utf8");
const parsedDecks = JSON.parse(data);

function App() {
  return (
    <DataContext.Provider value={parsedDecks}>
      <AppRouter />
    </DataContext.Provider>
  );
}

export default App;
