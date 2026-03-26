import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/context/AuthContext";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/src/config/FirebaseConfig";
import { router } from "expo-router";
import { shadows } from "@/src/constants/shadows";
import { MotiView } from "moti";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [privacyVisible, setPrivacyVisible] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/SignIn");
  };

  const handleNav = async () => {
    Alert.alert("Logout", "Are You Sure You Want to Logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => handleLogout() },
    ]);
  };

  const menuItems = [
    {
      title: "Create Arena",
      icon: <AntDesign name="pluscircleo" size={22} color={colors.primary} />,
      onPress: () => router.replace("/(tabs)/Home"),
    },
    {
      title: "My Arenas",
      icon: <Feather name="book-open" size={22} color={colors.primary} />,
      onPress: () => router.replace("/(tabs)/MyArenas" as any),
    },
    {
      title: "Explore Events",
      icon: (
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={colors.primary}
        />
      ),
      onPress: () => router.replace("/(tabs)/Explore" as any),
    },
    {
      title: "Privacy Policy",
      icon: (
        <MaterialCommunityIcons
          name="shield-lock-outline"
          size={22}
          color={colors.primary}
        />
      ),
      onPress: () => setPrivacyVisible(true),
    },
    {
      title: "Logout",
      icon: <AntDesign name="logout" size={22} color={colors.primary} />,
      onPress: handleNav,
    },
  ];

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
        style={styles.profileHeader}
      >
        <Image
          source={{
            uri:
              user?.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || "Arena Player"}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
      </MotiView>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 200 + index * 150, duration: 500 }}
          >
            <TouchableOpacity
              style={[
                styles.menuItem,
                item.title === "Logout" && { borderColor: colors.card },
              ]}
              onPress={item.onPress}
            >
              {item.icon}
              <Text
                style={[
                  styles.menuText,
                  item.title === "Logout" && { color: colors.textPrimary },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </MotiView>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={privacyVisible}
        onRequestClose={() => setPrivacyVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Privacy Policy</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.modalText}>
                Welcome to Arena One!{"\n\n"}
                We value your privacy. Your personal information (name, email,
                and profile image) is used only for providing app features like
                creating arenas, joining events, and syncing your data across
                devices.{"\n\n"}- We do not sell your data.{"\n"}- We use
                Firebase Authentication and Firestore for secure data handling.
                {"\n"}- You can request account deletion anytime by contacting
                support.{"\n\n"}
                By using Arena One, you agree to this Privacy Policy.
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPrivacyVisible(false)}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  profileHeader: { alignItems: "center", marginTop: 60, marginBottom: 40 },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2.5,
    borderColor: colors.primary,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
    color: colors.textPrimary,
  },
  profileEmail: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  menu: { marginTop: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.card,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 12,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: "100%",
    ...shadows.medium,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: colors.textPrimary,
  },
  modalText: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  closeBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  closeBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
