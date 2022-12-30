import clsx from "clsx";
import React, { useState, useRef } from "react";
import { Plus } from "react-feather";
import { BiImport } from "react-icons/bi";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import useDecksStore from "../../stores/decks";
import useSettingsStore from "../../stores/settings";
import "react-toastify/dist/ReactToastify.css";

const CreateBar = () => {
  const [deckName, setDeckName] = useState("");
  const decks = useDecksStore((state: any) => state.decks);
  const settings = useSettingsStore((state: any) => state.settings);
  const setDecks = useDecksStore((state: any) => state.setDecks);
  const setSomethingChanged = useDecksStore(
    (state: any) => state.setSomethingChanged
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClickImport = (e: any) => {
    if (fileRef.current) fileRef.current.click();
  };

  const logFile = (e: ProgressEvent<FileReader>) => {
    if (e && e.target) {
      let str = e.target.result;
      if (typeof str === "string") {
        let json = JSON.parse(str);
        setDecks([...decks, { ...json, id: uuid() }]);
        toast("File successfully imported !", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const handleChangeInput = async (e: any) => {
    const fileUploaded = e.target.files[0];
    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(fileUploaded);
    console.log(fileUploaded);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeckName(e.target.value);
  };

  const onClickPlus = () => {
    if (deckName.length === 0) return;
    const oldDecks = [...decks];
    oldDecks.push({ id: uuid(), name: deckName, cards: [] });
    setDecks([...oldDecks]);
    setSomethingChanged(true);
    setDeckName("");
  };

  return (
    <div className="flex space-x-4 items-center">
      <input
        placeholder="New deck name"
        className={clsx("px-4 py-2 bg-gray-100 rounded-lg", {
          "text-gray-200 bg-gray-700 placeholder:text-gray-200 ":
            settings.darkMode,
        })}
        value={deckName}
        onChange={onChangeName}
      />
      <Plus onClick={onClickPlus} className="cursor-pointer" />
      <BiImport
        onClick={handleClickImport}
        className="text-2xl cursor-pointer"
      />
      <input
        onChange={handleChangeInput}
        ref={fileRef}
        type="file"
        style={{ display: "none" }}
        accept=".d.json"
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default CreateBar;
