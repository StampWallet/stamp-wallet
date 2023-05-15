import React from 'react';
import { ScrollView } from 'react-native';
import { useFormContext } from 'react-hook-form';

import HookFormInput from '../../components/HookFormComponents/HookFormInput';
import BoxContainer from '../../components/Miscellaneous/BoxContainer';

import StyleBase from '../../styles/StyleBase';
import { required } from '../../utils/validators';

export default function BusinessDataForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <BoxContainer style={StyleBase.formMargin}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='NIP'
          placeholder='NIP'
          isInvalid={Boolean(errors.NIP)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='KRS'
          placeholder='KRS'
          isInvalid={Boolean(errors.KRS)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='REGON'
          placeholder='REGON'
          isInvalid={Boolean(errors.REGON)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='businessName'
          placeholder='business name'
          isInvalid={Boolean(errors.businessName)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='businessAddress'
          placeholder='business address'
          isInvalid={Boolean(errors.businessAddress)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='postalCode'
          placeholder='postal code'
          isInvalid={Boolean(errors.postalCode)}
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='city'
          placeholder='city'
          isInvalid={Boolean(errors.city)}
        />
      </ScrollView>
    </BoxContainer>
  );
}
