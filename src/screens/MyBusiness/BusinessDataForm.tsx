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
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', width: 300 }}>
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='name'
          placeholder='name'
          isInvalid={Boolean(errors.name)}
          header='name'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='businessName'
          placeholder='business name'
          isInvalid={Boolean(errors.businessName)}
          header='business name'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='businessAddress'
          placeholder='business address'
          isInvalid={Boolean(errors.businessAddress)}
          header='business address'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='description'
          placeholder='description'
          isInvalid={Boolean(errors.businessAddress)}
          header='short description'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='city'
          placeholder='city'
          isInvalid={Boolean(errors.city)}
          header='city'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='NIP'
          placeholder='NIP'
          isInvalid={Boolean(errors.NIP)}
          header='NIP'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='KRS'
          placeholder='KRS'
          isInvalid={Boolean(errors.KRS)}
          header='KRS'
        />
        <HookFormInput
          control={control}
          rules={{
            required,
          }}
          name='REGON'
          placeholder='REGON'
          isInvalid={Boolean(errors.REGON)}
          header='REGON'
        />

        {/*<HookFormInput*/}
        {/*  control={control}*/}
        {/*  rules={{*/}
        {/*    required,*/}
        {/*  }}*/}
        {/*  name='postalCode'*/}
        {/*  placeholder='postal code'*/}
        {/*  isInvalid={Boolean(errors.postalCode)}*/}
        {/*/>*/}
      </ScrollView>
    </BoxContainer>
  );
}
