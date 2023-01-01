import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from "react-native";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import colors from "../../../theme";

export default function InfoScreen({ navigation, route }) {
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [photo, setPhoto] = useState(route.params.photo);

  const { userId, nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!photo) {
      navigation.navigate("Camera", { photo });
    }
  }, [photo]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Немає доступу до геолокації");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Зачекайте";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniquePostId = Date.now().toString();
      const photoRef = ref(storage, `${uniquePostId}`);
      uploadBytes(photoRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          uploadPostToServer(url);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadPostToServer = async (url) => {
    try {
      const createPost = await addDoc(collection(db, "users"), {
        photo: url,
        nickname,
        location: location.coords,
        userId,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPost = () => {
    Keyboard.dismiss();
    uploadPhotoToServer();
    navigation.navigate("InnerPosts", { location, photo, about });
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.imgBox}>
            <Image source={{ uri: photo }} style={styles.img} />
          </View>
          <View style={styles.form}>
            <TextInput
              onChangeText={setAbout}
              style={styles.input}
              value={about}
              placeholder="Пiдпис"
            />
            <View style={styles.locationBox}>
              <SimpleLineIcons
                style={styles.icon}
                name="location-pin"
                size={24}
                color={colors.secondaryText}
              />
              <TextInput
                style={styles.locationInput}
                placeholder="Геолокацiя"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={createPost}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Text style={styles.btnText}>Нова публікація</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
    justifyContent: "space-around",
  },
  imgBox: {
    alignItems: "center",
  },
  img: {
    height: 250,
    width: 250,
    resizeMode: "contain",
  },
  form: {
    marginBottom: 17,
  },
  input: {
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    fontSize: 16,
    borderColor: colors.secondaryText,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.secondaryText,
  },
  locationInput: {
    fontSize: 15,
  },
  icon: {
    paddingRight: 5,
  },
  button: {
    justifyContent: "center",
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 100,
    fontFamily: "Regular",
    backgroundColor: colors.accent,
  },
  btnText: {
    textAlign: "center",
    color: colors.primaryBg,
  },
});
