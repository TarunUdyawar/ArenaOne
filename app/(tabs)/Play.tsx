import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { shadows } from "@/src/constants/shadows";
import NavBar from "@/src/components/NavBar";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "@/src/config/FirebaseConfig";
import { useAuth } from "@/src/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Play() {
  const [myGames, setMyGames] = useState<any[]>([]);
  const [otherGames, setOtherGames] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "games"),
      (snapshot) => {
        const gamesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentUser = auth.currentUser?.uid;
      
        const myGamesList = gamesList.filter(
          (game: any) => game.participants?.includes(currentUser)
        );
        const otherGamesList = gamesList.filter(
          (game: any) => !game.participants?.includes(currentUser)
        );
        setMyGames(myGamesList);
        setOtherGames(otherGamesList);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateGame = () => {
    router.push("/CreateGames");
  };

  const renderGameCard = ({ item }: {item: any}) => (
    <TouchableOpacity style={styles.card} onPress={()=>router.push({
      pathname:'/SportsInfo',
      params:{
        SportInfo : JSON.stringify(item)
      }
    })}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.Arena}</Text>
        <Text style={styles.cardText}>⚽ {item.sport}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 My Games</Text>
          {myGames.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No games created yet</Text>
            </View>
          ) : (
            <FlatList
              data={myGames}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Other Games</Text>
          {otherGames.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No public games available</Text>
            </View>
          ) : (
            <FlatList
              data={otherGames}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handleCreateGame}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.medium,
    elevation: 4,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },

  card: {
    width: 180,
    height: 200,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    backgroundColor: "#222",
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  cardText: {
    fontSize: 13,
    color: "#ddd",
  },

  fab: {
    position: "absolute",
    bottom: 26,
    right: 26,
    backgroundColor: colors.primary,
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});
