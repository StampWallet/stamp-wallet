import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ModalComponent = ({ props }) => {
  return (
    <Modal animationType='fade' visible transparent>
      <TouchableOpacity
        style={styles.modalBackDrop}
        onPress={() => props.hideModal()}
        activeOpacity={1}
      >
        dupa
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    opacity: 0.5,
  },
});
