import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";

const MapScreen = ({ navigation, route }) => {
  const { geoLocation } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={1}
      >
        <Marker
          title="I was here"
          coordinate={{
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
          }}
        />
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            position: "absolute",
            top: 40,
            left: 20,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            width: 70,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
