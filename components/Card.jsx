import { View, Text, Image, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import WhiteText from "./WhiteText";
import images from "../constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useGlobalContext } from "../context/GlobalProvider";
import * as Clipboard from "expo-clipboard";

const copyToClipboard = async (text) => {
  await Clipboard.setStringAsync(text);
  ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
};

const Card = ({ values }) => {
  return (
    <View className="w-full h-[232] bg-[#872244] pt-3 pb-2 pl-8 pr-4 rounded-lg justify-between">
      <View className="flex-row justify-end">
        <WhiteText className="font-bold">AXIS BANK</WhiteText>
      </View>
      <Image source={images.chip} className="w-12 h-9" />

      <View className="-mb-4">
        <View className="justify-center flex-row items-center gap-3">
          <WhiteText className=" text-xl">
            {values.number.split(" ").join("   ")}
          </WhiteText>
          <Ionicons
            onPress={() => copyToClipboard(values.number)}
            name="copy-outline"
            size={16}
            color="white"
          />
        </View>
        <View className="flex-row justify-center items-center gap-1">
          <WhiteText className="text-[7px]">VALID{"\n"}THRU</WhiteText>
          <WhiteText className="text-lg">{values.expiry}</WhiteText>
          <Ionicons
            onPress={() => copyToClipboard(values.expiry)}
            name="copy-outline"
            size={16}
            color="white"
          />
        </View>
      </View>

      <View className="flex-row justify-between">
        <WhiteText className="-mt-1 ml-5">ABHISHEK MOHANTY</WhiteText>
        <Image
          source={images.visaChip}
          className="w-14 h-6"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const CardContainer = ({ values }) => {
  const [visible, setVisible] = useState(false);
  const { cardList, setData, isLoading } = useGlobalContext();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const removeCard = () => {
    let temp = JSON.parse(JSON.stringify(cardList));
    delete temp[values.number];
    setData(temp);
    hideMenu();
  };

  return (
    <View>
      <View className="mb-4 mx-1 flex-row justify-between items-center">
        <WhiteText className="font-semibold">FLIPKART AXIS</WhiteText>
        <View className="flex-row justify-end ">
          <MaterialCommunityIcons
            name="axis-z-rotate-clockwise"
            size={24}
            color="white"
          />
          <View className="mx-3">
            <Ionicons name="share-social-outline" size={24} color="white" />
          </View>

          <Menu
            visible={visible}
            anchor={
              <Ionicons
                name="ellipsis-vertical"
                onPress={showMenu}
                size={24}
                color="white"
              />
            }
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={removeCard}>
              <View className="flex-row items-center gap-2 pb-2">
                <Ionicons name="remove-circle" size={20} color="black" />
                <Text>Remove</Text>
              </View>
            </MenuItem>

            {/* <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
            <MenuDivider />
            <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
          </Menu>
        </View>
      </View>
      <Card values={values} />
    </View>
  );
};

export default CardContainer;
