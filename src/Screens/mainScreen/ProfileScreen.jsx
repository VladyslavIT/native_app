import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase/config";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../../../theme";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState();
  const { userId, nickname } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    let user = [];
    try {
      const filter = query(
        collection(db, "users"),
        where("userId", "==", `${userId}`)
      );
      const querySnapshot = await getDocs(filter);
      querySnapshot.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      setPosts(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../../assets/background.jpeg")}
      >
        <View style={styles.box}>
          <Text style={styles.text}>ProfileScreen</Text>
          <FlatList
            style={{ backgroundColor: colors.primaryBg }}
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={styles.post}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <View style={styles.wrapper}>
                  <View style={styles.buttonBox}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comment", {
                          postId: item.id,
                          uri: item.photo,
                        })
                      }
                      activeOpacity={0.8}
                      style={styles.button}
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
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  text: {
    marginBottom: 24,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: colors.primaryText,
  },
  post: {
    justifyContent: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
