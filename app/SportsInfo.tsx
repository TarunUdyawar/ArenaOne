import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import NavBar from "@/src/components/NavBar";
import { colors } from "@/src/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function SportsInfo() {
  const { SportInfo } = useLocalSearchParams();
  const sportsInfo = JSON.parse(SportInfo as string);

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <ScrollView>
        <Image
          source={{ uri: sportsInfo.image }}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{sportsInfo.Arena}</Text>
          <Text style={styles.subTitle}>{sportsInfo.sport}</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="people" size={20} color="#ff4747" />
              <Text style={styles.infoText}>
                {sportsInfo.maxPlayers} Players
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#ff4747" />
              <Text style={styles.infoText}>{sportsInfo.time}</Text>
            </View>
            {sportsInfo.date && (
              <View style={styles.infoRow}>
                <MaterialIcons name="date-range" size={20} color="#ff4747" />
                <Text style={styles.infoText}>{sportsInfo.date}</Text>
              </View>
            )}
          </View>

          {sportsInfo.description && (
            <View style={styles.descriptionCard}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>{sportsInfo.description}</Text>
            </View>
          )}

          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.description}>
              • Arrive 10 minutes before the game starts.
            </Text>
            <Text style={styles.description}>
              • Carry your own gear and essentials.
            </Text>
            <Text style={styles.description}>
              • Respect teammates and follow fair play.
            </Text>
            <Text style={styles.description}>
              • Follow the game coordinator’s guidance.
            </Text>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinText}>Join Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerImage: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#bbb",
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  descriptionCard: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: "#ccc",
    lineHeight: 22,
  },
  joinButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 40,
    shadowColor: "#ff4747",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  joinText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.5,
  },
});
