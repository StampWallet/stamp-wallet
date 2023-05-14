import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Control, Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorField from './ErrorField';

interface IHookFormDatePicker {
  control: Control;
  rules?: RegisterOptions;
  name: string;
  isInvalid?: boolean;
  placeholder?: string;
}

const HookFormDatePicker = ({ control, name, rules, isInvalid, placeholder }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setValue } = useFormContext();

  const handleConfirm = (date) => {
    setValue(name, date);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.datePicker}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='date'
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
            <ErrorField isVisible={isInvalid} error={error?.message || 'Date is required'} />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {},
});

export default HookFormDatePicker;
