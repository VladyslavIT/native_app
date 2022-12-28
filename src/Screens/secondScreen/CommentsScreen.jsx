import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import colors from "../../../theme";

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
});
