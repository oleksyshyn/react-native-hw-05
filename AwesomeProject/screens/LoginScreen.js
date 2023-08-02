import { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BgImage from "../assets/bg-image.jpg";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [isPasswordShow, setIsPasswordShow] = useState(true);
    const [isKeyboardShow, setIsKeyboardShow] = useState(false);

    const handleEmail = (text) => setEmail(text);
    const handlePassword = (text) => setPassword(text);

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
        setIsKeyboardShow(true);
    }

    const handleEmailBlur = () => {
        setIsEmailFocused(false);
    }

    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
        setIsKeyboardShow(true);
    }

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    }

    const showPasswordToggle = () => {
        setIsPasswordShow(!isPasswordShow);
    };

    const keyBoardHide = () => {
        setIsKeyboardShow(false);
        Keyboard.dismiss();
    };

    const navigation = useNavigation();

    const onLogin = () => {
        if (!email || !password) {
          alert("Please fill all fields");
          return;
        };
        console.log(`Email: ${email}, password: ${password}`);
        setEmail('');
        setPassword('');
        navigation.navigate("Пости");
    };

    return (
      <ImageBackground source={BgImage} style={styles.backgroundImage}>
        <TouchableWithoutFeedback onPress={keyBoardHide}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Увійти</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  value={email}
                  placeholder="Адреса електронної пошти"
                  onChangeText={handleEmail}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  style={{
                    ...styles.input,
                    borderColor: isEmailFocused ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isEmailFocused ? "#FFFFFF" : "#F6F6F6",
                  }}
                />
                <View
                  style={{
                    ...styles.showPasswordContainer,
                    marginBottom: isKeyboardShow ? 120 : 89,
                  }}
                >
                  <TextInput
                    value={password}
                    placeholder="Пароль"
                    onChangeText={handlePassword}
                    secureTextEntry={isPasswordShow}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    style={{
                      ...styles.input,
                      borderColor: isPasswordFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isPasswordFocused
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                  />
                  <TouchableOpacity
                    onPress={showPasswordToggle}
                    accessibilityLabel="Показати пароль"
                  >
                    <Text style={styles.showPasswordText}>Показати</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
              accessibilityLabel="Увійти"
              onPress={onLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="Немає акаунту? Зареєструватися"
              onPress={() => navigation.navigate("Реєстрація")}
              style={{
                marginBottom: isKeyboardShow ? 225 : 148,
              }}
            >
              <Text style={styles.loginLink}>
                Немає акаунту? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  loginContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 32,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    width: "100%",
    fontFamily: "Roboto-Regular",
    height: 50,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  showPasswordContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    border: "1px solid #E8E8E8",
    position: "relative",
  },
  showPasswordText: {
    position: "absolute",
    fontFamily: "Roboto-Regular",
    top: 14,
    right: 16,
    height: 25,
    fontSize: 16,
    color: "#1B4371",
  },
  loginButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: "100%",
    height: 48,
    borderRadius: 100,
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  loginLink: {
    color: "#1B4371",
    fontSize: 16,
    textDecorationLine: "none",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});

export default Login;