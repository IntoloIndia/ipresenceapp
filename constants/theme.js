import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  //error
  error: '#dc2626',
  //primary
  green_50: '#f0fdf4',
  green_100: '#dcfce7',
  green_200: '#bbf7d0',
  green_300: '#86efac',
  green_400: '#4ade80',
  green_500: '#22c55e',
  green_600: '#16a34a',
  green_700: '#15803d',
  green_800: '#166534',
  green_900: '#14532d',

  //secondary
  yellow_50: '#fefce8',
  yellow_100: '#fef9c3',
  yellow_200: '#fef08a',
  yellow_300: '#fde047',
  yellow_400: '#facc15',
  yellow_500: '#eab308',
  yellow_600: '#ca8a04',

  //amber
  amber_200: '#fde68a',
  amber_300: '#fcd34d',
  amber_400: '#fbbf24',
  amber_500: '#f59e0b',
  amber_600: '#d97706',

  //true gray
  true_gray_50: '#fafafa',
  true_gray_100: '#f5f5f5',
  true_gray_200: '#e5e5e5',
  true_gray_300: '#d4d4d4',
  true_gray_400: '#a3a3a3',
  true_gray_500: '#737373',
  true_gray_600: '#525252',
  true_gray_700: '#404040',
  true_gray_800: '#262626',
  true_gray_900: '#171717',

  //
  darkGray: '#525C67',
  darkGray2: '#757D85',

  //
  gray: '#898B9A',
  gray2: '#BBBDC1',
  gray3: '#CFD0D7',

  //
  lightGray1: '#DDDDDD',
  lightGray2: '#F5F5F8',

  //
  white: '#FFFFFF',
  white2: '#FBFBFB',
  white3: '#F8F8FF',

  //
  green: '#27AE60',
  red: '#FF1717',
  blue: '#0064C0',
  darkBlue: '#111A2C',
  black: '#000000',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack2: 'rgba(0, 0, 0, 0.2)',
  transparentBlack3: 'rgba(0, 0, 0, 0.3)',
  transparentBlack4: 'rgba(0, 0, 0, 0.4)',
  transparentBlack5: 'rgba(0, 0, 0, 0.5)',
  transparentBlack6: 'rgba(0, 0, 0, 0.6)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
  transparentBlack8: 'rgba(0, 0, 0, 0.8)',

  lime: '#32CD32',
  emerald: '#50C878',

  danger_400: '#fb7185',
  warning_200: '#fed7aa',
  warning_300: '#fdba74',

  darkBlue_900: '#002851',
  darkGreen_: '#002408',

};

export const SIZES = {
  // global sizes
  base: 10,
  font: 14,
  radius: 15,
  padding: 30,

  // font sizes
  largeTitle: 40,
  h1: 10,
  h2: 12,
  h3: 14,
  h4: 16,
  h5: 18,
  h6: 20,
  h7: 24,
  h8: 30,
  h9: 36,
  h10: 48,
  h11: 60,
  h12: 72,
  h13: 96,
  h14: 128,
  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 22},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 22},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 22},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 22},
  h6: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h6, lineHeight: 22},
  h7: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h7, lineHeight: 22},
  h8: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h8, lineHeight: 30},
  h9: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h9, lineHeight: 30},
  h10: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h10, lineHeight: 30},
  h11: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h11, lineHeight: 30},
  h12: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h12, lineHeight: 36},
  h13: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h13, lineHeight: 36},
  h14: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h14, lineHeight: 36},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
