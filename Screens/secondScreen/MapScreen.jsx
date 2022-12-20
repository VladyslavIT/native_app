import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../theme";

export default function MapScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: colors.primaryText,
  },
});
