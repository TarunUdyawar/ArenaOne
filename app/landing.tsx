import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { colors } from "@/src/constants/Colors";
import { router } from "expo-router";
import { getShadow } from "@/src/constants/shadows";
import { useAuth } from "@/src/context/AuthContext";
import { MotiView, AnimatePresence } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

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
        {players.map((player, index) => (
          <Marker
            key={player.id}
            coordinate={player.coordinate}
            onPress={() => setSelectedPlayer(player)}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 150, type: "spring", damping: 12 }}
            >
              <MotiView
                from={{ translateY: -3 }}
                animate={{ translateY: 3 }}
                transition={{
                  type: "timing",
                  duration: 1500,
                  loop: true,
                }}
                style={styles.markerContainer}
              >
                <MotiView
                  from={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    loop: true,
                  }}
                  style={styles.pulse}
                />
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: player.avatar }} style={styles.avatar as any} />
                  <MotiView
                    from={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                      delay: index * 150 + 800,
                      type: "timing",
                      duration: 400,
                    }}
                    style={styles.badge}
                  >
                    <Text style={styles.avatarText}>{player.message}</Text>
                  </MotiView>
                </View>
              </MotiView>
            </MotiView>
          </Marker>
        ))}
      </MapView>

      {/* Selected Player Invite Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.modalOverlay}
          >
            <BlurView intensity={80} tint="dark" style={styles.profileModal}>
              <TouchableOpacity 
                style={styles.closeBtn} 
                onPress={() => setSelectedPlayer(null)}
              >
                <Ionicons name="close" size={24} color="#e91e63" />
              </TouchableOpacity>
              <Image source={{ uri: selectedPlayer.avatar }} style={styles.modalAvatar as any} />
              <Text style={styles.modalName}>{selectedPlayer.name}</Text>
              <Text style={styles.modalMessage}>"{selectedPlayer.message}"</Text>
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteText}>Send Invite ⚡</Text>
              </TouchableOpacity>
            </BlurView>
          </MotiView>
        )}
      </AnimatePresence>

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
    width: 130,
    height: 140,
  },
  pulse: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(233, 30, 99, 0.4)', // Neon Pink Glow
    top: 35,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e91e63', // Neon Pink
    ...getShadow(15, '#e91e63', 0.6), // neon pink shadow
  },
  badge: {
    backgroundColor: 'rgba(20, 20, 20, 0.9)', // Darker badge bg
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: -10,
    borderWidth: 1,
    borderColor: '#9c27b0', // Soft purple border
    ...getShadow(10, '#9c27b0', 0.6),
  },
  avatarText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: "800",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  profileModal: {
    width: width * 0.85,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(233, 30, 99, 0.5)',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  modalAvatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#e91e63',
    marginBottom: 15,
    ...getShadow(25, '#e91e63', 0.5),
  },
  modalName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  modalMessage: {
    color: '#d1d1d1',
    fontSize: 16,
    marginVertical: 12,
    fontStyle: 'italic',
  },
  inviteButton: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    marginTop: 15,
    ...getShadow(20, '#e91e63', 0.6),
  },
  inviteText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
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
    ...getShadow(15, '#e91e63', 0.8),
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },
});

