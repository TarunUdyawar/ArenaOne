import { Platform, ViewStyle } from 'react-native';

export const getShadow = (elevation = 10, color = "#000", opacity = 0.25): any => ({
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 6,
});

export const shadows = {
  small: getShadow(2, '#000', 0.1),
  medium: getShadow(6, '#000', 0.2),
  large: getShadow(12, '#000', 0.3),
};
