import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Entypo, SimpleLineIcons, Feather } from "@expo/vector-icons";
import colors from "../../theme";

export default function InnerPostsScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/background.jpeg")}
      >
        <View style={styles.box}>
          <View style={{ alignSelf: "flex-end" }}>
            <Entypo name="log-out" size={24} color={colors.secondaryText} />
          </View>
          <Text style={styles.nameUser}>PostsScreen</Text>
          <View style={styles.buttonBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Comment")}
              activeOpacity={0.8}
            >
              <Feather
                name="message-circle"
                size={24}
                color={colors.secondaryText}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Map")}>
              <SimpleLineIcons
                name="location-pin"
                size={24}
                color={colors.secondaryText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
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
    height: "90%",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 30,
    fontSize: 16,
    fontFamily: "Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.primaryBg,
  },
  buttonBox: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  nameUser: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: colors.primaryText,
  },
});
