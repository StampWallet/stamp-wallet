import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { View } from 'react-native';

interface Props {}

const SnackBar = () => {
  const [snackbarState, setSnackbarState] = useState({ visible: false, message: '' });

  return (
    <View>
      <Snackbar
        visible={snackbarState.visible}
        onDismiss={() => setSnackbarState((prev) => ({ ...prev, visible: false }))}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarState.message}
      </Snackbar>
    </View>
  );
};

export default SnackBar;
