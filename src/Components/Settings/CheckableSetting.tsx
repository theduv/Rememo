import React from "react";

interface CheckableSettingProps {
  content: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent) => void;
}

const CheckableSetting = ({
  content,
  isChecked,
  onChange,
}: CheckableSettingProps) => {
  return (
    <label className="flex space-x-2 items-center">
      <h1 className="text-xl">{content}</h1>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
    </label>
  );
};

export default CheckableSetting;
