import * as React from "react";

interface ButtonProps {
  title: string;
  time?: number;
  onClick: (time?: number) => void;
}

function Button({ title, time, onClick }: ButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <span className={"button"} onClick={() => onClick(time)}>
      {title}
    </span>
  );
}

export default Button;
