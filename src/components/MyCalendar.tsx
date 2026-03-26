import React from "react";
import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/src/constants/Colors";
import { shadows } from "@/src/constants/shadows";

export const MyCalendarBlock = ({ style }: { style?: StyleProp<ViewStyle> }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
    >
      <Text style={styles.text}>
        My Calendar
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginTop: 30,
    alignItems: "center",
    width: '85%',
    margin: 'auto',
    ...shadows.medium,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: 'center',
  }
});


