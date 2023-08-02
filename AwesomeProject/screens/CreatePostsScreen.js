import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons"; 
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import posts from "../source/posts";

const CreatePostScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [postPhoto, setPostPhoto] = useState("");
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState({});
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  const postNameHandler = (text) => setPostName(text.trim());
  const postLocationHandler = (text) => setPostLocation(text.trim());

  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const handleFocus = () => {
    setIsKeyboardShow(true);
  };

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
        if (hasPermission === null) {
          return <View />;
        }
        if (hasPermission === false) {
          return <Text>No access to camera</Text>;
        }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  const makePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // console.log(photo.uri);
      setPostPhoto(photo.uri);
    }
  };

  const isButtonDisabled = () => {
    return postPhoto ==="" || postName === "" || postLocation === "" ? true : false;
  };

  const onSubmitPost = async () => {
    console.log(postPhoto);
    const newPost = {
      id: posts.length + 2,
      image: postPhoto,
      name: postName,
      comments: 0,
      likes: 0,
      location: postLocation,
      geoLocation: geoLocation,
    };
    console.log(geoLocation);
    posts.push(newPost);
    navigation.navigate("Публікації", { newPost });
    clearPost();
  };

  const clearPost = () => {
    setPostName("");
    setPostLocation("");
    setPostPhoto("");
  };

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    };
    
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {postPhoto ? (
            <View style={styles.photoContainer}>
              <Image
                source={{ uri: postPhoto }}
                style={{ height: 240, width: "100%", borderRadius: 8 }}
              />
              <TouchableOpacity
                style={styles.newPhotoButton}
                onPress={() => setPostPhoto("")}
              >
                <FontAwesome
                  name="camera"
                  size={20}
                  color="rgba(255, 255, 255, 1)"
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.photoContainer}>
                <Camera
                  style={styles.camera}
                  ref={cameraRef}>
                <TouchableOpacity style={styles.postImage} onPress={makePhoto}>
                  <FontAwesome name="camera" size={20} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
            </View>
          )}

          <TouchableOpacity>
            <Text style={styles.postImageText}>
              {postPhoto ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </TouchableOpacity>
          <View>
            <TextInput
              value={postName}
              onChangeText={postNameHandler}
              style={styles.postInput}
              placeholder="Назва..."
              onFocus={handleFocus}
            />
            <View>
              <EvilIcons
                style={styles.locationIcon}
                name="location"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                value={postLocation}
                onChangeText={postLocationHandler}
                placeholder="Місцевість..."
                onFocus={handleFocus}
                style={{
                  ...styles.postInput,
                  paddingHorizontal: 28,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={onSubmitPost}
              style={[
                styles.postButton,
                isButtonDisabled() ? styles.invalidButton : styles.validButton,
              ]}
            >
              <Text
                style={[
                  styles.postButtonText,
                  isButtonDisabled()
                    ? styles.invalidButton
                    : styles.validButton,
                ]}
              >
                Опубліковати
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  imageContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  newPhotoButton: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  camera: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  postImage: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    color: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },
  postImageText: {
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  postInput: {
    fontFamily: "Roboto-Regular",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 10,
    left: 2,
  },
  postButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#F6F6F6",
    backgroundColor: "#F6F6F6",
  },
  postButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  validButton: {
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
  },
  invalidButton: {
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
});

export default CreatePostScreen;