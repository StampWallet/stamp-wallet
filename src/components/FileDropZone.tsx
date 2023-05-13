import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FileDropZone = (props) => {
  return (
    <View style={styles.FileDropZone}>
      <Text>This is file drop zone</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  FileDropZone: {},
});

export default FileDropZone;
