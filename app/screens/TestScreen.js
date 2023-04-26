import React from "react";
import { Text, View } from "react-native";

export default function TestScreen({ name }) {
  return (
    <View>
      <Text>Hello, {name}</Text>
    </View>
  );
}
