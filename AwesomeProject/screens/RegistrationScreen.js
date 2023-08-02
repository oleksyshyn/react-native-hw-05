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
  Pressable,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import BgImage from "../assets/bg-image.jpg";

const Registration = () => {
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoginFocused, setIsLoginFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [isPasswordShow, setIsPasswordShow] = useState(true);
    const [isKeyboardShow, setIsKeyboardShow] = useState(false);

    const handleLogin = (text) => setLogin(text);
    const handleEmail = (text) => setEmail(text);
    const handlePassword = (text) => setPassword(text);

    const handleLoginFocus = () => {
        setIsLoginFocused(true);
        setIsKeyboardShow(true);
    }

    const handleLoginBlur = () => {
        setIsLoginFocused(false);
    }

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

    const onRegister = () => {
        if (!login || !email || !password) {
            alert("Please fill all fields");
            return;
        };

        console.log(`Login: ${login}, email: ${email}, password: ${password}`);
        setLogin('');
        setEmail('');
        setPassword('');
        navigation.navigate("Публікації");
    };

    return (
      <ImageBackground source={BgImage} style={styles.backgroundImage}>
        <TouchableWithoutFeedback onPress={keyBoardHide}>
          <View style={styles.registerContainer}>
            <View style={styles.avatar}>
              <Pressable style={styles.addButton}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </Pressable>
            </View>
            <Text style={styles.registerTitle}>Реєстрація</Text>

            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View>
                <TextInput
                  value={login}
                  placeholder="Логін"
                  onChangeText={handleLogin}
                  onFocus={handleLoginFocus}
                  onBlur={handleLoginBlur}
                  style={[
                    styles.input,
                    {
                      borderColor: isLoginFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isLoginFocused ? "#FFFFFF" : "#F6F6F6",
                    },
                  ]}
                />
                <TextInput
                  value={email}
                  placeholder="Адреса електронної пошти"
                  onChangeText={handleEmail}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  style={[
                    styles.input,
                    {
                      borderColor: isEmailFocused ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isEmailFocused ? "#FFFFFF" : "#F6F6F6",
                    },
                  ]}
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
                    style={[
                      styles.input,
                      {
                        borderColor: isPasswordFocused ? "#FF6C00" : "#E8E8E8",
                        backgroundColor: isPasswordFocused
                          ? "#FFFFFF"
                          : "#F6F6F6",
                      },
                    ]}
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
              accessibilityLabel="Зареєструватися"
              onPress={onRegister}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>Зареєструватися</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityLabel="Вже є акаунт? Увійти"
              onPress={() => navigation.navigate("Увійти")}
              style={{
                marginBottom: isKeyboardShow ? 200 : 78,
              }}
            >
              <Text style={styles.loginLink}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  registerContainer: {
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
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 16,
    transform: [{ translateY: -87 }, { translateX: 145 }],
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 14,
    right: -12,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
  },
  registerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginTop: 65,
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
  registerButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    width: "100%",
    height: 48,
    borderRadius: 100,
    marginBottom: 16,
  },
  registerButtonText: {
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

export default Registration;