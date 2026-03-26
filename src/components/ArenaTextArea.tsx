import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/constants/Colors";

type ArenaTextAreaProps = {
    label : string,
    onChangeText ?: (text:string)=> void,
    password ? : boolean,
    icon : React.ComponentProps<typeof Ionicons>['name'],
    value ?: string,
    editable ?: boolean,
    keyboardType ?: any
}

export default function ArenaTextArea({label,onChangeText,password=false,icon,value,editable=true,keyboardType}:ArenaTextAreaProps) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <TextInput
        placeholder={label}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        onChangeText={onChangeText}
        secureTextEntry={password}
        autoCapitalize="none"
        value={value}
        editable={editable}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.textPrimary,
    paddingHorizontal: 10,
  },
});
