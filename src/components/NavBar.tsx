import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function TopBar() {
  const {user} = useAuth()
  // console.log(user)
  return (
    <View style={styles.container}>
      <View style={styles.locationColumn}>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={20} color="#ff4757" />
          <Text style={styles.locationText}>Mumbai</Text>
        </View>
        <Text style={styles.tagline}>Welcome to the Arena, {user?.name}⚡</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/(tabs)/Profile")}>
        <Image
          source={{
            uri: user?.profileImage,
          }}
          style={styles.profileImg}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  locationColumn: {
    flexDirection: "column",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  tagline: {
    fontSize: 13,
    color: "#aaa",
    marginLeft: 26,
    marginTop: 2,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ff4757",
  },
});
