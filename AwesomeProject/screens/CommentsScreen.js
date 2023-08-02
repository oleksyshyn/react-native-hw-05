import React, {useState} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";


const CommentsScreen = ({ navigation, route }) => {
    const { comments, image } = route.params;
    const [isKeyboardShow, setIsKeyboardShow] = useState(false);
    const [comment, setComment] = useState("");

    const commentHandler = (text) => setComment(text);

    const handleFocus = () => {
        setIsKeyboardShow(true);
    };

    const keyboardHide = () => {
        setIsKeyboardShow(false);
        Keyboard.dismiss();
    };

    const onSubmitComment = () => {
        console.log(comment);
        setComment("");
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ScrollView style={styles.container}>
          <View>
            <View
              style={{
                backgroundColor: "white",
                height: 93,
                paddingTop: 48,
                position: "relative",
                borderBottomColor: "#E8E8E8",
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.arrowBack}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="#212121"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#212121",
                  fontFamily: "Roboto-Medium",
                  fontSize: 17,
                  padding: 11,
                  textAlign: "center",
                }}
              >
                Коментарі
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={image} style={styles.postImage} />
            </View>

            <View style={styles.commentsContainer}>
              {comments.map(({ id, photo, text, time }) => (
                <View key={id} style={styles.commentContainer}>
                  <Image source={photo} style={styles.avatar} />
                  <View style={styles.commentInfo}>
                    <Text style={styles.commentText}>{text}</Text>
                    <Text style={styles.commentTime}>{time}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                value={comment}
                onChangeText={commentHandler}
                placeholder="Коментувати..."
                onFocus={handleFocus}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={onSubmitComment}
                style={styles.submitComment}
              >
                <AntDesign name="arrowup" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    },
  arrowBack: {
    position: "absolute",
    top: 53,
    left: 16,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 15,
  },
  commentsContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
      marginBottom: 7,
  },
  commentContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentInfo: {
    width: 330,
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    color: "#212121",
  },
  commentTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
  },
  input: {
    width: "100%",
    fontFamily: "Roboto-Regular",
    height: 50,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputBox: {
    position: "relative",
    paddingHorizontal: 16,
  },
  submitComment: {
    position: "absolute",
    top: 8,
    right: 24,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommentsScreen;
