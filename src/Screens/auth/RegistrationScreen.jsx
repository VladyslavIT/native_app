import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button
} from "react-native";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import colors from "../../../theme";


const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({navigation}) {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();

  const addInputValue = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        style={styles.image}
        source={require("../../../assets/background.jpeg")}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.box}>
            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.form}>
              <TextInput
                onChangeText={(value) => addInputValue("login", value)}
                style={[styles.input]}
                placeholder="Ім'я"
                value={state.login}
              />
              <TextInput
                onChangeText={(value) => addInputValue("email", value)}
                style={[styles.input]}
                placeholder="Електронна пошта"
                value={state.email}
                autoCorrect={false}
              />
              <View style={[styles.input]}>
                <TextInput
                  onChangeText={(value) => addInputValue("password", value)}
                  style={{ flex: 1 }}
                  secureTextEntry={true}
                  placeholder="Пароль"
                  value={state.password}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.8}
              style={styles.button}
            >
              <Text onPress={() => navigation.navigate('Home')} style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('Login')} style={styles.textLogIn}>Вже є акаунт? Ввійти</Text>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 92,
    fontSize: 16,
    fontFamily: "Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.primaryBg,
  },
  title: {
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Medium",
    color: colors.primaryText,
  },
  form: {
    marginHorizontal: 16,
    marginBottom: 27,
  },
  input: {
    flexDirection: "row",
    marginBottom: 16,
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.secondaryBg,
    placeholderTextColor: colors.secondaryText,
    fontFamily: "Regular",
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.accent,
    justifyContent: "center",
    fontFamily: "Regular",
  },
  buttonText: {
    textAlign: "center",
    color: colors.primaryBg,
  },
  textLogIn: {
    marginBottom: 78,
    textAlign: 'center',
    color: colors.link,
    fontFamily: 'Regular',
    backgroundColor: 'transparent',
  },
});
