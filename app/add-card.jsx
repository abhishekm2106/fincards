import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import WhiteText from "../components/WhiteText";
import {
  CreditCardInput,
  CreditCardView,
  CreditCardFormField,
} from "react-native-credit-card-input";
import { Colors } from "../constants/Colors";

import useStorageData from "../hooks/useStorageData";
import { StorageKeys } from "../constants/Storage";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

const AddCard = () => {
  const [focusedField, setFocusedField] = useState();
  const [formData, setFormData] = useState();

  const { cardList, setData, isLoading } = useGlobalContext();

  useEffect(() => {
    if (formData?.valid) {
      const carNumber = formData.values.number.split(" ").join("").slice(8);
      let newData = { ...cardList, [formData.values.number]: formData.values };
      setData(newData);
      router.dismissAll();
    }
  }, [formData]);

  return (
    <ScrollView
      className="bg-primary pt-10"
      contentContainerStyle={{ alignItems: "center", gap: 20 }}
    >
      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        //   imageFront={require("../assets/images/splashscreen.png")}
      />
      <CreditCardInput
        style={{ width: "90%", marginTop: "4rem" }}
        labelStyle={{ color: Colors.dark.text }}
        inputStyle={{ color: Colors.dark.text }}
        autoFocus
        onChange={setFormData}
        onFocusField={setFocusedField}
      />
    </ScrollView>
  );
};

export default AddCard;
