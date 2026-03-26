import {
  Image,
  
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "@/src/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import NavBar from "@/src/components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VenueInfo() {
  const { Venues } = useLocalSearchParams();
  const VenuesInfo = JSON.parse(Venues as string);
  // console.log(VenuesInfo);
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      //   contentContainerStyle={{ padding: 16 }}
    >
      <SafeAreaView>
        <NavBar />
        <View style={styles.container}>
          <Image source={{ uri: VenuesInfo.image }} style={styles.image} />

          <Text style={styles.name}>{VenuesInfo.name}</Text>
          <Text style={styles.address}>{VenuesInfo.address}</Text>

          <Text style={styles.rating}>
            ⭐ {VenuesInfo.rating} ({VenuesInfo.ratingCount} reviews)
          </Text>
          <View style={styles.sportsContainer}>
            <Text style={styles.sportsTitle}>🏅 Sports Available:</Text>
            <View style={styles.sportsList}>
              {VenuesInfo.filter_by?.map((sport: string, index: number) => (
                <View key={index} style={styles.sportChip}>
                  <Text style={styles.sportChipText}>{sport}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.sportsContainer}>
            <Text style={styles.sportsTitle}> 🏢 Amenities Available:</Text>
            <View style={styles.sportsList}>
              {VenuesInfo.amenities?.map((sport: string, index: number) => (
                <View key={index} style={styles.sportChip}>
                  <Text style={styles.sportChipText}>{sport}</Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.card }]}
              onPress={()=>router.push({
                pathname:'/CreateGames',
                params:{
                  ArenaName : JSON.stringify(VenuesInfo?.name),
                  SportsAvailable : JSON.stringify(VenuesInfo?.filter_by),
                  Images : JSON.stringify(VenuesInfo?.image)
                }
              })}
            >
              <Text style={styles.btnText}>Book Venue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Share.share({
                  message: VenuesInfo?.name,
                })
              }
              style={[styles.btn, { backgroundColor: colors.card }]}
            >
              <Text style={styles.btnText}>Share Venue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  container: {
    margin: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  rating: {
    color: "#FFD700",
    fontSize: 16,
    // marginBottom: 8,
    marginTop: 6,
  },
  sports: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 12,
  },
  phone: {
    color: "#1E90FF",
    fontSize: 16,
    marginBottom: 16,
  },
  btn: {
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  address: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: 6,
  },
  sportsContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  sportsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sportsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    //   gap: 8,
  },
  sportChip: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 10,
  },
  sportChipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
});
