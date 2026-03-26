import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/src/constants/Colors";

export default function MotivationBlock() {
  return (
    <LinearGradient
      colors={[colors.accent, colors.card]}
      // start={{ x: 0, y: 0 }}
      // end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* <Text style={styles.emoji}>🔥</Text> */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.emoji}
      />
      <Text style={styles.heading}>Arena Mode: ON</Text>
      <Text style={styles.subtext}>
        Step into the arena, push past limits, and own your game!
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  emoji: {
    height:70,
    width: 70,
    marginBottom: 6,
  },
  heading: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  subtext: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: "center",
    lineHeight: 20,
  },
});
