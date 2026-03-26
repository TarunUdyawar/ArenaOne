import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MarqueeView from "react-native-marquee-view";
import { colors } from "@/src/constants/Colors";

export default function MarqueeBanner() {
  return (
    <View style={styles.container}>
      <MarqueeView
        style={{ width: "100%", height: 40 }}
        speed={0.3}
      >
        <Text style={styles.marqueeText}>
          🏆 Arena One – Legends aren’t born, they’re made here. | ⚡ Clash of
          Champions: Who Will Rule the Arena?
        </Text>
      </MarqueeView>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          height: 150,
          width: 150,
          marginBottom:-10
        }}
      />
      <Text style={{
        color:colors.textSecondary,

      }}>Keep Yourself Fit!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.card,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  marqueeText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
