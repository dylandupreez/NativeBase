import React from "react";
import { TouchableOpacity, View } from "react-native";

export const Button = props => {
  return (
    <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>
  );
};
//export default Button;
