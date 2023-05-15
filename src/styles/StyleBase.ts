import { StyleSheet } from 'react-native';

import colors from '../constants/colors';

const StyleBase = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.swWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { position: 'absolute', top: 25, left: 10 },
  formMargin: {
    flex: 1,
  },
  errorMessage: {
    width: '100%',
    color: colors.swRed,
    textAlign: 'right',
    marginBottom: 5,
  },
});

export default StyleBase;
