import React from 'react';
import { Text } from 'react-native';
import StyleBase from '../../styles/StyleBase';

type ErrorFieldProps = {
  isVisible: boolean;
  error: string;
};

export default function ErrorField({ isVisible, error }: ErrorFieldProps) {
  return isVisible ? <Text style={StyleBase.errorMessage}>{error}</Text> : null;
}
