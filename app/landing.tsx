import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Indian gaming community data centered around Mumbai
const players = [
  {
    id: "1",
    name: "Rahul",
    message: "Khelte Hai 🔥",
    coordinate: { latitude: 19.1136, longitude: 72.8697 }, // Andheri
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Priya",
    message: "Join Karna Hai?",
    coordinate: { latitude: 19.0596, longitude: 72.8295 }, // Bandra
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Karan",
    message: "Match Ready 💪",
    coordinate: { latitude: 19.1176, longitude: 72.9060 }, // Powai
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Aditi",
    message: "Tayyari Hai?",
    coordinate: { latitude: 19.0330, longitude: 73.0297 }, // Navi Mumbai
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Vikram",
    message: "Squad Upp!",
    coordinate: { latitude: 19.0896, longitude: 72.8656 }, // Kurla/BKC
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  }
];

export default function Home() {
  const { LogIn } = useAuth();
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.0760, // Mumbai Center
          longitude: 72.8777,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        userInterfaceStyle="dark"
        customMapStyle={mapStyle}
      >
        {players.map((player) => (
          <Marker
            key={player.id}
            coordinate={player.coordinate}
            onPress={() => setSelectedPlayer(player)}
          >
            <View style={styles.markerContainer}>
              <MotiView
                from={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  type: "timing",
                  duration: 2000,
                  loop: true,
                }}
                style={styles.pulse}
              />
              <View style={styles.avatarContainer}>
                <Image source={{ uri: player.avatar }} style={styles.avatar} />
                <View style={styles.badge}>
                  <Text style={styles.avatarText}>{player.message}</Text>
                </View>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Selected Player Invite Modal */}
      {selectedPlayer && (
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.profileModal}
        >
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => setSelectedPlayer(null)}
          >
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Image source={{ uri: selectedPlayer.avatar }} style={styles.modalAvatar} />
          <Text style={styles.modalName}>{selectedPlayer.name}</Text>
          <Text style={styles.modalMessage}>"{selectedPlayer.message}"</Text>
          <TouchableOpacity style={styles.inviteButton}>
            <Text style={styles.inviteText}>Send Invite ⚡</Text>
          </TouchableOpacity>
        </MotiView>
      )}

      {/* Bottom Action Card */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Find Your Squad Nearby ⚡</Text>
        <Text style={styles.subtitle}>Mumbai • Play. Connect. Compete.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace("/(auth)/SignUp");
          }}
        >
          <Text style={styles.buttonText}>ENTER THE ARENA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Dark Neon Map Style
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
  },
  pulse: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(233, 30, 99, 0.4)', // Neon Pink Glow
    top: 25,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#e91e63', // Neon Pink
  },
  badge: {
    backgroundColor: '#9c27b0', // Neon Purple
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: -10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: "800",
  },
  profileModal: {
    position: 'absolute',
    top: height * 0.15,
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e91e63',
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    zIndex: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#e91e63',
    marginBottom: 15,
  },
  modalName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalMessage: {
    color: '#aaa',
    fontSize: 16,
    marginVertical: 10,
    fontStyle: 'italic',
  },
  inviteButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
  },
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(10, 10, 10, 0.85)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    height: 200,
    borderTopWidth: 1,
    borderColor: "#333",
  },
  title: {
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: "900",
    marginBottom: 6,
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e91e63', // Neon Pink
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#e91e63',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
});

