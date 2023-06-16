import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Control, Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import CustomButton from '../Miscellaneous/CustomButton';
import ErrorField from './ErrorField';
import Icon from 'react-native-vector-icons/AntDesign';

import getImagePickerLabel from '../../utils/getImagePickerLabel';
import colors from '../../constants/colors';

interface IHookFormImagePicker {
  control: Control;
  rules?: RegisterOptions;
  name: string;
  isInvalid?: boolean;
}

const HookFormImagePicker = ({ control, rules, name, isInvalid }: IHookFormImagePicker) => {
  const { setValue, watch, trigger } = useFormContext();

  const imageWatch = watch(name);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      setValue(name, result.assets[0]);
      trigger(name);
    }
  };

  return (
    <View style={styles.hookFormImagePicker}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value }, fieldState: { error } }) => (
          <>
            <Text style={styles.pickerHeader}>{getImagePickerLabel(name)}</Text>
            <CustomButton
              onPress={pickImage}
              title=''
              customButtonStyle={[
                styles.imagePickerRect,
                isInvalid && { borderColor: colors.swRed, backgroundColor: colors.swPaleViolet },
              ]}
            >
              {imageWatch ? (
                <Image source={{ uri: imageWatch.uri }} style={styles.image} />
              ) : (
                <Icon size={50} name='upload' />
              )}
            </CustomButton>
            <ErrorField
              isVisible={isInvalid}
              error={`Image for ${getImagePickerLabel(name)} is required.`}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hookFormImagePicker: {},
  pickerHeader: {
    fontSize: 24,
    textDecorationLine: 'underline',
    fontWeight: '400',
    textAlign: 'center',
  },
  imagePickerRect: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 335,
    height: 115,
    backgroundColor: colors.swViolet,
    borderStyle: 'dotted',
    borderColor: colors.swBlack,
    borderRadius: 0,
    borderWidth: 3,
  },
  image: {
    width: 335,
    height: 115,
  },
});

export default HookFormImagePicker;
