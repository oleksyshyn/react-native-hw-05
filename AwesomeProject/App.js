import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import Registration from "./screens/RegistrationScreen";
import Login from "./screens/LoginScreen";
import Home from './screens/Home';
import MapScreen from './screens/MapScreen';
import CommentsScreen from './screens/CommentsScreen';
// import BgImage from "./assets/bg-image.jpg";

const MainStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={BgImage} style={styles.backgroundImage}> */}
      <NavigationContainer>
        <MainStack.Navigator
          initialRouteName="Увійти"
          screenOptions={{ headerShown: false }}
        >
          <MainStack.Screen name="Реєстрація" component={Registration} />
          <MainStack.Screen name="Увійти" component={Login} />
          <MainStack.Screen name="Пости" component={Home} />
          <MainStack.Screen name="Карта" component={MapScreen} />
          <MainStack.Screen name="Коментарі" component={CommentsScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
      {/* </ImageBackground> */}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "flex-end",
  // },
});

export default App;