import React from 'react';
import { IMaskNativeMixin } from 'react-native-imask';
import { TextInput } from 'react-native';

const InputPhone = (props) => {
  // const InputComponent = IMaskNativeMixin(({ inputRef, ...props }) => (
  //   <TextInput ref={inputRef} {...props} />
  // ));

  return (
    <TextInput
      mask="+{38 }(000) 000 00 00"
      maxLength={19}
      placeholder="+38 (0••) ••• •• ••"
      placeholderTextColor="rgba(36, 168, 172, 0.4)"
      textContentType="telephoneNumber"
      keyboardType="numeric"
      {...props}
    />
  );
};

// export default React.memo(InputPhone, (props, nextProps) => {
//   if (props.value === nextProps.value) {
//     return true;
//   }
// });

export default InputPhone;
