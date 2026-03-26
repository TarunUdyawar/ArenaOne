import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  View,
  Modal,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "@/src/constants/Colors";
import { MotiView } from "moti";
import NavBar from "@/src/components/NavBar";
import ArenaTextArea from "@/src/components/ArenaTextArea";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/src/config/FirebaseConfig";
import { useAuth } from "@/src/context/AuthContext";

const width = Dimensions.get("screen").width;

export default function CreateGames() {
  const { ArenaName, SportsAvailable,Images } = useLocalSearchParams();
  const ArenaNames = JSON.parse(ArenaName as string);
  const Sports = JSON.parse(SportsAvailable as string);
  const Image = JSON.parse(Images as string);
  const [Arena, setArena] = useState(ArenaNames);
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
  const [tempDate, setTempDate] = useState(new Date());
  const [maxPlayers, setMaxPlayers] = useState("");
  const [loading,setLoading]= useState(false)
  const {user} = useAuth()

  const handleCreate = async() => {
   try {
    if(!Arena || !Sports || !maxPlayers || !date ){
      Alert.alert("Arena One","Fill all the details")
    }
    setLoading(true)
     await addDoc(collection(firestore,'games'),{
      userId : user?.uid,
      Arena,
      sport,
       date: date.toDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      maxPlayers,
      image : Image,
      
    })
    setLoading(false)
    Alert.alert("Arena One","Game Created Successfully")
    router.push('/(tabs)/Play')
   } catch (error:any) {
    let msg = error.message
    console.log(msg)
   }
   
  };

  const openPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
    setTempDate(date);
  };

  const confirmPicker = () => {
    setDate(tempDate);
    setPickerMode(null);
  };

  const cancelPicker = () => {
    setPickerMode(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, alignItems: "center" }}
      >
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <Text style={styles.header}>⚡ Create a Game</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, type: "timing", duration: 500 }}
          style={styles.form}
        >
          <Text style={styles.sectionTitle}>🏅 Sports Available</Text>
          <View style={styles.sportsContainer}>
            {Sports.map((item: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sportChip,
                  sport === item && styles.sportChipSelected,
                ]}
                onPress={() => setSport(item)}
              >
                <Text
                  style={[
                    styles.sportText,
                    sport === item && styles.sportTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ArenaTextArea
            label="Select Arena"
            icon="location-outline"
            value={Arena}
            onChangeText={setArena}
            editable={false}
          />

          <TouchableOpacity onPress={() => openPicker("date")}>
            <ArenaTextArea
              label="Date"
              icon="calendar-outline"
              value={date.toDateString()}
              editable={false}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openPicker("time")}>
            <ArenaTextArea
              label="Time"
              icon="time-outline"
              value={date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              editable={false}
            />
          </TouchableOpacity>

          <ArenaTextArea
            label="Max Players"
            icon="people-outline"
            value={maxPlayers}
            onChangeText={setMaxPlayers}
            keyboardType="numeric"
          />
        </MotiView>

        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 1200 }}
        >
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            {loading ?<ActivityIndicator size={'small'} color={colors.textPrimary}/> :  <Text style={styles.buttonText}>Create Game</Text>}
           
          </TouchableOpacity>
        </MotiView>
      </ScrollView>

      <Modal visible={!!pickerMode} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {pickerMode === "date" ? "Select Date" : "Select Time"}
            </Text>

            <DateTimePicker
              value={tempDate}
              mode={pickerMode || "date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate);
              }}
              style={{ backgroundColor: colors.card }}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.card }]}
                onPress={cancelPicker}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={confirmPicker}
              >
                <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  form: { width: width * 0.9, marginTop: 20 },
  sportsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    gap: 10,
  },
  sportChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  sportChipSelected: {
    backgroundColor: colors.primary,
  },
  sportText: { color: colors.textPrimary, fontSize: 14 },
  sportTextSelected: { color: "#fff" },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
    width: width * 0.9,
    alignSelf: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
