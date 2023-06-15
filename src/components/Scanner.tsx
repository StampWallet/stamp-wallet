import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CustomButton from './Miscellaneous/CustomButton';

interface Props {
  onPressAdd: (data) => void;
  disabled: boolean;
}

export default function Scanner({ onPressAdd, disabled }: Props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [text, setText] = useState('Not yet scanned...');

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log(barcodeData);
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeData({ type, data });
    setText('Successfully scanned');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title='Allow camera' onPress={() => getBarCodeScannerPermissions()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Scan the barcode!</Text>
      </View>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.footer}>{text}</Text>
      {scanned && (
        <View style={styles.horizontalContainer}>
          <CustomButton
            title='Scan again?'
            onPress={() => {
              setText('Not yet scanned...');
              setScanned(false);
              setBarcodeData(null);
            }}
            customButtonStyle={styles.customButton}
            type='secondary'
            disabled={disabled}
          />
          <CustomButton
            title='Add card!'
            onPress={() => onPressAdd(barcodeData)}
            customButtonStyle={styles.customButton}
            disabled={disabled}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 400,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  footer: {
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  customButton: {
    width: 150,
  },
});
