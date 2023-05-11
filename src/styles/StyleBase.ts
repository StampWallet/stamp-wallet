import { StyleSheet } from 'react-native';

import { swWhite } from '../constants/colors';

const StyleBase = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: swWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { position: 'absolute', top: 25, left: 10 },
  formMargin: {
    flex: 1,
  },
});

export default StyleBase;
