import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function ScannerView(){
    return (
        <View style={styles.container}>
            <Text>This is scanner view</Text>
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
