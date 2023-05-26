import React, { ReactNode } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

interface Props {
  header?: string;
  description?: string;
  confirmOption?: ReactNode;
  cancelOption?: ReactNode;
}

export default function CustomModal({
  header = 'aa',
  description = 'bb',
  isModalOpen = false,
  confirmOption,
  cancelOption,
}) {
  return (
    <Modal transparent visible={isModalOpen}>
      <View style={styles.container}>
        <View style={styles.visibleModal}>
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.description}>{description}</Text>

          <View style={styles.buttonWrapper}>
            {confirmOption}
            {cancelOption}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  visibleModal: {
    backgroundColor: colors.swLightBlue,
    margin: 30,
    padding: 50,
    borderRadius: 10,
    flex: 1,
  },
  header: {
    color: colors.swWhite,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: { color: colors.swWhite, fontSize: 16, textAlign: 'center', marginBottom: 50 },

  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
