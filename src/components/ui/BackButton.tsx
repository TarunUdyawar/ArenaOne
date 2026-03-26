import React from "react";
import {
  Text,
  Pressable,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/constants/Colors";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface BackButtonProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
}

export default function BackButton({ title, style }: BackButtonProps) {
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  // Hide automatically on root tabs
  if (segments[0] === "(tabs)") {
    return null;
  }

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/Play");
    }
  };

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={[
        styles.container,
        { top: insets.top + 6 }, // safe-area positioning fix
        style,
      ]}
    >
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          {
            opacity: pressed ? 0.7 : 1,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          },
        ]}
      >
        <BlurView
          intensity={Platform.OS === "ios" ? 40 : 80}
          tint="dark"
          style={styles.blurContainer}
        >
          <Ionicons name="arrow-back" size={22} color={colors.primary} />
          {title && <Text style={styles.title}>{title}</Text>}
        </BlurView>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    zIndex: 999,
  },

  button: {
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(233, 30, 99, 0.4)",
  },

  blurContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(20, 20, 20, 0.6)",
  },

  title: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 6,
  },
});
