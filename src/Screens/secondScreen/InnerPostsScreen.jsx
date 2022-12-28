import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Entypo, SimpleLineIcons, Feather } from "@expo/vector-icons";
import colors from "../../../theme";
import { useEffect, useState } from "react";

export default function InnerPostsScreen({ navigation, route }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params) {
      setData((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <>
      <ImageBackground
        style={styles.image}
        source={require("../../../assets/background.jpeg")}
      >
        <View style={styles.box}>
          <View style={{ alignSelf: "flex-end" }}>
            <Entypo name="log-out" size={24} color={colors.secondaryText} />
          </View>
          <Text style={styles.text}>PostsScreen</Text>

          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <View style={styles.photoBox}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ width: 300, height: 200 }}
                  />
                  <Text>{item.about}</Text>
                </View>
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

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color={colors.secondaryText}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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
    paddingTop: 16,
    paddingBottom: 30,
    fontSize: 16,
    fontFamily: "Regular",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.primaryBg,
  },
  photoBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBox: {
    padding: 0,
    marginTop: 0,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    marginBottom: 24,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primaryText,
  },
});
