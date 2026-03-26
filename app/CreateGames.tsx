import {
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
import SafeScreen from "@/src/components/SafeScreen";
import { MotiView } from "moti";
import NavBar from "@/src/components/NavBar";
import ArenaTextArea from "@/src/components/ArenaTextArea";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "@/src/config/FirebaseConfig";
import { useAuth } from "@/src/context/AuthContext";
import { sportsVenue } from "@/src/constants/sportsVenue";

const width = Dimensions.get("screen").width;

export default function CreateGames() {
 const { ArenaName, SportsAvailable, Images } = useLocalSearchParams();
const [arenaModalVisible, setArenaModalVisible] = useState(false);
const ArenaNames = ArenaName ? JSON.parse(ArenaName as string) : "";
const Sports = SportsAvailable ? JSON.parse(SportsAvailable as string) : [];
const Image = Images ? JSON.parse(Images as string) : "";
  const [Arena, setArena] = useState(ArenaNames);
  const [sport, setSport] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time" | null>(null);
  const [tempDate, setTempDate] = useState(new Date());
  const [maxPlayers, setMaxPlayers] = useState("");
  const [loading,setLoading]= useState(false)
  const {user} = useAuth()
  const [selectedSports, setSelectedSports] = useState<string[]>(Sports);
const [selectedImage, setSelectedImage] = useState(Image);

  const handleCreate = async() => {
   try {
    if(!Arena || !sport || !maxPlayers || !date ){
      Alert.alert("Arena One","Fill all the details")
      return;
    }
    setLoading(true)
    
    router.push({
      pathname: '/PaymentScreen',
      params: {
        Arena,
        sport,
        date: date.toDateString(),
        time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        maxPlayers,
        image: selectedImage,
      }
    });

    setLoading(false)
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
    <SafeScreen style={styles.container}>
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
            {selectedSports.map((item: string, index: number) => (
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

        <TouchableOpacity onPress={() => setArenaModalVisible(true)}>
  <ArenaTextArea
    label="Select Arena"
    icon="location-outline"
    value={Arena}
    editable={false}
  />
</TouchableOpacity>

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

 {pickerMode && (
  <DateTimePicker
  value={new Date()}
  minimumDate={new Date()}
 
    mode={pickerMode}
    display={Platform.OS === "ios" ? "spinner" : "default"}
    onChange={(event, selectedDate) => {
      setPickerMode(null);

      if (selectedDate) {
        setDate(selectedDate);
      }
    }}
  />
)}
      <Modal visible={arenaModalVisible} animationType="slide">
  <SafeScreen style={{ flex: 1 }}>
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 20 }}>
        Select Arena
      </Text>

      {sportsVenue.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#333",
          }}
      onPress={() => {
  setArena(item.name);
  setSport("");
  setSelectedSports(item.filter_by);
  setSelectedImage(item.image);
  setArenaModalVisible(false); // close modal
}}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </SafeScreen>
</Modal>
    </SafeScreen>
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
    height:20
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
