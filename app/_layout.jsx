import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Colors } from "../constants/Colors";
import * as LocalAuthentication from "expo-local-authentication";
import GlobalProvider from "../context/GlobalProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    DaysOne_400Regular: require("../assets/fonts/DaysOne-Regular.ttf"),
    BebasNeue_Regular: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    const authenticate = async () => {
      let d = await LocalAuthentication.authenticateAsync();
      if (d.error === "user_cancel") {
        setTimeout(authenticate, 100);
      }
      if (fontsLoaded && d.success) {
        SplashScreen.hideAsync();
      }
    };
    authenticate();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-card"
          options={{
            title: "Enter Card Details",
            headerStyle: {
              backgroundColor: Colors.dark.background,
            },
            headerTintColor: Colors.light.background,
          }}
        />
      </Stack>
    </GlobalProvider>
  );
}
