import React from "react";
import { IMaskMixin } from "react-imask";
import { Input } from "../Input";

const InputPhone = (props) => {
  const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
    <Input {...props} inputRef={inputRef} />
  ));

  return (
    <MaskedStyledInput
      {...props}
      label="Телефон"
      type="tel"
      variant="outlined"
      size="small"
      name="phoneNumber"
      mask="+{38 }(000) 000 00 00"
    />
  );
};

export default React.memo(InputPhone, (props, nextProps) => {
  if (props.value === nextProps.value) return true;
});
