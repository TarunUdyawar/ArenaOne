import { Platform, ViewStyle } from 'react-native';

export const getShadow = (elevation = 10, color = "#000", opacity = 0.25): any => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: elevation / 2 },
  shadowOpacity: opacity,
  shadowRadius: elevation,
  elevation: elevation,
});

export const shadows = {
  small: getShadow(2, '#000', 0.1),
  medium: getShadow(6, '#000', 0.2),
  large: getShadow(12, '#000', 0.3),
};
