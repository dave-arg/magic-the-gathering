import { useState } from "react";
import "./BasicForm.css";
import Button from "./Button";

export function BasicForm({
  onClickCallback,
  label,
  placeholder,
}: {
  onClickCallback: (inputValue: string) => void;
  label: string;
  placeholder: string | undefined;
}) {
  const [inputValue, setInputvalue] = useState<string>("");

  const onclickHandler = () => {
    onClickCallback(inputValue);
    setInputvalue("");
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onclickHandler();
    }
  };

  return (
    <div className="basic-menu">
      <input
        className="form-input"
        placeholder={placeholder}
        type="text"
        value={inputValue}
        onKeyUp={onKeyPressHandler}
        onChange={(e) => setInputvalue(e.target.value)}
      />
      <Button onClick={onclickHandler} label={label} />
    </div>
  );
}
