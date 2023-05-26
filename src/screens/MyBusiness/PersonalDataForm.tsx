import React from 'react';
import { useFormContext } from 'react-hook-form';

import HookFormInput from '../../components/HookFormComponents/HookFormInput';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';

import StyleBase from '../../styles/StyleBase';
import { required, validateEmail, validatePhoneNumber } from '../../utils/validators';

export default function PersonalDataForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <BoxContainer style={StyleBase.formMargin}>
      <HookFormInput
        control={control}
        rules={{
          required,
        }}
        name='name'
        placeholder='name'
        isInvalid={Boolean(errors.name)}
      />
      <HookFormInput
        control={control}
        rules={{
          required,
        }}
        name='surname'
        placeholder='surname'
        isInvalid={Boolean(errors.surname)}
      />
      <HookFormInput
        control={control}
        rules={{
          required,
          pattern: validateEmail,
        }}
        name='email'
        placeholder='email'
        isInvalid={Boolean(errors.email)}
      />
      <HookFormInput
        control={control}
        rules={{
          required,
          pattern: validatePhoneNumber,
        }}
        name='phoneNumber'
        placeholder='phone number'
        isInvalid={Boolean(errors.phoneNumber)}
      />
    </BoxContainer>
  );
}
