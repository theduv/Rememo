import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Decks from "./Decks/Decks";
import SingleDeckSettings from "./Decks/Edit/SingleDeckSettings";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";
import SingleDeck from "./SingleDeck/SingleDeck";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deck/:id" element={<SingleDeck />} />
        <Route path="/decks" element={<Decks />} />
        <Route path="/decks/edit/:id" element={<SingleDeckSettings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
