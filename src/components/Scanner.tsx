import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import StyleBase from '../styles/StyleBase';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <View style={StyleBase.container}>
      {hasPermission === null && <Text>Requesting for camera permission</Text>}
      {hasPermission === false && <Text>No access to camera</Text>}
      {hasPermission && (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      )}
      {scanned && <Button title='Tap to Scan Again' onPress={() => setScanned(undefined)} />}
    </View>
  );
}
