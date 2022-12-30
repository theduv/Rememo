interface InputCheckboxProps {
  checked: boolean;
  onChange: (e: any) => any;
}

const InputCheckbox = ({ checked, onChange }: InputCheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      className="w-6 h-6 rounded-md accent-purple-600"
      onChange={onChange}
    />
  );
};

export default InputCheckbox;
