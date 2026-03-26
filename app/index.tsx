import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { colors } from "@/src/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }, 1000);
    setTimeout(() => {
      router.replace('/landing');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.Image
        entering={FadeInDown.delay(1000).springify().damping(12)}
        source={require("../assets/images/splash.png")}
        style={styles.splash}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  splash: {
    height: 420,
    width: 420,
  },
});
