import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import NavBar from "@/src/components/NavBar";
import { colors } from "@/src/constants/Colors";
import MotivationBlock from "@/src/components/MotivationBlock";
import ActionCards from "@/src/components/ActionCard";
import MarqueeBanner from "@/src/components/MarqueeBanner";
import Carousel from "@/src/components/Caraousel";
import { MotiView } from "moti";

const data = [
  {
    id: "10",
    image:
      "https://plus.unsplash.com/premium_photo-1666913667082-c1fecc45275d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Up Your Game",
    description: "Find a coach",
  },
  {
    id: "11",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    text: "Up Your Game",
    description: "Find a coach",
  },
  {
    id: "12",
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    text: "Hacks to win",
    description: "Yes, Please!",
  },
  {
    id: "13",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    text: "Spotify Playlist",
    description: "Show more",
  },
];

export default function Home() {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView>
        <NavBar />

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <MotivationBlock />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
        >
          <ActionCards />
        </MotiView>

        <MotiView
          from={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 400 }}
        >
      
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: 50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: "timing", duration: 600, delay: 600 }}
        >
          <Carousel data={data} />
        </MotiView>

        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 800, delay: 800 }}
        >
          <MarqueeBanner />
        </MotiView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
