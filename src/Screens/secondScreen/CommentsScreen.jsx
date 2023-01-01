import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import colors from "../../../theme";

export default function CommentsScreen({ route }) {
  const { uri, postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);

  const getAllComments = async () => {
    let comments = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", `${postId}/comment`)
      );
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      setAllComments(comments);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    Keyboard.dismiss();
    if (postId) {
      try {
        const docRef = await addDoc(
          collection(db, "users", `${postId}/comment`),
          {
            comment,
            nickname,
          }
        );
        setComment("");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: uri }} style={{ width: 360, height: 200 }} />
      <View>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.nickname}>{item.nickname}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholder="Коментувати..."
        />
        <TouchableOpacity
          onPress={createComment}
          activeOpacity={0.8}
          style={styles.button}
        ></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-evenly",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondaryText,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    width: 24,
    marginRight: 8,
    borderRadius: 100,

    backgroundColor: colors.accent,
  },
  nickname: {
    marginBottom: 8,
    borderColor: colors.secondaryText,
  },
  comment: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.secondaryText,
  },
});
