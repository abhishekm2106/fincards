import { View, Text } from "react-native";
import React from "react";

const WhiteText = (props) => {
  const { children, className, ...rest } = props;
  return (
    <Text className={`text-white ${className}`} {...rest}>
      {props.children}
    </Text>
  );
};

export default WhiteText;
