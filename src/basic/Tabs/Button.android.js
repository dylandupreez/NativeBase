import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";

export const Button = props => {
  return (
    <TouchableWithoutFeedback
      {...props}
    >
      {props.children}
    </TouchableWithoutFeedback>
  );
};


//export default Button;
