import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { colors } from "@/src/constants/Colors";
import { shadows } from "@/src/constants/shadows";
import { router } from "expo-router";

export default function ActionCards({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.container, style]}>
    
      <TouchableOpacity style={styles.card} onPress={()=>router.push('/(tabs)/Play')}>
     <Image
  source={{ uri: "https://cdn-icons-png.flaticon.com/512/854/854878.png" }} 
  style={styles.image}
  
/>
        <Text style={styles.title}>Play</Text>
        <Text style={styles.subtitle}>
          Jump into matches and challenge players now.
        </Text>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.card} onPress={()=>router.push('/(tabs)/Book')}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/747/747310.png" }}
          style={styles.image}
        />
        <Text style={styles.title}>Book</Text>
        <Text style={styles.subtitle}>
          Reserve your arena slot with just one tap.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 15,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    alignItems: "center",
    padding: 15,
    width: 150,
    ...shadows.medium,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 12,
    tintColor: colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
