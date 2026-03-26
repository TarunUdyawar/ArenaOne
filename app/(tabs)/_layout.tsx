import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors } from "@/src/constants/Colors";
import { getShadow } from "@/src/constants/shadows";

function TabBarIcon({ name, color, size, focused }: { name: React.ComponentProps<typeof Ionicons>['name'], color: string, size: number, focused: boolean }) {
const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{ scale: withSpring(focused ? 1.3 : 1) }],

    shadowColor: focused ? color : "transparent",
    shadowOffset: { width: 0, height: focused ? 6 : 0 },
    shadowOpacity: focused ? 0.9 : 0,
    shadowRadius: focused ? 12 : 0,
    elevation: focused ? 12 : 0,
  };
});

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.background, 
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.success,
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Book"
        options={{
          title: "Book",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="calendar"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Play"
        options={{
          title: "Play",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="football"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name="person"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
