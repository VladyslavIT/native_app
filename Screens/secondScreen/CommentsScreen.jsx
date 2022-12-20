import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import colors from "../../theme";

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput style={styles.input} placeholder="Коментувати..." />
        <TouchableOpacity
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
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderColor: colors.secondaryText,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  button: {
    marginRight: 8,
    backgroundColor: colors.accent,
    height: 34,
    width: 34,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
