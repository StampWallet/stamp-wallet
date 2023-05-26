import React from 'react';
import { useFormContext } from 'react-hook-form';

import BoxContainer from '../../components/Miscellaneous/BoxContainer';
import HookFormImagePicker from '../../components/HookFormComponents/HookFormImagePicker';

import StyleBase from '../../styles/StyleBase';
import { required } from '../../utils/validators';

export default function BusinessImagesForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <BoxContainer style={StyleBase.formMargin}>
      <HookFormImagePicker
        control={control}
        rules={{ required }}
        name='cardIcon'
        isInvalid={Boolean(errors.cardIcon)}
      />
      <HookFormImagePicker
        control={control}
        rules={{ required }}
        name='banner'
        isInvalid={Boolean(errors.banner)}
      />
      <HookFormImagePicker
        control={control}
        rules={{ required }}
        name='menu'
        isInvalid={Boolean(errors.menu)}
      />
    </BoxContainer>
  );
}
