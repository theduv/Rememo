import React from "react";
import useSettingsStore from "../../stores/settings";
import Header from "../Header/Header";
import CheckableSetting from "./CheckableSetting";

const Settings = () => {
  const settings = useSettingsStore((state: any) => state.settings);
  const setSettings = useSettingsStore((state: any) => state.setSettings);
  const setSomethingChanged = useSettingsStore(
    (state: any) => state.setSomethingChanged
  );

  const onChangeFavOnAdd = (event: React.ChangeEvent) => {
    setSettings({ ...settings, favOnAdd: !settings.favOnAdd });
    setSomethingChanged(true);
  };

  return (
    <div>
      <Header title={"Settings"} />
      <div className="p-12">
        <CheckableSetting
          content="Fav card on create"
          isChecked={settings.favOnAdd}
          onChange={onChangeFavOnAdd}
        />
      </div>
    </div>
  );
};

export default Settings;
