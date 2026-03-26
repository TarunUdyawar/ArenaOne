import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "@/src/constants/Colors";

export const MyCalendarBlock = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 18,
        marginTop: 30,
       shadowColor: colors.accent,
        shadowOpacity: 0.25,
        shadowRadius: 8,
        // flexDirection: "row",
        alignItems: "center",
        width: '85%',
        margin:'auto'
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 10,
          textAlign:'center'
        }}
      >
        My Calendar
      </Text>
    </TouchableOpacity>
  );
};


