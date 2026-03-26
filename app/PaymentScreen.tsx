import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors } from "@/src/constants/Colors";
import SafeScreen from "@/src/components/SafeScreen";
import BackButton from "@/src/components/ui/BackButton";
import { MotiView, MotiText } from "moti";
import { getShadow } from "@/src/constants/shadows";
import { BlurView } from "expo-blur";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/src/config/FirebaseConfig";
import { useAuth } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;

export default function PaymentScreen() {
  const { Arena, sport, date, time, maxPlayers, image } = useLocalSearchParams();
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment API delay
    setTimeout(() => {
      setIsPaid(true);
      setLoading(false);
    }, 1500);
  };

  const finalizeGameCreation = async () => {
    try {
      await addDoc(collection(firestore, "games"), {
        userId: user?.uid,
        Arena: Arena as string,
        sport: sport as string,
        date: date as string,
        time: time as string,
        maxPlayers: maxPlayers as string,
        image: image as string,
        participants: [user?.uid],
      });
      router.replace("/(tabs)/Play");
    } catch (error) {
      console.log("Error creating game post-payment:", error);
    }
  };

  return (
    <SafeScreen style={styles.container}>
      <BackButton />
      
      <View style={styles.content}>
        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500 }}
          style={styles.headerTitle}
        >
          Payment Summary
        </MotiText>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 200 }}
          style={styles.invoiceCard}
        >
          <Image source={{ uri: image as string }} style={styles.arenaImage} />
          
          <View style={styles.detailsContainer}>
            <Text style={styles.arenaName}>{Arena}</Text>
            <Text style={styles.sportName}>⚽ {sport}</Text>
            
            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{time}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Max Players</Text>
              <Text style={styles.value}>{maxPlayers}</Text>
            </View>

            <View style={styles.divider} />
            
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.price}>₹199</Text>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", delay: 400 }}
        >
          <TouchableOpacity 
            style={styles.payButton} 
            onPress={handlePayment}
            disabled={loading || isPaid}
          >
            <Text style={styles.payButtonText}>
              {loading ? "Processing..." : "Make Payment"}
            </Text>
          </TouchableOpacity>
        </MotiView>
      </View>

      {/* Payment Success Modal */}
      {isPaid && (
        <MotiView
          from={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 400 }}
          style={StyleSheet.absoluteFill}
        >
          <BlurView intensity={70} tint="dark" style={styles.modalOverlay}>
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 300 }}
              style={styles.successCard}
            >
              <View style={styles.successIconWrapper}>
                <Ionicons name="checkmark" size={50} color="#fff" />
              </View>
              <Text style={styles.successTitle}>Payment Successful 🎉</Text>
              <Text style={styles.successSubtitle}>
                Your game has been paid for and is ready to be published to the community feed.
              </Text>

              <TouchableOpacity style={styles.confirmButton} onPress={finalizeGameCreation}>
                <Text style={styles.confirmButtonText}>Complete Setup</Text>
              </TouchableOpacity>
            </MotiView>
          </BlurView>
        </MotiView>
      )}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingVertical: 10 },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  invoiceCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    width: width * 0.9,
    overflow: "hidden",
    marginBottom: 40,
    ...getShadow(15, colors.primary, 0.2),
  },
  arenaImage: {
    width: "100%",
    height: 160,
  },
  detailsContainer: {
    padding: 20,
  },
  arenaName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  sportName: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    color: "#aaa",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  totalLabel: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  price: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "800",
  },
  payButton: {
    backgroundColor: colors.primary,
    width: width * 0.9,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    ...getShadow(10, colors.primary, 0.4),
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successCard: {
    width: width * 0.85,
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(233, 30, 99, 0.3)",
    ...getShadow(20, colors.primary, 0.3),
  },
  successIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    ...getShadow(12, colors.primary, 0.5),
  },
  successTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 15,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  confirmButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  confirmButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  }
});
