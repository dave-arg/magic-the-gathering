import React from "react";
import "./Button.css";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className="button">
      {label}
    </button>
  );
};

export default Button;
