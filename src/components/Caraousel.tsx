import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions, StyleProp, ViewStyle } from "react-native";
import { colors } from "@/src/constants/Colors"; 
import { shadows } from "@/src/constants/shadows"; 

const { width } = Dimensions.get("window");

const Carousel = ({ data, style }: { data: any[], style?: StyleProp<ViewStyle> }) => {
  return (
    <View style={[styles.container, style]}>
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
    ...shadows.medium,
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
