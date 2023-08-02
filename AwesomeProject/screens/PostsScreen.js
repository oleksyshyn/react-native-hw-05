import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import userPhoto from "../assets/user-photo.jpg";
import posts from "../source/posts";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userContainer}>
          <Image source={userPhoto} style={styles.userPhoto} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.userEmail}>email@example.com</Text>
          </View>
        </View>
        {posts.map(({ id, image, name, comments, geoLocation, location }) => (
          <View key={id} style={styles.postsContainer}>
            <Image source={image} style={styles.postImage} />
            <Text style={styles.postName}>{name}</Text>
            <View style={styles.postInfo}>
              <View>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Коментарі", {
                      comments: comments,
                      image: image,
                    })
                  }
                >
                  {comments.length > 0 ? (
                    <FontAwesome name="comment" size={18} color="#FF6C00" />
                  ) : (
                    <FontAwesome name="comment-o" size={18} color="#BDBDBD" />
                  )}
                  <Text style={styles.infoComments}>{comments.length}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Карта", { geoLocation: geoLocation })
                  }
                >
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.infoLink}>{location}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
  userContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  postsContainer: {
    paddingHorizontal: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 15,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    marginTop: 8,
    fontSize: 16,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
    marginLeft: 6,
  },
  infoLink: {
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default PostsScreen;