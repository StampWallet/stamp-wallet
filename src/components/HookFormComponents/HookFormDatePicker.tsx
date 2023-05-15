import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Control, Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorField from './ErrorField';
import CustomButton from '../Miscellaneous/CustomButton';

import colors from '../../constants/colors';
import formatToDate from '../../utils/formatToDate';
import getDatePickerLabel from '../../utils/getDatePickerLabel';

type DatePickerNamesType = 'dateFrom' | 'dateTo';

interface HookFormDatePickerProps {
  control: Control;
  rules?: RegisterOptions;
  name: DatePickerNamesType;
  isInvalid?: boolean;
  minDate: string;
  maxDate: string;
}

const HookFormDatePicker = ({
  control,
  name,
  rules,
  isInvalid = false,
  minDate,
  maxDate,
}: HookFormDatePickerProps) => {
  const [pickerName, setPickerName] = useState<string>(name);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { setValue } = useFormContext();

  const handleConfirm = (date) => {
    const dateString = date.toISOString();
    const formattedDate = formatToDate(dateString);

    setValue(name, formattedDate);
    setPickerName(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ fieldState: { error } }) => (
        <>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            minimumDate={new Date(minDate)}
            maximumDate={new Date(maxDate)}
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <CustomButton
            onPress={() => {
              setDatePickerVisibility((prev) => !prev);
            }}
            title={getDatePickerLabel(pickerName)}
            customButtonStyle={[styles.datePicker, isInvalid && styles.datePickerWithError]}
            customTextStyle={styles.datePickerText}
          />
          <ErrorField isVisible={isInvalid} error={error?.message || 'Date is required'} />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  datePicker: {
    backgroundColor: colors.swWhite,
    borderStyle: 'solid',
    borderBottomColor: colors.swUnderlineBlue,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: 125,
  },
  datePickerWithError: {
    borderBottomColor: colors.swRed,
  },
  datePickerText: {
    color: colors.swBlack,
    fontSize: 16,
  },
});

export default HookFormDatePicker;
