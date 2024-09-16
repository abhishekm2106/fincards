import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "../constants/images";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isLoading}
      activeOpacity={0.7}
      className={`rounded-3xl border-2 border-primary bg-white border-solid px-4 py-2 ${containerStyles}
        ${isLoading ? "opacity-50" : ""}`}
    >
      <Text className={`text-primary text-xs font-semibold  ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
