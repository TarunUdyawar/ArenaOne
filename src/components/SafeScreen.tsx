import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/Colors';

type SafeScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
};

export default function SafeScreen({ children, style, edges = ['top', 'bottom', 'left', 'right'] }: SafeScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
