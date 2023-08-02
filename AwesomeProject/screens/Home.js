import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons"; 
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CreatePostScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

function Posts() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PostsScreen/>
    </View>
  );
}

function CreatePost() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CreatePostScreen />
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ProfileScreen/>
    </View>
  );
}

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      initialRouteName="Публікації"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size = 24 }) => {
          let iconName;
          switch (route.name) {
            case "Публікації":
              iconName = focused ? "grid" : "grid-outline";
              break;

            case "Створити публікацію":
              iconName = focused ? "add-outline" : "add";
              break;

            case "Профіль":
              iconName = focused ? "person" : "person-outline";
              break;

            default:
              iconName = "grid";
              break;
          }

          return (
            <View
              style={{
                ...styles.iconElement,
                backgroundColor: focused ? "#FF6C00" : "transparent",
              }}
            >
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="Публікації"
        component={Posts}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Увійти")}>
              <Feather
                style={{ marginRight: 10 }}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePost}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Пости", { screen: "Публікації" })}>
              <AntDesign
                style={{ marginLeft: 16 }}
                name="arrowleft"
                size={24}
                color="#212121"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconElement: {
    color: "white",
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;