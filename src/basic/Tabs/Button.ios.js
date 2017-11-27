import React from "react";

import { TouchableOpacity, View } from "react-native";

export const Button = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

