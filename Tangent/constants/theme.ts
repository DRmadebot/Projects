import { Platform } from 'react-native';

const tintColorLight = '#B8712C';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#2E2A22',
    textMuted: '#6B6355',
    background: '#F2E6CB',
    surface: '#FFFBF2',
    border: '#E4D5B0',
    accent: '#B8712C',
    accentMoss: '#4F6B52',
    tint: tintColorLight,
    icon: '#6B6355',
    tabIconDefault: '#6B6355',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});