import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import { useState } from "react";
import colors from "../../../theme";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  if (photo) {
    const savePhoto = () => {
      navigation.navigate("Info", { photo });
      setPhoto("");
    };
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={{ uri: photo }} />
        <View style={styles.btnBox}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text} onPress={savePhoto}>
              Зберегти
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text} onPress={() => setPhoto(null)}>
              Видалити
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <Camera style={styles.container} ref={setCamera}>
      <View style={styles.box}>
        <TouchableOpacity onPress={takePhoto}>
          <View style={styles.takePhotoWrapper}>
            <View style={styles.takePhotoInner}></View>
          </View>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  takePhotoWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
  },
  takePhotoInner: {
    height: 50,
    width: 50,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 35,
    marginHorizontal: 10,
  },
  button: {
    width: "50%",
    height: "100%",
    backgroundColor: colors.accent,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.primaryBg,
  },
});
