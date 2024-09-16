import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import images from "../constants/images";
import Card from "../components/Card";
import WhiteText from "../components/WhiteText";
import { router } from "expo-router";
import useStorageData from "../hooks/useStorageData";
import { StorageKeys } from "../constants/Storage";
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Index() {
  const { cardList, setData, isLoading } = useGlobalContext();

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary min-h-full">
        <View className="flex-row w-full justify-between h-44">
          <View className="bg-white w-[54%] pt-20 flex-row justify-center rounded-br-3xl relative">
            <View>
              <Text className="font-DaysOne_400Regular text-2xl">FinCARDS</Text>
              <Text className=" text-sm">easy access to your cards! </Text>
            </View>

            <View className="absolute -bottom-10 -right-[62] flex-row items-end">
              <View className="bg-white rounded-full items-center justify-center w-10 h-10">
                <Text className="font-extrabold  text-primary">
                  {Object.entries(cardList || {}).length}
                </Text>
              </View>

              <WhiteText className="mb-[6px] font-BebasNeue_Regular ml-1">
                CARDS
              </WhiteText>
            </View>
          </View>

          <View className="bg-white w-[41%] pt-[88px] flex-row justify-center items-start rounded-bl-3xl">
            <View className="relative">
              <Image
                source={images.cardIcon}
                className="absolute h-6 w-7 -right-4 top-[6]"
                resizeMode="contain"
              />
              <CustomButton
                title="Add Card"
                containerStyles="z-10"
                handlePress={() => router.push("/add-card")}
              />
            </View>
          </View>
        </View>

        <View className="px-4 py-16 " style={{ gap: 40 }}>
          {Object.entries(cardList || {}).map(([key, value]) => (
            <Card key={key} values={value} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
