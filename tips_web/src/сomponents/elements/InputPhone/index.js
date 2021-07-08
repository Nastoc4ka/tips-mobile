import React, { useCallback, useState } from "react";
import { Error } from "../Input";
import InputPhone from "./InputPhone";

const InputPhoneWrapper = ({ handleFocus, error, ...props }) => {
  const [input, setInput] = useState(null);

  const inputRef = useCallback((node) => {
    if (node && !input) setInput(node);
  });

  const onClick = (e) => {
    handleFocus(e);
    input.focus();
  };

  return (
    <div className="input" name={props.name} onClick={onClick}>
      <InputPhone {...props} inputRef={inputRef} />
      <Error error={error} />
    </div>
  );
};

export default InputPhoneWrapper;
