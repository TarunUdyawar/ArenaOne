import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from "react-native";
import { colors } from "@/src/constants/Colors"; 

const { width } = Dimensions.get("window");

const Carousel = ({ data }: { data: any[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔦 Spotlight</Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={width * 0.7 + 20} 
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginLeft: 16,
    marginBottom: 12,
  },
  card: {
    width: width * 0.7,
    marginLeft: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
    
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default Carousel;
